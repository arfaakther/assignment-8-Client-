

import Link from "next/link";

const Footer = () => {
  return (
    <footer
      className="border-t border-[var(--kc-border)] bg-[var(--kc-bg)] text-[var(--kc-text)]"
    >
      <div className="mx-auto max-w-7xl px-6 pb-7 pt-16 sm:px-8">

        {/* Main footer */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_0.7fr_0.7fr] lg:gap-20">

          {/* Brand */}
          <div>
            <Link href="/" className="group inline-flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--kc-primary)] text-2xl text-[#D5E7A1] transition-transform duration-300 group-hover:rotate-45">
                ✳
              </span>

              <span className="text-2xl font-extrabold tracking-tight">
                Kindred
                <span className="text-[#4D8060]"> Circle</span>
              </span>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-8 text-[var(--kc-muted)]">
              Bringing people together through meaningful experiences,
              shared moments, and community events.
            </p>

            <p className="mt-5 text-sm font-semibold italic text-[var(--kc-primary)]">
              Good things grow when we grow together.
            </p>

            <div className="mt-8 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#D77D5B]" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--kc-muted)]">
                Made for community
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-[var(--kc-primary)]">
              Explore
            </h3>

            <ul className="space-y-4 text-sm text-[var(--kc-muted)]">
              <li>
                <Link href="/" className="transition hover:pl-1 hover:text-[var(--kc-primary)]">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/events" className="transition hover:pl-1 hover:text-[var(--kc-primary)]">
                  Explore Events
                </Link>
              </li>
              <li>
                <Link href="/create-event" className="transition hover:pl-1 hover:text-[var(--kc-primary)]">
                  Create Event
                </Link>
              </li>
              <li>
                <Link href="/joined-events" className="transition hover:pl-1 hover:text-[var(--kc-primary)]">
                  Joined Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-[var(--kc-primary)]">
              Your Account
            </h3>

            <ul className="space-y-4 text-sm text-[var(--kc-muted)]">
              <li>
                <Link href="/login" className="transition hover:pl-1 hover:text-[var(--kc-primary)]">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/signup" className="transition hover:pl-1 hover:text-[var(--kc-primary)]">
                  Sign Up
                </Link>
              </li>
             <li>
                <Link href="/manage-events" className="transition hover:pl-1 hover:text-[var(--kc-primary)]">
                  Manage Events
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Decorative divider */}
        <div className="my-12 h-px bg-[var(--kc-border)]" />

        {/* Bottom section */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-center text-xs text-[var(--kc-muted)] sm:text-left">
            © {new Date().getFullYear()}{" "}
            <span className="font-bold text-[var(--kc-primary)]">
              Kindred Circle
            </span>
            . All rights reserved.
          </p>

          <p className="text-xs font-medium text-[var(--kc-muted)]">
            Made with <span className="text-[#D77D5B]">♥</span> for community.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


