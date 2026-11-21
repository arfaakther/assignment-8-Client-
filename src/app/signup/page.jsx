

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
    <main className="min-h-screen bg-[var(--kc-bg)] px-4 py-8 text-[var(--kc-text)] transition-colors duration-300 sm:px-6 sm:py-12">

      <div className="mx-auto grid min-h-[750px] w-full max-w-6xl overflow-hidden rounded-[2rem] border border-[var(--kc-border)] bg-[var(--kc-bg)] shadow-xl lg:grid-cols-[0.9fr_1.1fr]">

        {/* LEFT EDITORIAL SECTION */}
        <section className="relative hidden flex-col justify-between overflow-hidden bg-[#244C3A] p-10 text-[#F8F7F0] lg:flex xl:p-14">

          {/* Decorative shapes */}
          <div className="absolute -right-28 -top-24 h-80 w-80 rounded-full border border-white/15" />
          <div className="absolute -right-12 -top-8 h-56 w-56 rounded-full border border-white/10" />
          <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#D5E7A1]/10" />

          <div className="relative z-10">
            <Link href="/" className="text-2xl font-black tracking-tight">
              Kindred<span className="text-[#D5E7A1]">.</span>
            </Link>

            <p className="mt-2 text-xs uppercase tracking-[0.3em] text-white/60">
              Good things grow together
            </p>
          </div>

          <div className="relative z-10 py-10">

            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-[#D5E7A1]">
              A community of kind hearts
            </p>

            <h1 className="max-w-lg text-5xl font-black leading-[1.08] tracking-tight xl:text-6xl">
              Make room for
              <span className="block font-serif font-normal italic text-[#D5E7A1]">
                good things.
              </span>
            </h1>

            <p className="mt-7 max-w-md text-base leading-8 text-white/75">
              Meet people who care, discover meaningful events, and turn
              small acts of kindness into something bigger.
            </p>

            <div className="mt-12 border-t border-white/20 pt-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-[#D5E7A1]">01</p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-white/60">
                    Connect
                  </p>
                </div>

                <span className="text-2xl text-white/40">→</span>

                <div>
                  <p className="text-3xl font-bold text-[#D5E7A1]">02</p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-white/60">
                    Contribute
                  </p>
                </div>

                <span className="text-2xl text-white/40">→</span>

                <div>
                  <p className="text-3xl font-bold text-[#D5E7A1]">03</p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-white/60">
                    Grow
                  </p>
                </div>
              </div>
            </div>

            <blockquote className="mt-12 border-l-2 border-[#D5E7A1] pl-5">
              <p className="font-serif text-xl italic leading-relaxed text-white/90">
                "Alone we can do so little; together we can do so much."
              </p>
              <p className="mt-3 text-xs uppercase tracking-widest text-white/50">
                Connect. Contribute. Make a difference.
              </p>
            </blockquote>
          </div>

          <p className="relative z-10 text-xs text-white/40">
            © {new Date().getFullYear()} Kindred Circle
          </p>
        </section>

        {/* RIGHT SIGNUP SECTION */}
        <section className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-12 xl:px-16">

          <div className="w-full max-w-md">

            {/* Header */}
            <div className="mb-8">

              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--kc-muted)] transition hover:text-[var(--kc-primary)]"
              >
                <span>←</span> Back to Home
              </Link>

              <div className="mt-9">

                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D5E7A1] text-2xl">
                  🌱
                </div>

                <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-[var(--kc-primary)]">
                  Your journey starts here
                </p>

                <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                  Join the circle<span className="text-[#D77D5B]">.</span>
                </h2>

                <p className="mt-3 text-sm leading-7 text-[var(--kc-muted)]">
                  Create your account and become part of a community
                  that believes in making good things happen.
                </p>
              </div>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSignUp} className="space-y-5">

              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                  className="w-full rounded-xl border border-[var(--kc-border)] bg-[var(--kc-hover)] px-4 py-3.5 text-sm outline-none transition placeholder:text-[var(--kc-muted)]/60 focus:border-[var(--kc-primary)] focus:ring-2 focus:ring-[var(--kc-primary)]/15"
                />
              </div>

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
                  className="w-full rounded-xl border border-[var(--kc-border)] bg-[var(--kc-hover)] px-4 py-3.5 text-sm outline-none transition placeholder:text-[var(--kc-muted)]/60 focus:border-[var(--kc-primary)] focus:ring-2 focus:ring-[var(--kc-primary)]/15"
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
                    placeholder="Create a password"
                    minLength={8}
                    maxLength={128}
                    autoComplete="new-password"
                    required
                    className="w-full rounded-xl border border-[var(--kc-border)] bg-[var(--kc-hover)] px-4 py-3.5 pr-20 text-sm outline-none transition placeholder:text-[var(--kc-muted)]/60 focus:border-[var(--kc-primary)] focus:ring-2 focus:ring-[var(--kc-primary)]/15"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[var(--kc-primary)] hover:opacity-70"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                <p className="mt-2 text-xs text-[var(--kc-muted)]">
                  Use at least 8 characters.
                </p>
              </div>

              {/* Profile Image */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Profile Image URL
                </label>

                <input
                  type="url"
                  name="image"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  required
                  className="w-full rounded-xl border border-[var(--kc-border)] bg-[var(--kc-hover)] px-4 py-3.5 text-sm outline-none transition placeholder:text-[var(--kc-muted)]/60 focus:border-[var(--kc-primary)] focus:ring-2 focus:ring-[var(--kc-primary)]/15"
                />

                <p className="mt-2 text-xs leading-5 text-[var(--kc-muted)]">
                  Paste a profile image URL from ImgBB or Cloudinary.
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
                      className="h-14 w-14 rounded-full border-2 border-[#A8BDA3] object-cover"
                    />

                    <div>
                      <p className="text-sm font-semibold">
                        Image Preview
                      </p>
                      <p className="mt-1 text-xs text-[var(--kc-muted)]">
                        Your profile picture
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Error */}
              {errorMessage && (
                <div className="rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-500">
                  {errorMessage}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#244C3A] py-4 font-bold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-[#315E48] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating Account..." : "Create My Account"}
                {!loading && (
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                )}
              </button>

            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-[var(--kc-border)]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--kc-muted)]">
                Or continue with
              </span>
              <div className="h-px flex-1 bg-[var(--kc-border)]" />
            </div>

            {/* Google Signup */}
            <GoogleAuthButton />

            {/* Login */}
            <p className="mt-8 text-center text-sm text-[var(--kc-muted)]">
              Already part of the circle?{" "}
              <Link
                href="/login"
                className="font-bold text-[var(--kc-primary)] underline decoration-[#A8BDA3] decoration-2 underline-offset-4 transition hover:opacity-70"
              >
                Sign In
              </Link>
            </p>

            <p className="mt-7 text-center text-xs text-[var(--kc-muted)]">
              Good things grow when we grow together. 🌿
            </p>

          </div>
        </section>
      </div>
    </main>
  );
};

export default SignUpPage;
