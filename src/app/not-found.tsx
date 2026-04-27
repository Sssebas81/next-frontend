"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";

export default function NotFound() {
  const route = usePathname();

  return (
    <>
      <div className="p-6 text-center">
        <h1>404 Not Found</h1>
      </div>

      <div>
        <Image src="/pibble.png" alt="Pibble" width={2000} height={2000} />
      </div>
      
    </>
  );
}