
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
    <section
      className="px-5 py-16 sm:px-8 lg:px-12"
      style={{ background: "var(--kc-bg)", color: "var(--kc-text)" }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-10 text-center">
          <p className="mb-3 font-semibold uppercase tracking-widest text-[#4D8C83]">
            Make a Difference Together
          </p>

          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Upcoming Events
          </h2>

          <p
            className="mx-auto mt-3 max-w-xl"
            style={{ color: "var(--kc-muted)" }}
          >
            Discover meaningful gatherings and find a way to make a
            difference in your community.
          </p>
        </div>

        {/* Error message */}
        {error ? (
          <div className="py-12 text-center">
            <p>Unable to load upcoming events. Please try again later.</p>
          </div>
        ) : events.length > 0 ? (
          /* Event cards */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div
                key={event._id}
                className="overflow-hidden rounded-2xl border shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                style={{
                  background: "var(--kc-bg)",
                  borderColor: "var(--kc-border)",
                }}
              >
                {/* Event image */}
                <div className="h-52 overflow-hidden bg-[#F7E8E4]">
                  {event.image ? (
                    <img
                      src={event.image}
                      alt={event.title}
                      className="h-full w-full object-cover transition duration-300 hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-5xl">
                      🌱
                    </div>
                  )}
                </div>

                {/* Event information */}
                <div className="p-5">
                  <span className="rounded-full bg-[#F7E8E4] px-3 py-1 text-xs font-bold text-[#35213B]">
                    {event.eventType || "Community Event"}
                  </span>

                  <h3 className="mt-4 text-xl font-bold">
                    {event.title}
                  </h3>

                  <div
                    className="mt-3 space-y-2 text-sm"
                    style={{ color: "var(--kc-muted)" }}
                  >
                    <p>📅 {event.date}</p>
                    <p>📍 {event.location}</p>
                  </div>

                  <p
                    className="mt-4 line-clamp-2 text-sm"
                    style={{ color: "var(--kc-muted)" }}
                  >
                    {event.description}
                  </p>

                  <Link
                    href={`/events/${event._id}`}
                    className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-[#35213B] px-5 py-3 font-semibold text-white transition hover:bg-[#4D8C83]"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* No upcoming events */
          <div className="py-12 text-center">
            <p className="text-4xl">🌱</p>
            <h3 className="mt-4 text-xl font-bold">
              No upcoming events yet
            </h3>
            <p className="mt-2" style={{ color: "var(--kc-muted)" }}>
              Check back soon for new community events!
            </p>
          </div>
        )}

        {/* View all events */}
        <div className="mt-10 text-center">
          <Link
            href="/events"
            className="inline-block rounded-xl border-2 border-[#35213B] px-7 py-3 font-bold transition hover:bg-[#35213B] hover:text-white"
            style={{ color: "var(--kc-text)" }}
          >
            Explore All Events →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;


