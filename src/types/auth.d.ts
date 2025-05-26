import { User } from 'firebase/auth';

declare module '@/context/AuthContext' {
  export interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    register: (email: string, password: string, displayName: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => Promise<void>;
    updateProfile: (data: { displayName?: string; photoURL?: string }) => Promise<{ success: boolean; error?: string }>;
    signInWithGoogle: () => Promise<{ success: boolean; error?: string }>;
    changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
    isAuthenticated: boolean;
  }

  export const AuthProvider: React.FC<{ children: React.ReactNode }>;
  export const useAuth: () => AuthContextType;
}
