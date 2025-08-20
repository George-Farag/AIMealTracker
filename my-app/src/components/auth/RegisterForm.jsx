"use client";
import { useState } from "react";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    if (pw !== pw2) {
      setErr("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password: pw })
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Registration failed");
      }
      // After successful registration, go straight to app
      window.location.href = "/plan";
    } catch (e) {
      setErr(e.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto w-full max-w-sm space-y-4">
      <h1 className="text-2xl font-semibold">Create account</h1>

      <label className="block space-y-1">
        <span className="text-sm text-gray-700">Name</span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
          placeholder="Your name"
        />
      </label>

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
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            required
            minLength={6}
            className="w-full rounded-l-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
            placeholder="At least 6 characters"
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

      <label className="block space-y-1">
        <span className="text-sm text-gray-700">Confirm password</span>
        <input
          type={showPw ? "text" : "password"}
          value={pw2}
          onChange={(e) => setPw2(e.target.value)}
          required
          minLength={6}
          className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
          placeholder="Repeat password"
        />
      </label>

      {err && <p className="text-sm text-red-600">{err}</p>}

      <button
        type="submit"
        disabled={loading}
        className={`w-full rounded-xl px-4 py-2 text-sm font-medium text-white ${loading ? "bg-black/70" : "bg-black hover:bg-black/90"}`}
      >
        {loading ? "Creating…" : "Create account"}
      </button>

      <p className="text-center text-sm text-gray-600">
        Already have an account? <a className="underline" href="/login">Login</a>
      </p>
    </form>
  );
}
