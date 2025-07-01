import type { QueryDocumentSnapshot } from 'firebase/firestore';

export interface Category {
  label: string;
  value: string;
}

export interface RouteParams {
  id: string;
}

export interface SearchParams {
  category: string;
  tags: string[];
  sort: string;
  limit: number;
  start: QueryDocumentSnapshot | undefined;
}
