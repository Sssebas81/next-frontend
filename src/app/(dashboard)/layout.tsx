import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Navbar from "@/common/components/Navbar";

export default async function DashboardLayout({children}: {children: React.ReactNode}) {

    const token =  (await cookies()).get("token")?.value;
    if (!token) {
        redirect("/login");
    }

    return (
        <div className="dashboard-layout">
            <Navbar />
            {children}
        </div>
    );
}