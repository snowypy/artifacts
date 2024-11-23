export interface User {
    githubId: string;
    username: string;
    avatarUrl: string;
    display: string;

    createdAt: string;
    lastLogin: string;
}

export interface AuthContextType {
    user: User | null;
    loading: boolean;
    checkAuth: () => Promise<void>;
    logout: () => Promise<void>;
}