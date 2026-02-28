import { API_URL } from './constants';

class ApiClient {
    private baseUrl: string;

    constructor() {
        this.baseUrl = API_URL;
    }

    private getToken(): string | null {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem('physique_token');
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const token = this.getToken();
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers,
        };

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers,
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'Request failed' }));
            throw new Error(error.message || `HTTP ${response.status}`);
        }

        return response.json();
    }

    // Auth
    async register(email: string, password: string, name: string) {
        return this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ email, password, name }),
        });
    }

    async login(email: string, password: string) {
        return this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
    }

    async googleLogin(idToken: string) {
        return this.request('/auth/google', {
            method: 'POST',
            body: JSON.stringify({ idToken }),
        });
    }

    async getMe() {
        return this.request('/auth/me');
    }

    // Profile
    async updateProfile(data: Record<string, unknown>) {
        return this.request('/profile', {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async getProfile() {
        return this.request('/profile');
    }

    // Progress
    async logProgress(data: Record<string, unknown>) {
        return this.request('/progress', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async getProgress() {
        return this.request('/progress');
    }

    // Habits
    async logHabits(data: Record<string, unknown>) {
        return this.request('/habits', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async getHabits() {
        return this.request('/habits');
    }

    // Workouts
    async logWorkout(data: Record<string, unknown>) {
        return this.request('/workouts/log', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async getWorkoutLogs() {
        return this.request('/workouts/logs');
    }
}

export const api = new ApiClient();
