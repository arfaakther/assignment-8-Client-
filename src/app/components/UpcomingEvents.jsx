
import Link from "next/link";

const UpcomingEvents = async () => {
  let events = [];
  let error = false;

  try {
    const res = await fetch("http://localhost:8000/upcoming-events", {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch upcoming events");
    }

    events = await res.json();
  } catch (err) {
    console.error("Upcoming Events Error:", err);
    error = true;
  }

  return (
    <section className="bg-[var(--kc-bg)] px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[2px] w-10 bg-[#D77D5B]"></span>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#4D8060]">
                Make a Difference Together
              </p>
            </div>

            <h2 className="text-4xl font-black tracking-tight text-[var(--kc-text)] sm:text-5xl">
              Things happening
              <span className="block italic text-[#4D8060]">
                around us.
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--kc-muted)] sm:text-base">
              Discover meaningful gatherings and find a way to make a
              difference in your community.
            </p>
          </div>

          <Link
            href="/events"
            className="group inline-flex w-fit items-center gap-3 border-b-2 border-[#4D8060] pb-2 text-sm font-bold text-[var(--kc-text)] transition hover:text-[#4D8060]"
          >
            Explore all events
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* Error Message */}
        {error ? (
          <div className="rounded-2xl border border-[var(--kc-border)] bg-[var(--kc-hover)] px-5 py-14 text-center">
            <p className="text-lg font-semibold text-[var(--kc-text)]">
              Unable to load upcoming events.
            </p>
            <p className="mt-2 text-sm text-[var(--kc-muted)]">
              Please try again later.
            </p>
          </div>
        ) : events.length > 0 ? (

          /* Event Collection */
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event, index) => (
              <article
                key={event._id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--kc-border)] bg-[var(--kc-bg)] transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Event Image */}
                <div className="relative h-60 overflow-hidden bg-[var(--kc-hover)]">
                  {event.image ? (
                    <img
                      src={event.image}
                      alt={event.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-6xl">
                      🌱
                    </div>
                  )}

                  {/* Event Number */}
                  <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#F8F7F0] text-sm font-black text-[#244C3A] shadow-md">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* Category */}
                  <span className="absolute bottom-4 left-4 rounded-full bg-[#244C3A] px-4 py-2 text-xs font-bold text-[#F8F7F0] shadow-md">
                    {event.eventType || "Community Event"}
                  </span>
                </div>

                {/* Event Details */}
                <div className="flex flex-1 flex-col p-6">

                  <h3 className="text-xl font-extrabold leading-snug text-[var(--kc-text)] transition-colors group-hover:text-[#4D8060]">
                    {event.title}
                  </h3>

                  <p className="mt-3 line-clamp-2 text-sm leading-7 text-[var(--kc-muted)]">
                    {event.description}
                  </p>

                  {/* Date and Location */}
                  <div className="mt-5 space-y-3 border-t border-[var(--kc-border)] pt-5">
                    <div className="flex items-center gap-3 text-sm">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--kc-hover)] text-[#4D8060]">
                        📅
                      </span>
                      <span className="font-medium text-[var(--kc-text)]">
                        {event.date}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--kc-hover)] text-[#D77D5B]">
                        📍
                      </span>
                      <span className="font-medium text-[var(--kc-text)]">
                        {event.location}
                      </span>
                    </div>
                  </div>

                  {/* Details Link */}
                  <Link
                    href={`/events/${event._id}`}
                    className="group/link mt-6 flex items-center justify-between border-t border-[var(--kc-border)] pt-5 text-sm font-bold text-[#4D8060] transition hover:text-[#D77D5B]"
                  >
                    Discover this event
                    <span className="text-lg transition-transform group-hover/link:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (

          /* Empty State */
          <div className="rounded-3xl bg-[var(--kc-hover)] px-5 py-16 text-center">
            <span className="text-5xl">🌱</span>
            <h3 className="mt-5 text-2xl font-extrabold text-[var(--kc-text)]">
              New beginnings are coming.
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[var(--kc-muted)]">
              No upcoming events yet. Check back soon for new community
              events and opportunities to get involved!
            </p>
          </div>
        )}

        {/* Bottom Invitation */}
        <div className="mt-12 flex flex-col items-start justify-between gap-5 rounded-2xl bg-[#244C3A] px-7 py-8 sm:flex-row sm:items-center sm:px-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D5E7A1]">
              Your next experience starts here
            </p>
            <h3 className="mt-2 text-xl font-extrabold text-white sm:text-2xl">
              Find something worth showing up for.
            </h3>
          </div>

          <Link
            href="/events"
            className="shrink-0 rounded-full bg-[#D5E7A1] px-6 py-3 text-sm font-bold text-[#244C3A] transition hover:bg-white"
          >
            Browse Events →
          </Link>
        </div>

      </div>
    </section>
  );
};

export default UpcomingEvents;



