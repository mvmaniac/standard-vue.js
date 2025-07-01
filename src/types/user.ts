export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  createdAt?: Date;
}

export interface UserForm {
  email: string;
  password: string;
  nickname: string | null;
}
