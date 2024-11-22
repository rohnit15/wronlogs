export interface UserBody {
  username: string;
  name: string;
  emailId: string;
  password: string;
  role?: 'basic' | 'author' | 'admin';
}
