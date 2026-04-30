// src/app/(public)/register/register.action.ts
"use server";
import { cookies } from "next/headers";
import { registerService } from "./services/register.service";

export default async function registerAction(email: string, password: string, name?: string) {
    try {
        const result = await registerService.register(email, password, name);
        
        // Guardar token en cookie httpOnly (para el servidor)
        const cookiesStore = await cookies();
        cookiesStore.set("token", result.access_token, {
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 1 semana
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax"
        });
        
        // Devolver el token y el email para el cliente
        return { 
            success: true, 
            access_token: result.access_token,
            email: email,
            name: name || email.split('@')[0]
        };
    } catch (error) {
        console.error("Register failed:", error);
        return { success: false, error: "Error al registrar usuario" };
    }
}