


import Link from "next/link";
import EventsClient from "@/app/components/EventsClient";

const EventsPage = async () => {
  let events = [];
  let error = false;

  try {
    const res = await fetch("http://localhost:3000/api/events");

    if (!res.ok) {
      throw new Error("Failed to fetch events");
    }

    events = await res.json();
  } catch (err) {
    console.error("Events Fetch Error:", err);
    error = true;
  }

  return (
    <main className="min-h-screen bg-[var(--kc-bg)] text-[var(--kc-text)]">

      {/* Hero Section */}
      <section className="px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <span className="rounded-full bg-[#4D8C83]/10 px-4 py-2 text-sm font-bold text-[#4D8C83]">
              ♡ Make a Difference
            </span>

            <h1 className="mt-5 text-4xl font-extrabold text-[var(--kc-primary)] sm:text-5xl">
              Find an Event.
              <span className="block text-[#4D8C83]">
                Find Your Purpose.
              </span>
            </h1>

            <p className="mt-5 max-w-xl leading-8 text-[var(--kc-muted)]">
              Explore local initiatives, meet compassionate people,
              and be part of something meaningful.
            </p>
          </div>

          <Link
            href="/create-event"
            className="inline-flex rounded-xl bg-[#0D9488] px-7 py-4 font-bold text-white transition hover:bg-[#4D8C83]"
          >
            + Create an Event
          </Link>
        </div>
      </section>

      {/* Events */}
      <section className="px-6 pb-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">

          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-widest text-[#4D8C83]">
              Explore & Participate
            </p>

            <h2 className="mt-2 text-3xl font-extrabold text-[var(--kc-primary)]">
              Discover Upcoming Events
            </h2>

            <p className="mt-2 text-sm text-[var(--kc-muted)]">
              {events.length} events found
            </p>
          </div>

          {error ? (
            <p className="py-16 text-center text-[var(--kc-muted)]">
              Unable to load events. Please try again later.
            </p>
          ) : (
            <EventsClient events={events} />
          )}

        </div>
      </section>
    </main>
  );
};

export default EventsPage;


