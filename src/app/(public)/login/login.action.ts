"use server";
import { cookies } from "next/headers";
import { loginService } from "./services/login.service";

export default async function loginAction(email: string, password: string) {

    try {
        const result = await loginService.login(email, password);

    const cookiesStore = await cookies();
    cookiesStore.set("token", result.access_token, {
        httpOnly: true,
        path:"/",
        maxAge: 60 * 60 * 24 * 7, // 1 week

    });
        return result;
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
}
