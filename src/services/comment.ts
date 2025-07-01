import type { Comment } from 'src/types';

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';

import { db } from 'boot/firebase';

export async function addComment(postId: string, data: Comment) {
  const docRef = await addDoc(collection(db, 'posts', postId, 'comments'), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getComments(postId: string) {
  const q = query(
    collection(db, 'posts', postId, 'comments'),
    orderBy('createdAt', 'desc'),
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docs) => {
    const data = docs.data();
    return {
      id: docs.id,
      ...data,
      createdAt: data.createdAt?.toDate(),
    } as Comment;
  });
}

export async function deleteComment(postId: string, commentId: string) {
  await deleteDoc(doc(db, 'posts', postId, 'comments', commentId));
}
