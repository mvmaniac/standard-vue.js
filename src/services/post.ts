import type { Post, PostPayload, SearchParams } from 'src/types';

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  startAfter,
  updateDoc,
  where,
} from 'firebase/firestore';

import { db } from 'boot/firebase';

import { getUserById } from './user';

export async function createPost(data: PostPayload) {
  // id 지정,
  // 기존 id가 없으면 새로 추가, 있으면 수정 됨
  // await setDoc(
  //   doc(db, 'posts', 'post-id'),
  //   {
  //     title: 'hello world!',
  //     // ...data,
  //     // readCount: 0,
  //     // likeCount: 0,
  //     // commentCount: 0,
  //     // bookmarkCount: 0,
  //     // createdAt: serverTimestamp(),
  //   },
  //   {
  //     merge: true,
  //   },
  // );
  const docRef = await addDoc(collection(db, 'posts'), {
    ...data,
    readCount: 0,
    likeCount: 0,
    commentCount: 0,
    bookmarkCount: 0,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getPosts(params: SearchParams) {
  console.log('[dev] params : ', params);

  // 1. 컬렉션에 있는 모든 문서 조회
  // const querySnapshot = await getDocs(collection(db, 'posts'));
  // // const posts = [];
  // // querySnapshot.forEach(docs => {
  // //   // doc.data() is never undefined for query doc snapshots
  // //   console.log(docs.id, ' => ', docs.data());
  // //   posts.push(docs.data());
  // // });
  //
  // const posts querySnapshot.docs.map((docs) => {
  //   const data = docs.data();
  //
  //   console.log(data);
  //
  //   return {
  //     ...data,
  //     id: docs.id,
  //     createdAt: data.createdAt?.toDate(),
  //   } as Post;
  // });

  // 2. 컬렉션에 있는 문서를 쿼리해서 조회
  const conditions = [];

  if (params.category) {
    conditions.push(where('category', '==', params.category));
  }
  if (params.tags && params.tags.length > 0) {
    conditions.push(where('tags', 'array-contains-any', params.tags));
  }
  if (params.sort) {
    conditions.push(orderBy(params.sort, 'desc'));
  }
  if (params.start) {
    conditions.push(startAfter(params.start));
  }
  if (params.limit) {
    conditions.push(limit(params.limit));
  }

  const q = query(collection(db, 'posts'), ...conditions);
  const querySnapshot = await getDocs(q);

  const posts = querySnapshot.docs.map((docs) => {
    const data = docs.data();
    return {
      ...data,
      id: docs.id,
      createdAt: data.createdAt?.toDate(),
    } as Post;
  });
  const lastPost = querySnapshot.docs[querySnapshot.docs.length - 1];

  return {
    posts,
    lastPost,
  };
}

export async function getPost(id: string) {
  const docSnap = await getDoc(doc(db, 'posts', id));

  if (!docSnap.exists()) {
    throw new Error('No such document!');
  }

  const data = docSnap.data();

  return {
    ...data,
    id: docSnap.id,
    createdAt: data.createdAt?.toDate(),
  } as Post;
}

export async function updatePost(id: string, data: PostPayload) {
  await updateDoc(doc(db, 'posts', id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deletePost(id: string) {
  await deleteDoc(doc(db, 'posts', id));
}

export async function getPostDetails(id: string) {
  await incrementReadCount(id);
  const post = await getPost(id);
  const postUser = await getUserById(post.uid ?? '');
  return {
    post,
    postUser,
  };
}

async function incrementReadCount(id: string) {
  await updateDoc(doc(db, 'posts', id), { readCount: increment(1) });
}

export async function addLike(uid: string, postId: string) {
  await setDoc(doc(db, 'post_likes', `${uid}_${postId}`), {
    uid,
    postId,
    createdAt: serverTimestamp(),
  });
}

export async function removeLike(uid: string, postId: string) {
  await deleteDoc(doc(db, 'post_likes', `${uid}_${postId}`));
}

export async function hasLike(uid: string, postId: string) {
  const docSnap = await getDoc(doc(db, 'post_likes', `${uid}_${postId}`));
  return docSnap.exists();
}

export async function addBookmark(uid: string, postId: string) {
  await setDoc(doc(db, 'users', uid, 'bookmarks', postId), {
    createdAt: serverTimestamp(),
  });
}

export async function removeBookmark(uid: string, postId: string) {
  await deleteDoc(doc(db, 'users', uid, 'bookmarks', postId));
}

export async function hasBookmark(uid: string, postId: string) {
  const docSnap = await getDoc(doc(db, 'users', uid, 'bookmarks', postId));
  return docSnap.exists();
}

export async function getUserBookmarks(uid: string) {
  const q = query(
    collection(db, 'users', uid, 'bookmarks'),
    orderBy('createdAt', 'desc'),
    limit(6),
  );
  const querySnapshot = await getDocs(q);

  return Promise.all(
    querySnapshot.docs.map((bookmarkDoc) => getPost(bookmarkDoc.id)),
  );
}

export async function getTags() {
  const q = query(
    collection(db, 'tags'),
    where('count', '>', 0),
    orderBy('count', 'desc'),
  );
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((docs) => docs.data());
}
