"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const email =
    typeof window !== "undefined" ? localStorage.getItem("reset_email") : "";

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://127.0.0.1:5000/otp/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/reset-password");
      } else {
        setMessage(data.error || "Invalid OTP");
      }
    } catch (err) {
      setMessage("Server error. Please try again.");
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center px-6">
      <h1 className="text-3xl font-bold mb-4">Verify OTP</h1>
      <p className="text-white placeholder-white">Enter the OTP sent to your email.</p>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <input
          type="text"
          className="w-full border p-3 rounded text-white placeholder-white"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg"
        >
          Verify OTP
        </button>

        {message && <p className="text-red-500 text-center">{message}</p>}
      </form>
    </main>
  );
}
