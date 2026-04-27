"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(formRef.current!)
        console.info(formData.get("email"), formData.get("password"))

        if (formData.get("password") !== formData.get("confirmPassword")) {
            alert("Passwords do not match")
            return
        }

        if(formData.get("fullName") === "" || formData.get("email") === "" || formData.get("Username") === "") {
            alert("Please fill in all fields")
            return
        }

        if(formData.get("FullName") && formData.get("email") && formData.get("Username") && formData.get("password") && formData.get("confirmPassword")) {
            alert("Registration successful")
            return
        }
            
        router.push("/login")

    }

    return (
        <main>
            <div className="flex items-center justify-center h-screen">
                <div className="w-full max-w-md flex flex-col justify-center items-center">
                    <h1 className="text-5xl font-bold">Register</h1>
                    <p className="py-4">
                        Please create an account to access our services.
                    </p>
                    <form className="flex flex-col max-w-75" ref={formRef} onSubmit={handleSubmit}>
                        <div className="my-1">
                            <label className="label w-full" htmlFor="fullName">
                                <span className="label-text">Full Name</span>
                            </label>
                            <input
                                id="fullName"
                                name="fullName"
                                placeholder="John Jairo"
                                type="text" required
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="my-2">
                            <label className="label w-full" htmlFor="email">
                                <span className="label-text">Email</span>
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
                        <div className="my-3">
                            <label className="label w-full" htmlFor="Username">
                                <span className="label-text">Username</span>
                            </label>
                            <input
                                id="Username"
                                name="Username"
                                type="text"
                                required
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div className="my-4">
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

                        <div className="my-5">
                            <label className="label w-full" htmlFor="confirmPassword">
                                <span className="label-text">Confirm Password:</span>
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="°°°°°°"
                                type="password"
                                required
                                className="input input-bordered w-full"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>
                </div>
            </div>
        </main>
    )
}