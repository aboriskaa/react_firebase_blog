// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyAIRd3kE2K_gRtqukfT_aISrqx5BEKBNtQ',
	authDomain: 'blogapp-850b9.firebaseapp.com',
	projectId: 'blogapp-850b9',
	storageBucket: 'blogapp-850b9.appspot.com',
	messagingSenderId: '476289382233',
	appId: '1:476289382233:web:69881d7b993a7b15553e48',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
