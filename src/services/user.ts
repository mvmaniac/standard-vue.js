import type { User } from 'src/types';

import { doc, getDoc } from 'firebase/firestore';

import { db } from 'boot/firebase';

export async function getUserById(id: string) {
  const docSnap = await getDoc(doc(db, 'users', id));

  if (!docSnap.exists()) {
    return {
      uid: '',
      email: '',
      displayName: '',
      photoURL: '',
      emailVerified: false,
      createdAt: new Date(),
    };
  }

  const data = docSnap.data();
  return {
    uid: id,
    ...data,
    createdAt: data.createdAt.toDate(),
  } as User;
}
