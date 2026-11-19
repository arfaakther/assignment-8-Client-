
import Link from "next/link";
import { getTokenFromServer } from "@/app/lib/getTokenFromServer";


const EventsPage = async () => {
  const token = await getTokenFromServer();

  const res = await fetch("http://localhost:8000/events", {
    headers: {
      authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (res.status === 401 || res.status === 403) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--kc-bg)] px-6">
        <h2 className="text-2xl font-bold text-[var(--kc-primary)]">
          Login Required
        </h2>
        <p className="mt-3 text-[var(--kc-muted)]">
          Please log in to explore upcoming events.
        </p>
        <Link
          href="/login"
          className="mt-6 rounded-xl bg-[#0D9488] px-6 py-3 font-bold text-white"
        >
          Login Now
        </Link>
      </div>
    );
  }

  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  const events = await res.json();

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

          {events.length > 0 ? (
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 xl:grid-cols-3">
              {events.map((event) => (
                <article
                  key={event._id}
                  className="overflow-hidden rounded-2xl border border-[var(--kc-border)] bg-[var(--kc-bg)] shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-56">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="h-full w-full object-cover"
                    />

                    <span className="absolute left-4 top-4 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#0D9488]">
                      {event.eventType}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[var(--kc-primary)]">
                      {event.title}
                    </h3>

                    <p className="mt-3 text-sm text-[var(--kc-muted)]">
                      📅 {event.date}
                    </p>

                    <p className="mt-2 text-sm text-[var(--kc-muted)]">
                      📍 {event.location}
                    </p>

                    <p className="mt-4 min-h-[72px] text-sm leading-7 text-[var(--kc-muted)]">
                      {event.description}
                    </p>

                    <div className="mt-5 border-t border-[var(--kc-border)] pt-4">
                      <p className="text-sm text-[var(--kc-muted)]">
                        Organizer: {event.organizerEmail}
                      </p>
                    </div>

                    <Link
                      href={`/events/${event._id}`}
                      className="mt-5 flex w-full justify-center rounded-xl bg-[#0D9488] px-5 py-3.5 font-bold text-white transition hover:bg-[#4D8C83]"
                    >
                      View Event →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="py-16 text-center text-[var(--kc-muted)]">
              No events available right now.
            </p>
          )}
        </div>
      </section>
    </main>
  );
};

export default EventsPage;


