
import { initializeApp } from "firebase/app";
import { getFirestore} from '@firebase/firestore';
import { getStorage } from '@firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAAMPXaPcduL-w1mVclrDLGPVdomj4qF7U",
  authDomain: "robofriendsstudyapp.firebaseapp.com",
  projectId: "robofriendsstudyapp",
  storageBucket: "robofriendsstudyapp.appspot.com",
  messagingSenderId: "433582286762",
  appId: "1:433582286762:web:621f8e9803a31a6898edd3"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
