
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("kindred-theme") || "light";
    setTheme(savedTheme);
    document.documentElement.dataset.theme = savedTheme;
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("kindred-theme", newTheme);
    document.documentElement.dataset.theme = newTheme;
  };

  const navItems = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "Upcoming Events", path: "/events" },
  ];

  const getLinkStyle = (path) =>
    pathname === path
      ? "bg-[#244C3A] text-[#F8F7F0] shadow-sm"
      : "text-[var(--kc-text)] hover:bg-[var(--kc-hover)]";

  const handleLogout = async () => {
    setLoading(true);

    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            setProfileOpen(false);
            setIsOpen(false);
            router.replace("/login");
            router.refresh();
          },
        },
      });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const ThemeButton = () => (
    <button
      onClick={toggleTheme}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--kc-border)] text-lg text-[var(--kc-text)] transition hover:border-[#A8BDA3] hover:bg-[var(--kc-hover)]"
      aria-label="Change theme"
      title="Change theme"
    >
      {theme === "light" ? "☾" : "☀"}
    </button>
  );

  const ProfileImage = ({ size = "w-10 h-10" }) => (
    user.image && !imageError ? (
      <img
        src={user.image}
        alt="Profile"
        onError={() => setImageError(true)}
        className={`${size} rounded-full object-cover ring-2 ring-[#A8BDA3]`}
      />
    ) : (
      <div
        className={`${size} flex items-center justify-center rounded-full bg-[#D5E7A1] font-bold text-[#244C3A]`}
      >
        {user.name?.charAt(0)?.toUpperCase() || "U"}
      </div>
    )
  );

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--kc-border)] bg-[var(--kc-bg)]/95 shadow-[0_3px_18px_rgba(36,76,58,0.05)] backdrop-blur-md">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[82px] items-center justify-between">

          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-12 w-12 rotate-[-5deg] items-center justify-center rounded-2xl bg-[#244C3A] text-2xl text-[#D5E7A1] shadow-md transition duration-300 group-hover:rotate-0">
              ✳
            </div>

            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-[var(--kc-text)] sm:text-2xl">
                Kindred
                <span className="text-[#4D8060]"> Circle</span>
              </h1>
              <p className="mt-0.5 text-[10px] font-medium tracking-[0.13em] text-[var(--kc-muted)] sm:text-xs">
                GOOD THINGS GROW TOGETHER
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-2 rounded-full border border-[var(--kc-border)] bg-[var(--kc-hover)]/50 p-1.5 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.path}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${getLinkStyle(item.path)}`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden items-center gap-3 md:flex">
            <ThemeButton />

            {!isPending && (
              <>
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setProfileOpen(!profileOpen)}
                      className={`flex items-center gap-3 rounded-full border border-[var(--kc-border)] bg-[var(--kc-hover)]/50 py-1.5 pl-1.5 pr-4 transition hover:border-[#A8BDA3] ${
                        profileOpen ? "border-[#A8BDA3]" : ""
                      }`}
                    >
                      <ProfileImage size="w-9 h-9" />

                      <span className="max-w-28 truncate text-sm font-semibold text-[var(--kc-text)]">
                        {user.name || "My Account"}
                      </span>

                      <span className="text-xs text-[var(--kc-muted)]">
                        {profileOpen ? "▲" : "▼"}
                      </span>
                    </button>

                    {/* Profile Dropdown */}
                    {profileOpen && (
                      <div className="absolute right-0 top-14 w-64 overflow-hidden rounded-2xl border border-[var(--kc-border)] bg-[var(--kc-bg)] p-2 shadow-xl">
                        <div className="mb-2 rounded-xl bg-[var(--kc-hover)] px-4 py-4">
                          <p className="truncate font-bold text-[var(--kc-text)]">
                            {user.name}
                          </p>
                          <p className="mt-1 truncate text-xs text-[var(--kc-muted)]">
                            {user.email}
                          </p>
                        </div>

                        <Link
                          href="/create-event"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[var(--kc-text)] transition hover:bg-[var(--kc-hover)]"
                        >
                          <span className="text-lg text-[#4D8060]">＋</span>
                          Create Event
                        </Link>

                        <Link
                          href="/manage-events"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[var(--kc-text)] transition hover:bg-[var(--kc-hover)]"
                        >
                          <span className="text-lg text-[#4D8060]">✎</span>
                          Update / Manage Events
                        </Link>

                        <Link
                          href="/joined-events"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[var(--kc-text)] transition hover:bg-[var(--kc-hover)]"
                        >
                          <span className="text-lg text-[#4D8060]">♡</span>
                          Joined Events
                        </Link>

                        <div className="my-2 border-t border-[var(--kc-border)]" />

                        <button
                          onClick={handleLogout}
                          disabled={loading}
                          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-red-500 transition hover:bg-red-50 disabled:opacity-50 dark:hover:bg-red-950"
                        >
                          <span className="text-lg">↩</span>
                          {loading ? "Logging out..." : "Logout"}
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="rounded-full bg-[#244C3A] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#35634A] hover:shadow-md"
                  >
                    Login <span className="ml-1">↗</span>
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeButton />

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#244C3A] text-xl text-white transition hover:bg-[#35634A]"
              aria-label="Toggle menu"
            >
              {isOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="border-t border-[var(--kc-border)] pb-5 pt-4 md:hidden">

            {/* Mobile Navigation */}
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${getLinkStyle(item.path)}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {!isPending && (
              <>
                {user ? (
                  <div className="mt-4 border-t border-[var(--kc-border)] pt-4">

                    {/* Mobile User Info */}
                    <div className="mb-3 flex items-center gap-3 rounded-2xl bg-[var(--kc-hover)] p-3">
                      <ProfileImage size="w-11 h-11" />

                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-[var(--kc-text)]">
                          {user.name || "My Account"}
                        </p>
                        <p className="truncate text-xs text-[var(--kc-muted)]">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    {/* Mobile Profile Links */}
                    <div className="flex flex-col gap-1">
                      <Link
                        href="/create-event"
                        onClick={() => setIsOpen(false)}
                        className="rounded-xl px-4 py-3 text-sm font-medium text-[var(--kc-text)] transition hover:bg-[var(--kc-hover)]"
                      >
                        ＋ Create Event
                      </Link>

                      <Link
                        href="/manage-events"
                        onClick={() => setIsOpen(false)}
                        className="rounded-xl px-4 py-3 text-sm font-medium text-[var(--kc-text)] transition hover:bg-[var(--kc-hover)]"
                      >
                        ✎ Update / Manage Events
                      </Link>

                      <Link
                        href="/joined-events"
                        onClick={() => setIsOpen(false)}
                        className="rounded-xl px-4 py-3 text-sm font-medium text-[var(--kc-text)] transition hover:bg-[var(--kc-hover)]"
                      >
                        ♡ Joined Events
                      </Link>

                      <button
                        onClick={handleLogout}
                        disabled={loading}
                        className="rounded-xl px-4 py-3 text-left text-sm font-semibold text-red-500 transition hover:bg-red-50 disabled:opacity-50 dark:hover:bg-red-950"
                      >
                        ↩ {loading ? "Logging out..." : "Logout"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 border-t border-[var(--kc-border)] pt-4">
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="block rounded-full bg-[#244C3A] px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-[#35634A]"
                    >
                      Login ↗
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;



