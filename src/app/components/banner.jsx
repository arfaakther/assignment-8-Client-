
import Link from "next/link";

const Banner = () => {
  return (
    <section className="overflow-hidden bg-[var(--kc-bg)]">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 sm:px-8 md:grid-cols-2 md:py-24">

        {/* Left Content */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#F7E8E4] px-4 py-2 text-sm font-semibold text-[#35213B]">
            <span className="h-2 w-2 rounded-full bg-[#4D8C83]"></span>
            Connect. Celebrate. Belong.
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-[var(--kc-primary)] sm:text-5xl lg:text-6xl">
            Find Your People.
            <span className="mt-2 block text-[#4D8C83]">
              Create Meaningful Moments.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-8 text-[var(--kc-muted)] sm:text-lg">
            Discover exciting local events, meet like-minded people, and
            create unforgettable memories. Every gathering is a chance
            to connect and grow together.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/events"
              className="rounded-full bg-black px-7 py-3.5 font-bold text-white shadow-sm transition hover:-translate-y-1 hover:bg-[#4D8C83]"
            >
              Explore Events →
            </Link>

            <Link
              href="/create-event"
              className="rounded-full border border-[var(--kc-border)] px-7 py-3.5 font-bold text-[var(--kc-primary)] transition hover:-translate-y-1 hover:bg-[#4D8C83]"
            ><span>🤝</span>
              + Create Event
            </Link>
          </div>

          {/* Small Highlight */}
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <div>
              <p className="text-2xl font-extrabold text-[var(--kc-primary)]">
                Together
              </p>
              <p className="mt-1 text-sm text-[var(--kc-muted)]">
                We grow stronger
              </p>
            </div>

            <div className="h-10 w-px bg-[var(--kc-border)]"></div>

            <div>
              <p className="text-2xl font-extrabold text-[var(--kc-primary)]">
                Community
              </p>
              <p className="mt-1 text-sm text-[var(--kc-muted)]">
                Starts with you
              </p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative mx-auto w-full max-w-xl">

          {/* Background Decoration */}
          <div className="absolute -right-5 -top-5 h-32 w-32 rounded-full bg-[#F3B63F]/30 blur-2xl"></div>
          <div className="absolute -bottom-5 -left-5 h-40 w-40 rounded-full bg-[#4D8C83]/20 blur-2xl"></div>

          {/* Main Image */}
          <div className="relative overflow-hidden rounded-[2rem] border-8 border-[var(--kc-hover)] shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1000"
              alt="Friends enjoying a community gathering"
              className="h-[350px] w-full object-cover sm:h-[450px]"
            />
          </div>
</div>
      </div>
{/* Statistics Cards */}
<div className="mx-auto max-w-7xl mb-16 grid grid-cols-2 gap-8 lg:grid-cols-4">

  {/* Active Volunteers */}
  <div className="rounded-2xl border border-[var(--kc-border)] bg-[var(--kc-bg)] p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-6">
    <p className="text-3xl font-extrabold text-[#4D8C83] sm:text-4xl">
      1,450+
    </p>
    <p className="mt-2 text-sm font-semibold text-[var(--kc-primary)] sm:text-base">
      Active Volunteers
    </p>
  </div>

  {/* Events Completed */}
  <div className="rounded-2xl border border-[var(--kc-border)] bg-[var(--kc-bg)] p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-6">
    <p className="text-3xl font-extrabold text-[#F3B63F] sm:text-4xl">
      180+
    </p>
    <p className="mt-2 text-sm font-semibold text-[var(--kc-primary)] sm:text-base">
      Events Completed
    </p>
  </div>

  {/* Lives Impacted */}
  <div className="rounded-2xl border border-[var(--kc-border)] bg-[var(--kc-bg)] p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-6">
    <p className="text-3xl font-extrabold text-[#4D8C83] sm:text-4xl">
      24,000+
    </p>
    <p className="mt-2 text-sm font-semibold text-[var(--kc-primary)] sm:text-base">
      Lives Impacted
    </p>
  </div>

  {/* Community Driven */}
  <div className="rounded-2xl border border-[var(--kc-border)] bg-[var(--kc-bg)] p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-6">
    <p className="text-3xl font-extrabold text-[#F3B63F] sm:text-4xl">
      100%
    </p>
    <p className="mt-2 text-sm font-semibold text-[var(--kc-primary)] sm:text-base">
      Community Driven
    </p>
  </div>

</div>
    </section>
  );
};

export default Banner;
