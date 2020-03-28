import {posts} from './index';

// 학습 노트 조회와 관련된 CRUD API 함수
// 학습 노트 목록 조회 API
function fetchPosts() {
  return posts.get('/');
}

// 학습 노트 조회 API
function fetchPost(postId) {
  return posts.get(`/${postId}`);
}

// 학습 노트 생성 API
function createPost(data) {
  return posts.post('/', data);
}

// 학습 노트 수정 API
function editPost(postId, data) {
  return posts.put(`/${postId}`, data);
}

// 학습 노트 삭제 API
function deletePost(postId) {
  return posts.delete(postId);
}

export {fetchPosts, fetchPost, createPost, editPost, deletePost};
