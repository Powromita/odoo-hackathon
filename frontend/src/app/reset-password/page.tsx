"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const email =
    typeof window !== "undefined" ? localStorage.getItem("reset_email") : "";

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://127.0.0.1:5000/otp/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, new_password: password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.removeItem("reset_email");
        router.push("/login");
      } else {
        setMessage(data.error || "Something went wrong");
      }
    } catch (err) {
      setMessage("Server not responding");
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center px-6">
      <h1 className="text-3xl font-bold mb-4">Reset Password</h1>
      <p className="text-gray-600 mb-6">Enter your new password.</p>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <input
          type="password"
          className="w-full border p-3 rounded text-black"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg"
        >
          Reset Password
        </button>

        {message && <p className="text-red-500 text-center">{message}</p>}
      </form>
    </main>
  );
}
