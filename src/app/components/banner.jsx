
import Link from "next/link";

const Banner = () => {
  return (
    <section className="overflow-hidden bg-[var(--kc-bg)]">

      {/* Hero Section */}
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 sm:px-8 md:grid-cols-2 md:gap-16 md:py-24">

        {/* Left Content */}
        <div className="relative z-10">
          <div className="mb-7 flex items-center gap-3">
            <span className="h-[2px] w-10 bg-[#D77D5B]"></span>
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#4D8060]">
              A community that cares
            </span>
          </div>

          <h1 className="max-w-2xl text-5xl font-black leading-[1.08] tracking-tight text-[var(--kc-text)] sm:text-6xl lg:text-7xl">
            Find your
            <span className="block text-[#4D8060]">people.</span>
            Make a
            <span className="block italic text-[#D77D5B]">
              difference.
            </span>
          </h1>

          <p className="mt-7 max-w-lg text-base leading-8 text-[var(--kc-muted)] sm:text-lg">
            Discover exciting local events, meet like-minded people, and
            create unforgettable memories. Every gathering is a chance
            to connect and grow together.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/events"
              className="group inline-flex items-center gap-3 rounded-full bg-[#244C3A] px-7 py-4 text-sm font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#35634A]"
            >
              Explore Events
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>

            <Link
              href="/create-event"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--kc-border)] px-7 py-4 text-sm font-bold text-[var(--kc-text)] transition duration-300 hover:-translate-y-1 hover:border-[#A8BDA3] hover:bg-[var(--kc-hover)]"
            >
              <span className="text-lg text-[#D77D5B]">＋</span>
              Create Event
            </Link>
          </div>

          {/* Small Highlight */}
          <div className="mt-12 flex flex-wrap items-center gap-8 border-t border-[var(--kc-border)] pt-7">
            <div>
              <p className="text-xl font-extrabold text-[var(--kc-text)]">
                Together
              </p>
              <p className="mt-1 text-xs tracking-wide text-[var(--kc-muted)]">
                We grow stronger
              </p>
            </div>

            <div className="h-10 w-px bg-[var(--kc-border)]"></div>

            <div>
              <p className="text-xl font-extrabold text-[var(--kc-text)]">
                Community
              </p>
              <p className="mt-1 text-xs tracking-wide text-[var(--kc-muted)]">
                Starts with you
              </p>
            </div>
          </div>
        </div>

        {/* Right Visual */}
        <div className="relative mx-auto w-full max-w-xl">

          {/* Decorative Background */}
          <div className="absolute -right-4 -top-5 h-36 w-36 rounded-full bg-[#D5E7A1] opacity-70"></div>
          <div className="absolute -bottom-7 -left-5 h-40 w-40 rounded-full bg-[#D77D5B] opacity-20"></div>

          {/* Main Image */}
          <div className="relative z-10 overflow-hidden rounded-t-[10rem] rounded-b-3xl border-[6px] border-[var(--kc-bg)] shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1000"
              alt="Friends enjoying a community gathering"
              className="h-[380px] w-full object-cover sm:h-[480px]"
            />
          </div>

          {/* Floating Label */}
          <div className="absolute -bottom-5 -left-3 z-20 max-w-[230px] rounded-2xl bg-[#244C3A] p-5 shadow-xl sm:-left-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D5E7A1]">
              Better together
            </p>
            <p className="mt-2 text-lg font-bold leading-snug text-white">
              Small moments. Lasting impact.
            </p>
          </div>

          {/* Decorative Circle */}
          <div className="absolute -right-5 top-1/3 z-20 flex h-16 w-16 items-center justify-center rounded-full border-4 border-[var(--kc-bg)] bg-[#D5E7A1] text-2xl text-[#244C3A] shadow-lg sm:-right-7">
            ✳
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-[#244C3A]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-white/15 px-5 py-8 sm:px-8 lg:grid-cols-4 lg:divide-y-0">

          {/* Active Volunteers */}
          <div className="px-4 py-5 text-center sm:px-6">
            <p className="text-3xl font-black tracking-tight text-[#D5E7A1] sm:text-4xl">
              1,450+
            </p>
            <p className="mt-2 text-xs font-medium uppercase tracking-wider text-white/75 sm:text-sm">
              Active Volunteers
            </p>
          </div>

          {/* Events Completed */}
          <div className="px-4 py-5 text-center sm:px-6">
            <p className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              180+
            </p>
            <p className="mt-2 text-xs font-medium uppercase tracking-wider text-white/75 sm:text-sm">
              Events Completed
            </p>
          </div>

          {/* Lives Impacted */}
          <div className="px-4 py-5 text-center sm:px-6">
            <p className="text-3xl font-black tracking-tight text-[#D5E7A1] sm:text-4xl">
              24,000+
            </p>
            <p className="mt-2 text-xs font-medium uppercase tracking-wider text-white/75 sm:text-sm">
              Lives Impacted
            </p>
          </div>

          {/* Community Driven */}
          <div className="px-4 py-5 text-center sm:px-6">
            <p className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              100%
            </p>
            <p className="mt-2 text-xs font-medium uppercase tracking-wider text-white/75 sm:text-sm">
              Community Driven
            </p>
          </div>

        </div>
      </div>

    </section>
  );
};

export default Banner;

