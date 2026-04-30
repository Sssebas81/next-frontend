"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import loginAction from "./login.action";

export default function Login() {
    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(formRef.current!);
        const email = String(formData.get("email"));
        const password = String(formData.get("password"));
        
        const result = await loginAction(email, password);
        
        if (result.success && result.access_token) {
            //  Guardar token y email en localStorage
            localStorage.setItem("token", result.access_token);
            localStorage.setItem("userEmail", email);
            
            console.log("Email guardado:", localStorage.getItem("userEmail"));
            
            // Redirigir al feed
            router.push("/feed");
        } else {
            alert("Error de login: " + (result.error || "Credenciales inválidas"));
        }
    };

    return (
        <main>
            <div className="flex items-center justify-center h-screen">
                <div className="w-full max-w-md flex flex-col justify-center items-center">
                    <h1 className="text-5xl font-bold">Login</h1>
                    <p className="py-4">
                        Please enter your credentials to access your account.
                    </p>
                    <form className="flex flex-col max-w-75" ref={formRef} onSubmit={handleSubmit}>
                        <div className="my-2">
                            <label className="label w-full" htmlFor="email">
                                <span className="label-text">Email:</span>
                            </label>
                            <input
                                id="email"
                                name="email"
                                placeholder="example@mail.com"
                                type="email" 
                                required
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="my-2">
                            <label className="label w-full" htmlFor="password">
                                <span className="label-text">Password:</span>
                            </label>
                            <input
                                id="password"
                                name="password"
                                placeholder="°°°°°°"
                                type="password"
                                required
                                className="input input-bordered w-full"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        </main>
    );
}