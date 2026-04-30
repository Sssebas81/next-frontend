// src/app/(public)/register/services/register.service.ts
import axiosClient from "@/lib/axios/client";

export interface RegisterResponse {
    access_token: string;
    user: {
        id: number;
        email: string;
        name?: string;
    };
}

export interface RegisterRequest {
    email: string;
    password: string;
    name?: string;
}

class RegisterService {
    async register(email: string, password: string, name?: string): Promise<RegisterResponse> {
        try {
            const response = await axiosClient.post<RegisterResponse>("/auth/register", {
                email,
                password,
                name
            });
            return response.data;
        } catch (error) {
            console.error("Error en registro:", error);
            throw error;
        }
    }
}

export const registerService = new RegisterService();