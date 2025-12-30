import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  Timestamp,
  doc,
  getDoc
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';

export interface Sponsor {
  id?: string;
  companyName: string;
  contactEmail: string;
  giftCount: number;
  amountPerGift: number;
  totalAmount: number;
  paymentMethod: 'paypal' | 'other';
  paymentStatus: 'pending' | 'confirmed';
  paymentTransactionId?: string;
  message?: string;
  logoUrl?: string;
  createdAt: Date;
  confirmedAt?: Date;
}

export const saveSponsor = async (
  sponsorData: Omit<Sponsor, 'id' | 'paymentStatus' | 'createdAt' | 'confirmedAt'>, 
  logoFile?: File
): Promise<string> => {
  try {
    let logoUrl = '';
    
    // Upload logo if provided
    if (logoFile) {
      try {
        // Validate file size (max 5MB)
        if (logoFile.size > 5 * 1024 * 1024) {
          throw new Error('File size exceeds 5MB limit');
        }
        
        // Validate file type
        if (!logoFile.type.startsWith('image/')) {
          throw new Error('File must be an image');
        }
        
        const logoRef = ref(storage, `sponsors/${Date.now()}_${logoFile.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`);
        await uploadBytes(logoRef, logoFile);
        logoUrl = await getDownloadURL(logoRef);
      } catch (uploadError: any) {
        console.error('Error uploading logo:', uploadError);
        // If upload fails, continue without the logo
        if (uploadError.code === 'storage/unauthorized') {
          throw new Error('Storage access denied. Please check Firebase Storage rules.');
        } else if (uploadError.code === 'storage/canceled') {
          throw new Error('Upload was canceled.');
        } else if (uploadError.code === 'storage/unknown') {
          throw new Error('Unknown storage error. Please check your Firebase configuration.');
        }
        throw uploadError;
      }
    }

    // Calculate total amount
    const totalAmount = sponsorData.giftCount * sponsorData.amountPerGift;

    // Generate mock transaction ID for PayPal
    const transactionId = sponsorData.paymentMethod === 'paypal' 
      ? `PAYPAL-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      : undefined;

    // Save sponsor to Firestore
    const docRef = await addDoc(collection(db, 'sponsors'), {
      ...sponsorData,
      totalAmount,
      logoUrl,
      paymentStatus: 'confirmed', // Auto-confirm since no real payment gateway
      paymentTransactionId: transactionId,
      createdAt: Timestamp.now(),
      confirmedAt: Timestamp.now(),
    });

    return docRef.id;
  } catch (error) {
    console.error('Error saving sponsor:', error);
    throw error;
  }
};

export const getSponsors = async (): Promise<Sponsor[]> => {
  try {
    const q = query(collection(db, 'sponsors'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      confirmedAt: doc.data().confirmedAt?.toDate(),
    })) as Sponsor[];
  } catch (error) {
    console.error('Error fetching sponsors:', error);
    throw error;
  }
};

export const getSponsor = async (sponsorId: string): Promise<Sponsor | null> => {
  try {
    const docRef = doc(db, 'sponsors', sponsorId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt?.toDate() || new Date(),
        confirmedAt: docSnap.data().confirmedAt?.toDate(),
      } as Sponsor;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching sponsor:', error);
    throw error;
  }
};

