export interface LoginCredentials {
    email: string;
    password: string;
  }
  

export interface User {
  id: string;      
  email: string;
  password: string;
  avatar?: string;
  username?: string;
}
    // name: string;
    // role: 'user' | 'admin';
    // createdAt: string;
    // updatedAt: string;
  

  export interface AuthState {
    user: User | null;
    token: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }

  export interface Post {
    id: string;
    user: User;
    content: string;
    author: User;
    likes: number;
    comments: Comment[];
    createdAt: string;
    updatedAt: string;
  }
  

  export interface Comment {
    text: string;
    id: string;
    content: string;
    author: User;
    createdAt: string;
    updatedAt: string;
  }
  