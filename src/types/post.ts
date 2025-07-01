export interface Post {
  id: string;
  title: string;
  content: string;
  readCount?: number;
  commentCount?: number;
  likeCount?: number;
  bookmarkCount?: number;
  tags: string[];
  category?: string;
  createdAt?: Date;
  uid?: string;
}

export interface PostPayload {
  title: string;
  content: string;
  category: string;
  tags?: string[];
  uid?: string;
}
