"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

import authService from "../_services/AuthService";

export default function Logout() {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const onClick = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        authService.logout().then((res) => {
            if (!res.ok) {
                console.log(res.ok)
                console.log(res.status)
                console.log(res.statusText)
                setIsLoading(false)
            } else {
                router.refresh();
                router.push(`${process.env.NEXT_PUBLIC_LINK_HOME}`);
            }
        });
    };

    return (
        <button onClick={onClick} className="btn-secondary" disabled={isLoading}>
            {isLoading && <span>One moment...</span>}
            {!isLoading && <span>Logout</span>}
        </button>
    )
}