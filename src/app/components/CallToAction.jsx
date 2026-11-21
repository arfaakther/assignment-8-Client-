
import Link from "next/link";

const CallToAction = () => {
  return (
    <section
      className="relative overflow-hidden px-5 py-20 sm:px-8 sm:py-28"
      style={{
        background: "var(--kc-primary)",
        color: "var(--kc-bg)",
      }}
    >
      {/* Decorative elements */}
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full border border-white/10 sm:h-96 sm:w-96" />
      <div className="pointer-events-none absolute -right-12 top-24 h-56 w-56 rounded-full border border-white/10 sm:h-80 sm:w-80" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-20">

        {/* Main content */}
        <div>
          <p className="mb-7 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#D5E7A1]">
            <span className="h-px w-10 bg-[#bede5f]" />
            Good things grow together
          </p>

          <h2 className="max-w-4xl text-4xl font-extrabold leading-[1.12] tracking-tight sm:text-6xl lg:text-7xl">
            Small Actions.
            <span className="mt-2 block text-[#bede5f]">
              Big Community Impact.
            </span>
          </h2>

          <p className="mt-7 max-w-xl text-base leading-8 text-white/75 sm:text-lg">
            Every helping hand makes a difference. Join our community,
            discover meaningful events, and become part of something
            wonderful.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/events"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-[#D5E7A1] px-8 py-4 font-bold text-[#244C3A] transition duration-300 hover:-translate-y-1 hover:bg-white"
            >
              Explore Events
              <span aria-hidden="true">→</span>
            </Link>

            <Link
              href="/create-event"
              className="inline-flex items-center justify-center rounded-full border border-white/40 px-8 py-4 font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#244C3A]"
            >
              + Create an Event
            </Link>
          </div>
        </div>

        {/* Editorial side panel */}
        <div className="relative lg:pl-8">
          <div className="border-l border-white/25 py-5 pl-7 sm:pl-10">
            <span className="text-6xl font-black tracking-tight text-[#bede5f] sm:text-8xl">
              01
            </span>

            <p className="mt-5 max-w-xs text-2xl font-semibold leading-snug sm:text-3xl">
              Together, we can make our communities stronger.
            </p>

            <div className="mt-7 flex items-center gap-3 text-sm text-white/65">
              <span className="text-2xl">🫶</span>
              <span>One community. Countless possibilities.</span>
            </div>
          </div>

          
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
