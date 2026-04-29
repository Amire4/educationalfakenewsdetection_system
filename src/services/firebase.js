import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  FacebookAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';

// 🔴 YAHAN TUMHARI FIREBASE CONFIG 🔴
const firebaseConfig = {
  apiKey: "AIzaSyDmajgbhDsJZ2V2ONGkDysAlr-Vz-P6Fx4",
  authDomain: "eduverify-c8094.firebaseapp.com",
  projectId: "eduverify-c8094",
  storageBucket: "eduverify-c8094.firebasestorage.app",
  messagingSenderId: "625797263701",
  appId: "1:625797263701:web:f2536e967380562a8dbfdc",
  measurementId: "G-HK6NYPB09T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Google Provider
const googleProvider = new GoogleAuthProvider();

// Facebook Provider
const facebookProvider = new FacebookAuthProvider();

// Google Login
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { 
      success: true, 
      user: {
        name: result.user.displayName,
        email: result.user.email,
        uid: result.user.uid
      }
    };
  } catch (error) {
    console.error("Google Sign In Error:", error);
    return { success: false, error: error.message };
  }
};

// Facebook Login
export const signInWithFacebook = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    return { 
      success: true, 
      user: {
        name: result.user.displayName,
        email: result.user.email,
        uid: result.user.uid
      }
    };
  } catch (error) {
    console.error("Facebook Sign In Error:", error);
    return { success: false, error: error.message };
  }
};

// Email Signup
export const signUpWithEmail = async (email, password, name) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return { 
      success: true, 
      user: {
        name: name,
        email: result.user.email,
        uid: result.user.uid
      }
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Email Login
export const signInWithEmail = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return { 
      success: true, 
      user: {
        name: result.user.displayName || email.split('@')[0],
        email: result.user.email,
        uid: result.user.uid
      }
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Logout
export const logout = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export { auth };