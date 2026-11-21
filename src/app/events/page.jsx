import Link from "next/link";
import EventsClient from "@/app/components/EventsClient";
import { connection } from "next/server";



export const instant = false;
const EventsPage = async () => {
   await connection();

  let events = [];
  let error = false;

  try {
    const res = await fetch("https://kindred-circle-frontend.vercel.app/api/events", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch events");
    }

    events = await res.json();
  } catch (err) {
    console.error("Events Fetch Error:", err);
    error = true;
  }

  return (
    <main
      className="min-h-screen"
      style={{
        backgroundColor: "var(--kc-bg)",
        color: "var(--kc-text)",
      }}
    >
      {/* Editorial Hero */}
      <section className="px-5 sm:px-10 lg:px-16 pt-12 md:pt-20 pb-16">
        <div className="max-w-7xl mx-auto">

          <div className="grid lg:grid-cols-12 gap-10 items-center">

            {/* Hero Text */}
            <div className="lg:col-span-7">
              <p
                className="text-sm font-bold tracking-[0.25em] uppercase mb-6"
                style={{ color: "var(--kc-muted)" }}
              >
                KINDRED CIRCLE / COMMUNITY CALENDAR
              </p>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight">
                Good things
                <br />
                happen when
                <span
                  className="block italic font-serif mt-2"
                  style={{ color: "var(--kc-primary)" }}
                >
                  we gather.
                </span>
              </h1>

              <p
                className="mt-7 max-w-xl text-base md:text-lg leading-8"
                style={{ color: "var(--kc-muted)" }}
              >
                From neighborhood cleanups to meaningful community
                gatherings, find your next opportunity to make a
                difference.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-9">
                <Link
                  href="/create-event"
                  className="inline-flex items-center gap-3 px-7 py-4 rounded-full font-semibold transition hover:opacity-90"
                  style={{
                    backgroundColor: "var(--kc-primary)",
                    color: "#FFFFFF",
                  }}
                >
                  Create an event
                  <span>↗</span>
                </Link>

                <a
                  href="#all-events"
                  className="font-semibold underline underline-offset-4"
                  style={{ color: "var(--kc-text)" }}
                >
                  Explore events ↓
                </a>
              </div>
            </div>

            {/* Hero Visual */}
            
<div className="lg:col-span-5 relative">
  <div
    className="relative overflow-hidden rounded-[2rem] min-h-[340px] md:min-h-[430px]"
    style={{ backgroundColor: "var(--kc-hover)" }}
  >
    {/* Background Image */}
    <img
      src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=1200"
      alt="People volunteering together in a community"
      className="absolute inset-0 w-full h-full object-cover"
    />

    {/* Dark Gradient */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#17251D]/80 via-[#17251D]/10 to-transparent" />

    {/* Text */}
    <div className="absolute bottom-0 left-0 right-0 p-7 md:p-9 text-white">
      <p className="text-sm uppercase tracking-widest mb-3 text-white/75">
        A place for everyone
      </p>

      <h2 className="text-3xl md:text-4xl font-bold max-w-sm">
        Every little act creates a ripple.
      </h2>
    </div>

    {/* Heart Icon */}
    <div
      className="absolute top-6 right-6 w-20 h-20 rounded-full flex items-center justify-center text-3xl"
      style={{
        backgroundColor: "var(--kc-accent)",
        color: "#244C3A",
      }}
    >
      ♡
    </div>
  </div>
</div>


          </div>
        </div>
      </section>

      {/* Decorative Divider */}
      <div
        className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-16"
      >
        <div
          className="border-t"
          style={{ borderColor: "var(--kc-border)" }}
        />
      </div>

      {/* Events Section */}
      <section
        id="all-events"
        className="px-5 sm:px-10 lg:px-16 py-16 md:py-20"
      >
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">

            <div>
              <p
                className="text-sm font-bold tracking-[0.25em] uppercase mb-4"
                style={{ color: "var(--kc-muted)" }}
              >
                FIND YOUR NEXT CHAPTER
              </p>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Explore the calendar<span style={{ color: "var(--kc-primary)" }}>.</span>
              </h2>

              <p
                className="mt-3"
                style={{ color: "var(--kc-muted)" }}
              >
                Discover people, places and causes worth showing up for.
              </p>
            </div>

            <div
              className="flex items-center gap-3 px-5 py-3 rounded-full w-fit"
              style={{
                backgroundColor: "var(--kc-hover)",
                border: "1px solid var(--kc-border)",
              }}
            >
              <span className="text-xl">✳</span>
              <span className="font-semibold">
                {events.length.toLocaleString()} events found
              </span>
            </div>

          </div>

          {error ? (
            <div
              className="rounded-3xl border text-center py-20 px-5"
              style={{
                backgroundColor: "var(--kc-hover)",
                borderColor: "var(--kc-border)",
              }}
            >
              <div className="text-4xl mb-4">🌱</div>

              <h3 className="text-2xl font-bold mb-3">
                Something went wrong
              </h3>

              <p style={{ color: "var(--kc-muted)" }}>
                Unable to load events. Please try again later.
              </p>
            </div>
          ) : (
            <EventsClient events={events} />
          )}

        </div>
      </section>

      {/* Bottom Invitation */}
      <section className="px-5 sm:px-10 lg:px-16 pb-20">
        <div
          className="max-w-7xl mx-auto rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8"
          style={{
            backgroundColor: "var(--kc-panel)",
            color: "var(--kc-panel-text)",
          }}
        >
          <div>
            <p className="text-sm tracking-[0.2em] uppercase font-bold opacity-70 mb-3">
              HAVE AN IDEA?
            </p>

            <h2 className="text-3xl md:text-4xl font-bold">
              Bring your community together.
            </h2>

            <p className="mt-3 opacity-75 max-w-xl leading-7">
              Create an event, invite others and turn a good idea into
              something meaningful.
            </p>
          </div>

          <Link
            href="/create-event"
            className="shrink-0 px-7 py-4 rounded-full font-bold transition hover:scale-105"
            style={{
              backgroundColor: "var(--kc-accent)",
              color: "#244C3A",
            }}
          >
            Start an event ↗
          </Link>
        </div>
      </section>

    </main>
  );
};

export default EventsPage;



