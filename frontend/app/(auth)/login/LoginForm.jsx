"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

import authService from "../../_services/AuthService";

export default function LoginForm() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    authService.login(username, password).then((res) => {
      if (!res.ok) {
        console.log(res.ok)
        console.log(res.status)
        console.log(res.statusText)
        setIsLoading(false)
      } else {
        router.refresh();
        router.push(`${process.env.NEXT_PUBLIC_LINK_DASHBOARD}`);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-1/2">
      <label>
        <span>Username:</span>
        <input
          required
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <button className="btn-primary" disabled={isLoading}>
        {isLoading && <span>One moment...</span>}
        {!isLoading && <span>Login</span>}
      </button>
    </form>
  );
}