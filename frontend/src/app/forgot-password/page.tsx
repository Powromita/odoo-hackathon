"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://127.0.0.1:5000/otp/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("reset_email", email);
        router.push("/verify-otp");
      } else {
        setMessage(data.error || "Something went wrong");
      }
    } catch (error) {
      setMessage("Server not responding. Check backend.");
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center px-6">
      <h1 className="text-3xl font-bold mb-4">Forgot Password</h1>
      <p className="text-white placeholder-white">Enter your email to receive an OTP.</p>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <input
          type="email"
          className="w-full border p-3 rounded text-white placeholder-white"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg"
        >
          Send OTP
        </button>

        {message && <p className="text-red-500 text-center">{message}</p>}
      </form>
    </main>
  );
}
