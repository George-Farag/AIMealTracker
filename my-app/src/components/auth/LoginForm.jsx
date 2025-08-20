"use client";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Invalid login");
      }
      window.location.href = "/plan"; // go to main page after login
    } catch (e) {
      setErr(e.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto w-full max-w-sm space-y-4">
      <h1 className="text-2xl font-semibold">Login</h1>

      <label className="block space-y-1">
        <span className="text-sm text-gray-700">Email</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
          placeholder="you@example.com"
        />
      </label>

      <label className="block space-y-1">
        <span className="text-sm text-gray-700">Password</span>
        <div className="flex items-stretch">
          <input
            type={showPw ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-l-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPw((s) => !s)}
            className="rounded-r-xl border border-l-0 border-gray-300 px-3 text-sm text-gray-700 hover:bg-gray-50"
          >
            {showPw ? "Hide" : "Show"}
          </button>
        </div>
      </label>

      {err && <p className="text-sm text-red-600">{err}</p>}

      <button
        type="submit"
        disabled={loading}
        className={`w-full rounded-xl px-4 py-2 text-sm font-medium text-white ${loading ? "bg-black/70" : "bg-black hover:bg-black/90"}`}
      >
        {loading ? "Logging in…" : "Login"}
      </button>

      <p className="text-center text-sm text-gray-600">
        Don’t have an account? <a className="underline" href="/register">Register</a>
      </p>
    </form>
  );
}
