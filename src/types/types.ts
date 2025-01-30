export interface LoginCredentials {
    email: string;
    password: string;
  }
  

export interface User {
    id: string;      
    name: string;
    email: string;
    avatar?: string;
    role: 'user' | 'admin';
    createdAt: string;
    updatedAt: string;
  }
  

  export interface AuthState {
    user: User | null;
    token: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }