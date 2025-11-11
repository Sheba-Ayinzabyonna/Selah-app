"use client"

import { useState } from "react"
import LoginForm from "./login-form"
import RegisterForm from "./register-form"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-500 rounded-lg mb-4">
            <span className="text-white font-bold text-lg">H</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Hook</h1>
          <p className="text-slate-400">Secure Digital Savings Platform</p>
        </div>

        {/* Auth Container */}
        <div className="bg-slate-800 rounded-xl shadow-2xl border border-slate-700 p-8">
          {isLogin ? <LoginForm /> : <RegisterForm />}

          {/* Toggle Auth Mode */}
          <div className="mt-6 text-center">
            <p className="text-slate-400">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-emerald-500 hover:text-emerald-400 font-semibold transition-colors"
              >
                {isLogin ? "Sign Up" : "Log In"}
              </button>
            </p>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-400">
          <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.293 9.707a1 1 0 010-1.414L10 3.586l4.707 4.707a1 1 0 01-1.414 1.414L10 6.414l-3.293 3.293a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span>100% Savings Security Guaranteed</span>
        </div>
      </div>
    </div>
  )
}
