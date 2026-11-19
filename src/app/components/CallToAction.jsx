
import Link from "next/link";

const CallToAction = () => {
  return (
    <section
      className="px-5 py-20 sm:px-8"
      style={{ background: "var(--kc-bg)", color: "var(--kc-text)" }}
    >
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#35213B] px-6 py-16 text-center text-white shadow-xl sm:px-12 sm:py-20">

        {/* Decorative circles */}
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#4D8C83]/30" />
        <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-[#F3B63F]/15" />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-3xl">

          <span className="inline-block rounded-full border border-[#F3B63F]/50 bg-[#F3B63F]/10 px-5 py-2 text-sm font-semibold tracking-wide text-[#F3B63F]">
            💛 GOOD THINGS GROW TOGETHER
          </span>

          <h2 className="mt-7 text-3xl font-extrabold leading-tight sm:text-5xl">
            Small Actions.
            <span className="block text-[#F3B63F]">
              Big Community Impact.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-white/75 sm:text-lg">
            Every helping hand makes a difference. Join our community,
            discover meaningful events, and become part of something
            wonderful.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">

            <Link
              href="/events"
              className="rounded-xl bg-[#F3B63F] px-8 py-4 font-bold text-[#35213B] shadow-md transition duration-300 hover:-translate-y-1 hover:bg-[#FFD16B]"
            >
              Explore Events →
            </Link>

            <Link
              href="/create-event"
              className="rounded-xl border border-white/40 px-8 py-4 font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#35213B]"
            >
              + Create an Event
            </Link>

          </div>

          <p className="mt-8 text-sm text-white/60">
            Together, we can make our communities stronger. 🫶
          </p>

        </div>
      </div>
    </section>
  );
};

export default CallToAction;
