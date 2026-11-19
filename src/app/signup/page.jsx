
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "../lib/auth-client";
import GoogleAuthButton from "@/app/components/GoogleAuthButton";

const SignUpPage = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage("");

    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.value;

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        image,
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      console.log("Signup Successful:", data);

      router.push("/");
      router.refresh();
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
      console.error(error);
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

            <div className="mb-6 text-5xl">🌱</div>

            <h1 className="text-4xl font-extrabold leading-tight text-[#FCFAF6]">
              Be Part of Something Good!
            </h1>

            <p className="mt-6 text-base leading-8 text-[#F7E8E4]/80">
              Join a community of kind hearts and helping hands. Discover
              meaningful events, meet amazing people, and create positive
              changes together.
            </p>

            <div className="mt-12 rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">

              <p className="text-lg font-semibold text-[#F3B63F]">
                "Alone we can do so little; together we can do so much."
              </p>

              <p className="mt-3 text-sm text-[#F7E8E4]/70">
                Connect. Contribute. Make a difference.
              </p>

            </div>
          </div>

          <p className="relative z-10 text-sm text-[#F7E8E4]/50">
            © {new Date().getFullYear()} Kindred Circle. Made for good things.
          </p>
        </div>

        {/* Right Side - Signup Form */}
        <div className="p-6 sm:p-10 md:p-12">

          <div className="mb-8">

            <Link
              href="/"
              className="text-sm font-medium text-[#4D8C83] transition hover:opacity-70"
            >
              ← Back to Home
            </Link>

            <div className="mt-8">

              <div className="mb-4 text-4xl">💚</div>

              <h2 className="text-3xl font-bold text-[var(--kc-text)]">
                Join Kindred Circle
              </h2>

              <p className="mt-2 text-sm leading-6 text-[var(--kc-muted)]">
                Create your account and become part of a community that
                believes in making good things happen.
              </p>

            </div>
          </div>

          <form onSubmit={handleSignUp} className="space-y-5">

            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--kc-text)]">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                autoComplete="name"
                required
                className="w-full rounded-xl border border-[var(--kc-border)] bg-[var(--kc-hover)] px-4 py-3 text-[var(--kc-text)] outline-none transition placeholder:text-[var(--kc-muted)]/60 focus:border-[#4D8C83] focus:ring-2 focus:ring-[#4D8C83]/20"
              />
            </div>

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
                  placeholder="Create a password"
                  minLength={8}
                  maxLength={128}
                  autoComplete="new-password"
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

              <p className="mt-2 text-xs text-[var(--kc-muted)]">
                Password must be at least 8 characters.
              </p>
            </div>

            {/* Profile Image URL */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--kc-text)]">
                Profile Image URL
              </label>

              <input
                type="url"
                name="image"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
                className="w-full rounded-xl border border-[var(--kc-border)] bg-[var(--kc-hover)] px-4 py-3 text-[var(--kc-text)] outline-none transition placeholder:text-[var(--kc-muted)]/60 focus:border-[#4D8C83] focus:ring-2 focus:ring-[#4D8C83]/20"
              />

              <p className="mt-2 text-xs text-[var(--kc-muted)]">
                Upload your image to ImgBB or Cloudinary and paste the URL.
              </p>

              {/* Image Preview */}
              {imageUrl && (
                <div className="mt-4 flex items-center gap-4 rounded-xl border border-[var(--kc-border)] bg-[var(--kc-hover)] p-3">

                  <img
                    src={imageUrl}
                    alt="Profile Preview"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                    className="h-16 w-16 rounded-full border-2 border-[#4D8C83] object-cover"
                  />

                  <div>
                    <p className="text-sm font-semibold text-[var(--kc-text)]">
                      Image Preview
                    </p>

                    <p className="text-xs text-[var(--kc-muted)]">
                      Your profile picture
                    </p>
                  </div>

                </div>
              )}
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-500">
                {errorMessage}
              </div>
            )}

            {/* Signup Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#35213B] py-3.5 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#4D8C83] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Create Account →"}
            </button>

          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">

            <div className="h-px flex-1 bg-[var(--kc-border)]" />

            <span className="text-xs font-medium text-[var(--kc-muted)]">
              OR SIGN UP WITH
            </span>

            <div className="h-px flex-1 bg-[var(--kc-border)]" />

          </div>

          {/* Google Signup */}
          <GoogleAuthButton />

          {/* Login Link */}
          <p className="mt-8 text-center text-sm text-[var(--kc-muted)]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-[#4D8C83] transition hover:opacity-70"
            >
              Sign In
            </Link>
          </p>

          <p className="mt-8 text-center text-xs text-[var(--kc-muted)]">
            Good things grow when we grow together. 🌿
          </p>

        </div>
      </div>
    </main>
  );
};

export default SignUpPage;
