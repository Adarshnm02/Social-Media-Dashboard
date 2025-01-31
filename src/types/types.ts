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
    shares: string,
    createdAt: string;
    updatedAt: string;
    images?: string[];
  }
  

  export interface Comment {
    text: string;
    id: string;
    content: string;
    author: User;
    createdAt: string;
    updatedAt: string;
  }
  
  export type NotificationType = "info" | "success" | "warning" | "error";

  export interface Notification {
    id: string;
    type: NotificationType;
    message: string;
    createdAt: string;
    read: boolean;
    userId: string;
  }
  