// Import the functions you need from the SDKs you need
import { defineBoot } from '#q-app/wrappers';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import { useAuthStore } from 'stores/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBXM9w-cgbeWhCMP9NnMhWPAkcdntARx2E',
  authDomain: 'standard-vuejs.firebaseapp.com',
  projectId: 'standard-vuejs',
  storageBucket: 'standard-vuejs.firebasestorage.app',
  messagingSenderId: '513860096769',
  appId: '1:513860096769:web:68cc7d85c1d9464fc14100',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli-vite/boot-files
export default defineBoot((/* { app, router, ... } */) => {
  const authStore = useAuthStore();

  onAuthStateChanged(auth, (user) => {
    console.log('[dev] onAuthStateChanged called....');
    authStore.setUser(user);
  });
});
