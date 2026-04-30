"use server";
import { cookies } from "next/headers";
import { loginService } from "./services/login.service";

export default async function loginAction(email: string, password: string) {
    try {
        const result = await loginService.login(email, password);
        
        const cookiesStore = await cookies();
        cookiesStore.set("token", result.access_token, {
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });
        
        //  Devolver el token y el email
        return { 
            success: true, 
            access_token: result.access_token,
            email: email // Guardamos el email
        };
    } catch (error) {
        console.error("Login failed:", error);
        return { success: false, error: "Login failed" };
    }
}