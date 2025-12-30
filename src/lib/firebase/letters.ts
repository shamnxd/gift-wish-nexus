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
      const drawingRef = ref(storage, `letters/${Date.now()}_${drawingFile.name}`);
      await uploadBytes(drawingRef, drawingFile);
      drawingUrl = await getDownloadURL(drawingRef);
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

