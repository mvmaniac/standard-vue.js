import type { UserForm } from 'src/types';

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
} from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';

import { auth, db } from 'boot/firebase';

const DEFAULT_PHOTO_URL =
  'https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=';

// 로그인 (구글)
export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);

  console.log('[dev] signInWithGoogle called...: ', result.user);
}

// 로그인 (이메일)
export async function signInWithEmail({ email, password }: UserForm) {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
}

export async function logout() {
  await signOut(auth);
}

export async function signUpWithEmail({ email, password, nickname }: UserForm) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  await updateProfile(user, {
    displayName: nickname,
    photoURL: generateDefaultPhotoURL(user.uid),
  });

  console.log('[dev] signUpWithEmail called...: ', user);

  await sendVerificationEmail();
}

// TODO:[yhs] auth.currentUser값이 없을 때 처리?
export async function updateUserPassword(newPassword: string) {
  if (!auth.currentUser) return;
  await updatePassword(auth.currentUser, newPassword);
}

export async function updateUserProfile(displayName: string) {
  if (!auth.currentUser) return;
  await updateProfile(auth.currentUser, { displayName });
  await updateDoc(doc(db, 'users', auth.currentUser.uid), { displayName });
}

export async function updateUserEmail(email: string) {
  if (!auth.currentUser) return;
  await updateEmail(auth.currentUser, email);
  await updateDoc(doc(db, 'users', auth.currentUser.uid), { email });
}

export async function sendPasswordReset(email: string) {
  await sendPasswordResetEmail(auth, email);
}

export async function sendVerificationEmail() {
  if (!auth.currentUser) return;
  await sendEmailVerification(auth.currentUser);
}

export function generateDefaultPhotoURL(uid: string) {
  return `${DEFAULT_PHOTO_URL}${uid}`;
}
