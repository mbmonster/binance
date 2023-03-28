import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyDUVEwcEdohD0StUZLx2pwktokWhiOmmMM',
    authDomain: 'binance-79016.firebaseapp.com',
    projectId: 'binance-79016',
    storageBucket: 'binance-79016.appspot.com',
    messagingSenderId: '807317111338',
    appId: '1:807317111338:web:b0b253e9683d996c157953',
    measurementId: 'G-29SD9W29RK',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth };
export default app;
