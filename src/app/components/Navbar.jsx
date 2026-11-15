
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
    { id: 2, name: "▦ Upcoming Events", path: "/events" },
  ];

  const getLinkStyle = (path) =>
    pathname === path
      ? "text-[#4D8C83] font-bold"
      : "text-[var(--kc-text)] hover:text-[#4D8C83]";

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
      className="flex items-center justify-center w-10 h-10 rounded-full border border-[var(--kc-border)] hover:bg-[var(--kc-hover)] transition"
      aria-label="Change theme"
      title="Change theme"
    >
      {theme === "light" ? "🌙" : "☀"}
    </button>
  );

  return (
    <header className="sticky top-0 z-50 bg-[var(--kc-bg)] border-b border-[var(--kc-border)]">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#35213B] flex items-center justify-center text-[#F3B63F] text-2xl">
              ✳
            </div>

            <div>
              <h1 className="text-xl font-bold text-[var(--kc-primary)]">
                Kindred <span className="text-[#4D8C83]">Circle</span>
              </h1>
              <p className="text-xs text-[var(--kc-muted)]">
                Good things grow together.
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.path}
                className={`text-sm transition ${getLinkStyle(item.path)}`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeButton />

            {!isPending && (
              <>
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setProfileOpen(!profileOpen)}
                      className="flex items-center gap-2 rounded-full border border-[var(--kc-border)] p-1 pr-4 hover:bg-[var(--kc-hover)] transition"
                    >
                      {user.image && !imageError ? (
                        <img
                          src={user.image}
                          alt="Profile"
                          onError={() => setImageError(true)}
                          className="w-9 h-9 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-[#35213B] text-white flex items-center justify-center font-semibold">
                          {user.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                      )}

                      <span className="text-sm font-medium text-[var(--kc-text)]">
                        {user.name || "My Account"}
                      </span>

                      <span className="text-xs text-[var(--kc-muted)]">
                        ▼
                      </span>
                    </button>

                    {/* Profile Dropdown */}
                    {profileOpen && (
                      <div className="absolute right-0 top-14 w-56 rounded-xl border border-[var(--kc-border)] bg-[var(--kc-bg)] shadow-lg p-2">

                        <Link
                          href="/create-event"
                          onClick={() => setProfileOpen(false)}
                          className="block px-4 py-3 rounded-lg text-sm text-[var(--kc-text)] hover:bg-[var(--kc-hover)] transition"
                        >
                          + Create Event
                        </Link>

                        <Link
                          href="/manage-events"
                          onClick={() => setProfileOpen(false)}
                          className="block px-4 py-3 rounded-lg text-sm text-[var(--kc-text)] hover:bg-[var(--kc-hover)] transition"
                        >
                          ✎ Update / Manage Events
                        </Link>

                        <Link
                          href="/joined-events"
                          onClick={() => setProfileOpen(false)}
                          className="block px-4 py-3 rounded-lg text-sm text-[var(--kc-text)] hover:bg-[var(--kc-hover)] transition"
                        >
                          ♡ Joined Events
                        </Link>

                        <Link
                          href="/profile"
                          onClick={() => setProfileOpen(false)}
                          className="block px-4 py-3 rounded-lg text-sm text-[var(--kc-text)] hover:bg-[var(--kc-hover)] transition"
                        >
                          ☻ My Profile
                        </Link>

                        <div className="my-2 border-t border-[var(--kc-border)]" />

                        <button
                          onClick={handleLogout}
                          disabled={loading}
                          className="w-full text-left px-4 py-3 rounded-lg text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition disabled:opacity-50"
                        >
                          {loading ? "Logging out..." : "↩ Logout"}
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Link
                      href="/login"
                      className="px-5 py-2.5 rounded-full bg-[#35213B] text-white text-sm font-semibold hover:bg-[#4D8C83] transition"
                    >
                       ⇥ Login
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeButton />

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-2xl text-[var(--kc-primary)]"
              aria-label="Toggle menu"
            >
              {isOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-5 border-t border-[var(--kc-border)]">

            {/* Main Navigation */}
            <div className="flex flex-col gap-2 pt-4">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm transition hover:bg-[var(--kc-hover)] ${getLinkStyle(item.path)}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {!isPending && (
              <>
                {user ? (
                  <div className="mt-4 pt-4 border-t border-[var(--kc-border)]">

                    {/* Mobile User Info */}
                    <div className="flex items-center gap-3 px-4 mb-3">
                      {user.image && !imageError ? (
                        <img
                          src={user.image}
                          alt="Profile"
                          onError={() => setImageError(true)}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#35213B] text-white flex items-center justify-center font-semibold">
                          {user.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                      )}

                      <div>
                        <p className="font-semibold text-sm text-[var(--kc-text)]">
                          {user.name || "My Account"}
                        </p>
                        <p className="text-xs text-[var(--kc-muted)]">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    {/* Mobile Profile Links */}
                    <div className="flex flex-col gap-1">

                      <Link
                        href="/create-event"
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-3 rounded-lg text-sm text-[var(--kc-text)] hover:bg-[var(--kc-hover)]"
                      >
                        + Create Event
                      </Link>

                      <Link
                        href="/manage-events"
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-3 rounded-lg text-sm text-[var(--kc-text)] hover:bg-[var(--kc-hover)]"
                      >
                        ✎ Update / Manage Events
                      </Link>

                      <Link
                        href="/joined-events"
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-3 rounded-lg text-sm text-[var(--kc-text)] hover:bg-[var(--kc-hover)]"
                      >
                        ♡ Joined Events
                      </Link>

                      <Link
                        href="/profile"
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-3 rounded-lg text-sm text-[var(--kc-text)] hover:bg-[var(--kc-hover)]"
                      >
                        ☻ My Profile
                      </Link>

                      <button
                        onClick={handleLogout}
                        disabled={loading}
                        className="text-left px-4 py-3 rounded-lg text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950 disabled:opacity-50"
                      >
                        {loading ? "Logging out..." : "↩ Logout"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-[var(--kc-border)] px-4">
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="text-sm font-semibold text-[var(--kc-text)]"
                    >
                      Login
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


