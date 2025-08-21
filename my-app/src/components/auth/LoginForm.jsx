"use client"
import { useState } from "react"

export default function LoginForm() {
  // ===== STATE MANAGEMENT =====
  // Form data state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // UI interaction state
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState("")

  // ===== FORM SUBMISSION LOGIC =====
  async function onSubmit(e) {
    e.preventDefault()
    setErr("")
    setLoading(true)
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || "Invalid login")
      }
      window.location.href = "/plan"
    } catch (e) {
      setErr(e.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    // ===== FULL-SCREEN CONTAINER & SOLID BACKGROUND =====
<div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 p-4">
      {/* ===== MAIN FORM CARD WITH GLASS MORPHISM EFFECT ===== */}
      <form
        onSubmit={onSubmit}
        className="w-full max-w-xs md:max-w-sm lg:max-w-md space-y-3 md:space-y-4 bg-white/95 backdrop-blur-sm p-4 md:p-6 lg:p-8 rounded-3xl shadow-2xl border border-white/20"
      >
        {/* ===== HEADER SECTION ===== */}
        <div className="text-center space-y-1 md:space-y-2">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-sm md:text-base text-gray-600">Sign in to your account</p>
        </div>

        {/* ===== FORM INPUTS SECTION ===== */}
        <div className="space-y-3 md:space-y-4">
          {/* Email Input Field */}
          <div className="space-y-1">
            <label className="text-sm md:text-base font-medium text-gray-700">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-2xl border-0 bg-gray-50 px-3 py-2 md:px-4 md:py-2.5 text-sm md:text-base placeholder-gray-400 ring-1 ring-gray-200 transition-all focus:bg-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input Field with Show/Hide Toggle */}
          <div className="space-y-1">
            <label className="text-sm md:text-base font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-2xl border-0 bg-gray-50 px-3 py-2 md:px-4 md:py-2.5 pr-12 md:pr-14 text-sm md:text-base placeholder-gray-400 ring-1 ring-gray-200 transition-all focus:bg-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
                placeholder="Enter your password"
              />
              {/* Password visibility toggle button */}
              <button
                type="button"
                onClick={() => setShowPw((s) => !s)}
                className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-sm md:text-base font-medium text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showPw ? "Hide" : "Show"}
              </button>
            </div>
          </div>
        </div>

        {/* ===== ERROR MESSAGE DISPLAY ===== */}
        {err && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-3 md:p-4">
            <p className="text-sm md:text-base text-red-600">{err}</p>
          </div>
        )}

        {/* ===== SUBMIT BUTTON WITH GRADIENT & LOADING STATE ===== */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100`}
        >
          {loading ? (
            // Loading spinner and text
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4 md:h-5 md:w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Signing in...
            </span>
          ) : (
            "Sign in"
          )}
        </button>

        {/* ===== FOOTER LINK SECTION ===== */}
        <p className="text-center text-sm md:text-base text-gray-600">
          Don't have an account?{" "}
          <a className="font-medium text-blue-600 hover:text-blue-500 transition-colors" href="/register">
            Create account
          </a>
        </p>
      </form>
    </div>
  )
}
