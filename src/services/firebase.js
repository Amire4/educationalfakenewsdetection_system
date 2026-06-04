import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDmajgbhDsJZ2V2ONGkDysAlr-Vz-P6Fx4",
  authDomain: "eduverify-c8094.firebaseapp.com",
  projectId: "eduverify-c8094",
  storageBucket: "eduverify-c8094.firebasestorage.app",
  messagingSenderId: "625797263701",
  appId: "1:625797263701:web:f2536e967380562a8dbfdc"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { success: true, user: { name: result.user.displayName, email: result.user.email, uid: result.user.uid } };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const signInWithFacebook = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    return { success: true, user: { name: result.user.displayName, email: result.user.email, uid: result.user.uid } };
  } catch (error) {
    return { success: false, error: error.message };
  }
};