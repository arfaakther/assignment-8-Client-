
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-[var(--kc-border)] bg-[var(--kc-bg)] text-[var(--kc-text)]">
      <div className="mx-auto max-w-7xl px-6 pt-14 pb-8 sm:px-8">

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#35213B] text-2xl text-[#F3B63F]">
                ✳
              </span>

              <span className="text-2xl font-extrabold tracking-tight text-[var(--kc-primary)]">
                Kindred <span className="text-[#4D8C83]">Circle</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-[var(--kc-muted)]">
              Bringing people together through meaningful experiences,
              shared moments, and community events.
            </p>

            <p className="mt-4 text-sm font-semibold italic text-[#4D8C83]">
              Good things grow when we grow together.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-base font-bold text-[var(--kc-primary)]">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm text-[var(--kc-muted)]">
              <li>
                <Link href="/" className="transition hover:text-[#4D8C83]">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/events" className="transition hover:text-[#4D8C83]">
                  Explore Events
                </Link>
              </li>
              <li>
                <Link href="/create-event" className="transition hover:text-[#4D8C83]">
                  Create Event
                </Link>
              </li>
              <li>
                <Link href="/joined-events" className="transition hover:text-[#4D8C83]">
                  Joined Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="mb-5 text-base font-bold text-[var(--kc-primary)]">
              Your Account
            </h3>

            <ul className="space-y-3 text-sm text-[var(--kc-muted)]">
              <li>
                <Link href="/login" className="transition hover:text-[#4D8C83]">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/signup" className="transition hover:text-[#4D8C83]">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link href="/profile" className="transition hover:text-[#4D8C83]">
                  My Profile
                </Link>
              </li>
              <li>
                <Link href="/manage-events" className="transition hover:text-[#4D8C83]">
                  Manage Events
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-[var(--kc-border)]" />

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-[var(--kc-muted)]">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-[var(--kc-primary)]">
              Kindred Circle
            </span>
            . All rights reserved.
          </p>

          <p className="text-sm text-[var(--kc-muted)]">
            Made with <span>💚</span> for community.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

