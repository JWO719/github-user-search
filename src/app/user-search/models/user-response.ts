import { User } from './user';

export interface UserResponse {
  total_count: number;
  incomplete_results: boolean;
  items: User[];
}
