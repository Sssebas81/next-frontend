// src/app/(public)/register/page.tsx
"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import registerAction from "./register.action";

export default function Register() {
    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>("");

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const formData = new FormData(formRef.current!);
        const name = String(formData.get("name") || "");
        const email = String(formData.get("email"));
        const password = String(formData.get("password"));
        const confirmPassword = String(formData.get("confirmPassword"));

        // Validaciones
        if (!email || !password) {
            setError("Por favor completa todos los campos");
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            setIsLoading(false);
            return;
        }

        if (password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres");
            setIsLoading(false);
            return;
        }

        try {
            const result = await registerAction(email, password, name);
            
            if (result.success && result.access_token) {
                // ✅ Guardar token y email en localStorage
                localStorage.setItem("token", result.access_token);
                localStorage.setItem("userEmail", result.email);
                if (name) {
                    localStorage.setItem("userName", result.name || name);
                }
                
                console.log("Registro exitoso. Email guardado:", result.email);
                
                // Redirigir al feed
                router.push("/feed");
            } else {
                setError(result.error || "Error al registrar usuario");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("Error de conexión. Intenta nuevamente.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main>
            <div className="flex items-center justify-center min-h-screen bg-base-200">
                <div className="w-full max-w-md">
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h1 className="text-3xl font-bold text-center mb-4">Registro</h1>
                            <p className="text-center text-gray-500 mb-6">
                                Crea una cuenta para empezar a jugar
                            </p>
                            
                            {error && (
                                <div className="alert alert-error mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{error}</span>
                                </div>
                            )}
                            
                            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                                <div className="form-control">
                                    <label className="label" htmlFor="name">
                                        <span className="label-text font-semibold">Nombre (opcional)</span>
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Tu nombre"
                                        className="input input-bordered w-full"
                                        disabled={isLoading}
                                    />
                                </div>
                                
                                <div className="form-control">
                                    <label className="label" htmlFor="email">
                                        <span className="label-text font-semibold">Correo electrónico *</span>
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="ejemplo@correo.com"
                                        required
                                        className="input input-bordered w-full"
                                        disabled={isLoading}
                                    />
                                </div>
                                
                                <div className="form-control">
                                    <label className="label" htmlFor="password">
                                        <span className="label-text font-semibold">Contraseña *</span>
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="••••••"
                                        required
                                        className="input input-bordered w-full"
                                        disabled={isLoading}
                                    />
                                    <label className="label">
                                        <span className="label-text-alt text-gray-500">
                                            Mínimo 6 caracteres
                                        </span>
                                    </label>
                                </div>
                                
                                <div className="form-control">
                                    <label className="label" htmlFor="confirmPassword">
                                        <span className="label-text font-semibold">Confirmar contraseña *</span>
                                    </label>
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="••••••"
                                        required
                                        className="input input-bordered w-full"
                                        disabled={isLoading}
                                    />
                                </div>
                                
                                <button 
                                    type="submit" 
                                    className="btn btn-primary w-full mt-6"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="loading loading-spinner"></span>
                                            Registrando...
                                        </>
                                    ) : (
                                        "Registrarse"
                                    )}
                                </button>
                            </form>
                            
                            <div className="text-center mt-4">
                                <p className="text-sm text-gray-500">
                                    ¿Ya tienes una cuenta?{" "}
                                    <Link href="/login" className="text-primary font-semibold hover:underline">
                                        Inicia sesión
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}