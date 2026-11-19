
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "../lib/auth-client";
import GoogleAuthButton from "@/app/components/GoogleAuthButton";

const LoginPage = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage("");

    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      console.log("Login Successful:", data);

      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Login Error:", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--kc-bg)] px-4 py-12 transition-colors duration-300">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-[var(--kc-border)] bg-[var(--kc-bg)] shadow-xl md:grid-cols-2">

        {/* Left Side */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-[#35213B] p-12 md:flex">

          {/* Decorative Circles */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#4D8C83]/30" />
          <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-[#F3B63F]/20" />

          <div className="relative z-10">
            <Link href="/" className="text-2xl font-bold text-[#FCFAF6]">
              Kindred <span className="text-[#F3B63F]">Circle</span>
            </Link>

            <p className="mt-3 text-sm text-[#F7E8E4]/70">
              Good things grow together.
            </p>
          </div>

          <div className="relative z-10">
            <div className="mb-6 text-5xl">🤝</div>

            <h1 className="text-4xl font-extrabold leading-tight text-[#FCFAF6]">
              Welcome Back to Your Community!
            </h1>

            <p className="mt-6 text-base leading-8 text-[#F7E8E4]/80">
              Reconnect with people who care. Discover meaningful events,
              lend a helping hand, and make a positive difference together.
            </p>

            <div className="mt-12 rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
              <p className="text-lg font-semibold text-[#F3B63F]">
                "Small acts, when multiplied by many people, can change the world."
              </p>

              <p className="mt-3 text-sm text-[#F7E8E4]/70">
                Find your people. Share your kindness. Grow together.
              </p>
            </div>
          </div>

          <p className="relative z-10 text-sm text-[#F7E8E4]/50">
            © {new Date().getFullYear()} Kindred Circle. Made for good things.
          </p>
        </div>

        {/* Right Side - Login Form */}
        <div className="p-6 sm:p-10 md:p-12">

          <div className="mb-8">
            <Link
              href="/"
              className="text-sm font-medium text-[#4D8C83] transition hover:opacity-70"
            >
              ← Back to Home
            </Link>

            <div className="mt-8">
              <div className="mb-4 text-4xl">🌿</div>

              <h2 className="text-3xl font-bold text-[var(--kc-text)]">
                Welcome Back!
              </h2>

              <p className="mt-2 text-sm leading-6 text-[var(--kc-muted)]">
                Sign in to reconnect with your community and continue spreading kindness.
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--kc-text)]">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                autoComplete="email"
                required
                className="w-full rounded-xl border border-[var(--kc-border)] bg-[var(--kc-hover)] px-4 py-3 text-[var(--kc-text)] outline-none transition placeholder:text-[var(--kc-muted)]/60 focus:border-[#4D8C83] focus:ring-2 focus:ring-[#4D8C83]/20"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--kc-text)]">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-xl border border-[var(--kc-border)] bg-[var(--kc-hover)] px-4 py-3 pr-20 text-[var(--kc-text)] outline-none transition placeholder:text-[var(--kc-muted)]/60 focus:border-[#4D8C83] focus:ring-2 focus:ring-[#4D8C83]/20"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#4D8C83] hover:opacity-70"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-500">
                {errorMessage}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#35213B] py-3.5 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#4D8C83] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In →"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-[var(--kc-border)]" />

            <span className="text-xs font-medium text-[var(--kc-muted)]">
              OR CONTINUE WITH
            </span>

            <div className="h-px flex-1 bg-[var(--kc-border)]" />
          </div>

          {/* Google Login */}
          <GoogleAuthButton />

          {/* Signup Link */}
          <p className="mt-8 text-center text-sm text-[var(--kc-muted)]">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-bold text-[#4D8C83] transition hover:opacity-70"
            >
              Join Kindred Circle
            </Link>
          </p>

          <p className="mt-8 text-center text-xs text-[var(--kc-muted)]">
            Together, we make good things happen. 💚
          </p>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
