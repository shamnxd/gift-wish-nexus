import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  Timestamp,
  doc,
  updateDoc,
  where
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';

export interface Letter {
  id?: string;
  childName: string;
  age: number;
  category: string;
  message: string;
  location: string;
  drawingUrl?: string;
  status: 'pending' | 'accepted' | 'delivered';
  sponsorId?: string;
  sponsorName?: string;
  createdAt: Date;
  coordinates?: { lat: number; lng: number };
}

export const saveLetter = async (letterData: Omit<Letter, 'id' | 'status' | 'createdAt'>, drawingFile?: File): Promise<string> => {
  try {
    let drawingUrl = '';
    
    // Upload drawing if provided
    if (drawingFile) {
      try {
        // Validate file size (max 5MB)
        if (drawingFile.size > 5 * 1024 * 1024) {
          throw new Error('File size exceeds 5MB limit');
        }
        
        // Validate file type
        if (!drawingFile.type.startsWith('image/')) {
          throw new Error('File must be an image');
        }
        
        const drawingRef = ref(storage, `letters/${Date.now()}_${drawingFile.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`);
        await uploadBytes(drawingRef, drawingFile);
        drawingUrl = await getDownloadURL(drawingRef);
      } catch (uploadError: any) {
        console.error('Error uploading drawing:', uploadError);
        // If upload fails, continue without the drawing
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

    // Save letter to Firestore
    const docRef = await addDoc(collection(db, 'letters'), {
      ...letterData,
      age: Number(letterData.age),
      drawingUrl,
      status: 'pending',
      createdAt: Timestamp.now(),
    });

    return docRef.id;
  } catch (error) {
    console.error('Error saving letter:', error);
    throw error;
  }
};

export const getLetters = async (): Promise<Letter[]> => {
  try {
    const q = query(collection(db, 'letters'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
    })) as Letter[];
  } catch (error) {
    console.error('Error fetching letters:', error);
    throw error;
  }
};

export const updateLetterStatus = async (letterId: string, status: Letter['status'], sponsorId?: string, sponsorName?: string): Promise<void> => {
  try {
    const letterRef = doc(db, 'letters', letterId);
    const updateData: any = { status };
    
    if (sponsorId) {
      updateData.sponsorId = sponsorId;
    }
    if (sponsorName) {
      updateData.sponsorName = sponsorName;
    }
    
    await updateDoc(letterRef, updateData);
  } catch (error) {
    console.error('Error updating letter:', error);
    throw error;
  }
};

