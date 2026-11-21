
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
    <main
      className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6"
      style={{
        background: "var(--kc-bg)",
        color: "var(--kc-text)",
      }}
    >
      <div className="grid w-full max-w-6xl overflow-hidden border border-[var(--kc-border)] bg-[var(--kc-bg)] shadow-2xl md:min-h-[680px] md:grid-cols-[1fr_0.9fr]">

        {/* Left Editorial Panel */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-[#244C3A] p-10 text-white sm:p-12 md:flex">

          {/* Decorative shapes */}
          <div className="absolute -right-24 -top-20 h-80 w-80 rounded-full border border-white/15" />
          <div className="absolute -right-12 -top-8 h-56 w-56 rounded-full border border-white/15" />
          <div className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-[#D5E7A1]/10" />

          {/* Brand */}
          <div className="relative z-10">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#D5E7A1] text-2xl text-[#244C3A]">
                ✳
              </span>

              <span className="text-2xl font-extrabold tracking-tight">
                Kindred <span className="text-[#D5E7A1]">Circle</span>
              </span>
            </Link>

            <p className="mt-3 text-xs uppercase tracking-[0.22em] text-white/55">
              Good things grow together.
            </p>
          </div>

          {/* Main message */}
          <div className="relative z-10 my-16">
            <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#D5E7A1]">
              <span className="h-px w-8 bg-[#D5E7A1]" />
              Your community awaits
            </p>

            <h1 className="max-w-lg text-5xl font-extrabold leading-[1.12] lg:text-6xl">
              Good to see
              <span className="block text-[#D5E7A1]">you again.</span>
            </h1>

            <p className="mt-7 max-w-md text-base leading-8 text-white/70">
              Reconnect with people who care. Discover meaningful events,
              lend a helping hand, and make a positive difference together.
            </p>

            <div className="mt-12 max-w-md border-l-2 border-[#D5E7A1] pl-6">
              <p className="text-xl font-semibold leading-relaxed text-[#D5E7A1]">
                "Small acts, when multiplied by many people, can change the world."
              </p>

              <p className="mt-4 text-sm text-white/55">
                Find your people. Share your kindness. Grow together.
              </p>
            </div>
          </div>

          {/* Bottom */}
          <div className="relative z-10 flex items-center justify-between border-t border-white/15 pt-6">
            <p className="text-xs text-white/50">
              © {new Date().getFullYear()} Kindred Circle
            </p>

            <span className="text-sm text-[#D5E7A1]">✳ Together is better</span>
          </div>
        </div>

        {/* Right Login Form */}
        <div className="flex flex-col justify-center px-6 py-10 sm:px-12 md:px-12 lg:px-16">

          {/* Mobile brand */}
          <div className="mb-10 md:hidden">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#244C3A] text-xl text-[#D5E7A1]">
                ✳
              </span>

              <span className="text-xl font-extrabold text-[var(--kc-primary)]">
                Kindred <span className="text-[#D77D5B]">Circle</span>
              </span>
            </Link>
          </div>

          <div>
            <Link
              href="/"
              className="text-sm font-semibold text-[var(--kc-primary)] transition hover:opacity-60"
            >
              ← Back to Home
            </Link>

            <div className="mt-10">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#D77D5B]">
                Welcome back
              </p>

              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Sign in to your account.
              </h2>

              <p className="mt-3 max-w-sm text-sm leading-7 text-[var(--kc-muted)]">
                Your next meaningful moment starts here. Come back and
                continue growing with your community.
              </p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="mt-9 space-y-5">

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                autoComplete="email"
                required
                className="w-full rounded-lg border border-[var(--kc-border)] bg-[var(--kc-hover)] px-4 py-3.5 text-[var(--kc-text)] outline-none transition placeholder:text-[var(--kc-muted)]/60 focus:border-[var(--kc-primary)] focus:ring-2 focus:ring-[var(--kc-primary)]/15"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-lg border border-[var(--kc-border)] bg-[var(--kc-hover)] px-4 py-3.5 pr-20 text-[var(--kc-text)] outline-none transition placeholder:text-[var(--kc-muted)]/60 focus:border-[var(--kc-primary)] focus:ring-2 focus:ring-[var(--kc-primary)]/15"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[var(--kc-primary)] hover:opacity-60"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Error */}
            {errorMessage && (
              <div className="rounded-lg border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-500">
                {errorMessage}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-3 rounded-full bg-[#244C3A] py-4 font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#355F49] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
              {!loading && (
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-[var(--kc-border)]" />
            <span className="text-[10px] font-bold tracking-[0.18em] text-[var(--kc-muted)]">
              OR CONTINUE WITH
            </span>
            <div className="h-px flex-1 bg-[var(--kc-border)]" />
          </div>

          {/* Google Login */}
          <GoogleAuthButton />

          {/* Signup */}
          <p className="mt-9 text-center text-sm text-[var(--kc-muted)]">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-bold text-[var(--kc-primary)] underline decoration-[#D5E7A1] decoration-2 underline-offset-4 transition hover:text-[#D77D5B]"
            >
              Join Kindred Circle
            </Link>
          </p>

          <p className="mt-7 text-center text-xs text-[var(--kc-muted)]">
            Together, we make good things happen. 💚
          </p>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;

