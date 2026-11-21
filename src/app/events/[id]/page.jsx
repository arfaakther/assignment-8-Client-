
import Link from "next/link";
import { getTokenFromServer } from "@/app/lib/getTokenFromServer";
import JoinEventButton from "./JoinEventButton";

const EventDetailsPage = async ({ params }) => {
  const { id } = await params;
  const token = await getTokenFromServer();

  // Login check
  if (!token) {
    return (
      <main className="min-h-screen flex items-center justify-center px-5">
        <div
          className="max-w-md w-full text-center p-10 rounded-3xl border"
          style={{
            backgroundColor: "var(--kc-hover)",
            borderColor: "var(--kc-border)",
          }}
        >
          <h2 className="text-3xl font-bold mb-3">
            Login Required
          </h2>
          <p className="mb-6" style={{ color: "var(--kc-muted)" }}>
            Please login to view event details.
          </p>
          <Link
            href="/login"
            className="inline-block px-7 py-3 rounded-full text-white font-semibold"
            style={{ backgroundColor: "var(--kc-primary)" }}
          >
            Login Now
          </Link>
        </div>
      </main>
    );
  }

  // Fetch event details
  let event;

  try {
    const res = await fetch(
      `http://localhost:8000/events/${id}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (res.status === 401 || res.status === 403) {
      return (
        <main className="min-h-screen flex items-center justify-center">
          <p>Unauthorized. Please login again.</p>
        </main>
      );
    }

    if (!res.ok) {
      return (
        <main className="min-h-screen flex items-center justify-center">
          <p>Failed to load event.</p>
        </main>
      );
    }

    event = await res.json();
  } catch (error) {
    console.error("Event fetching error:", error);

    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Something went wrong while loading the event.</p>
      </main>
    );
  }

  if (!event) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Event not found.</p>
      </main>
    );
  }

  // Fetch confirmed volunteers
  let volunteerData = {
    count: 0,
    volunteers: [],
  };

  try {
    const volunteersRes = await fetch(
      `http://localhost:8000/events/${id}/volunteers`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (volunteersRes.ok) {
      volunteerData = await volunteersRes.json();
    } else {
      console.error(
        "Volunteer API error:",
        volunteersRes.status,
        await volunteersRes.text()
      );
    }
  } catch (error) {
    console.error("Volunteer fetching error:", error);
  }

  const volunteers = volunteerData.volunteers || [];

  const formattedDate = event.date
    ? new Date(`${event.date}T12:00:00`).toLocaleDateString(
        "en-US",
        {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      )
    : "Date not specified";

  return (
    <main
      className="min-h-screen py-10 md:py-16"
      style={{
        backgroundColor: "var(--kc-bg)",
        color: "var(--kc-text)",
      }}
    >
      <div className="max-w-7xl mx-auto px-5">

        {/* Back Link */}
        <Link
          href="/events"
          className="inline-flex items-center gap-2 mb-8 font-medium hover:underline"
          style={{ color: "var(--kc-primary)" }}
        >
          ← Back to Events
        </Link>

        {/* Hero */}
        <section className="grid lg:grid-cols-2 gap-10 items-center mb-16">

          <div className="relative">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-[300px] md:h-[460px] object-cover rounded-[2rem]"
            />

            <span
              className="absolute top-5 left-5 px-5 py-2 rounded-full text-sm font-semibold"
              style={{
                backgroundColor: "var(--kc-accent)",
                color: "#244C3A",
              }}
            >
              {event.eventType}
            </span>
          </div>

          <div>
            <p
              className="uppercase tracking-[0.25em] text-sm font-bold mb-5"
              style={{ color: "var(--kc-muted)" }}
            >
              COMMUNITY / EVENT DETAILS
            </p>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              {event.title}
            </h1>

            <p
              className="text-lg leading-relaxed mb-8"
              style={{ color: "var(--kc-muted)" }}
            >
              {event.description}
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-2xl">📅</span>
                <div>
                  <p className="text-sm" style={{ color: "var(--kc-muted)" }}>
                    Event Date
                  </p>
                  <p className="font-semibold">{formattedDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="text-sm" style={{ color: "var(--kc-muted)" }}>
                    Location
                  </p>
                  <p className="font-semibold">{event.location}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">

            {/* About */}
            <section
              className="p-7 md:p-10 rounded-3xl border"
              style={{
                backgroundColor: "var(--kc-bg)",
                borderColor: "var(--kc-border)",
              }}
            >
              <p
                className="text-sm font-bold tracking-widest mb-3"
                style={{ color: "var(--kc-muted)" }}
              >
                01 / ABOUT THIS EVENT
              </p>

              <h2 className="text-3xl font-bold mb-5">
                Why this event matters
              </h2>

              <p
                className="leading-8 whitespace-pre-line"
                style={{ color: "var(--kc-muted)" }}
              >
                {event.description}
              </p>
            </section>

            {/* Confirmed Volunteers */}
            <section
              className="p-7 md:p-10 rounded-3xl border"
              style={{
                backgroundColor: "var(--kc-hover)",
                borderColor: "var(--kc-border)",
              }}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-7">
                <div>
                  <p
                    className="text-sm font-bold tracking-widest mb-2"
                    style={{ color: "var(--kc-muted)" }}
                  >
                    02 / OUR COMMUNITY
                  </p>

                  <h2 className="text-2xl md:text-3xl font-bold">
                    Confirmed Volunteers ({volunteers.length})
                  </h2>
                </div>

                <span className="text-3xl">🤝</span>
              </div>

              {volunteers.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {volunteers.map((volunteer, index) => (
                    <div
                      key={volunteer.userId || index}
                      className="flex items-center gap-4 p-4 rounded-2xl border"
                      style={{
                        backgroundColor: "var(--kc-bg)",
                        borderColor: "var(--kc-border)",
                      }}
                    >
                      {volunteer.image ? (
                        <img
                          src={volunteer.image}
                          alt={volunteer.name}
                          className="w-14 h-14 rounded-full object-cover"
                        />
                      ) : (
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold"
                          style={{
                            backgroundColor: "var(--kc-accent)",
                            color: "#244C3A",
                          }}
                        >
                          {(volunteer.name || "?").charAt(0).toUpperCase()}
                        </div>
                      )}

                      <div className="min-w-0">
                        <h3 className="font-bold truncate">
                          {volunteer.name || "Community Volunteer"}
                        </h3>

                        <p
                          className="text-xs mt-1"
                          style={{ color: "var(--kc-muted)" }}
                        >
                          Confirmed Volunteer
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <div className="text-4xl mb-3">🌱</div>
                  <h3 className="font-bold text-lg mb-2">
                    Be the first volunteer!
                  </h3>
                  <p style={{ color: "var(--kc-muted)" }}>
                    No one has joined this event yet. You can be the first
                    to make a difference.
                  </p>
                </div>
              )}
            </section>

          </div>

          {/* Right Sidebar */}
          <aside className="space-y-6">

            {/* Join Event */}
            <section
              className="p-7 rounded-3xl border"
              style={{
                backgroundColor: "var(--kc-hover)",
                borderColor: "var(--kc-border)",
              }}
            >
              <p
                className="text-sm font-bold tracking-widest mb-3"
                style={{ color: "var(--kc-muted)" }}
              >
                03 / GET INVOLVED
              </p>

              <h2 className="text-2xl font-bold mb-3">
                Be part of something good.
              </h2>

              <p
                className="mb-6 leading-7"
                style={{ color: "var(--kc-muted)" }}
              >
                Join this community event and help create a positive impact.
              </p>

              <JoinEventButton eventId={id} />
            </section>

            {/* Organizer */}
            <section
              className="p-7 rounded-3xl border"
              style={{
                backgroundColor: "var(--kc-hover)",
                borderColor: "var(--kc-border)",
              }}
            >
              <p
                className="text-sm font-bold tracking-widest mb-4"
                style={{ color: "var(--kc-muted)" }}
              >
                04 / ORGANIZER
              </p>

              <h3 className="text-xl font-bold mb-2">
                Event Organizer
              </h3>

              <p
                className="text-sm break-all mb-5"
                style={{ color: "var(--kc-muted)" }}
              >
                {event.organizerEmail}
              </p>

              <a
                href={`mailto:${event.organizerEmail}?subject=${encodeURIComponent(
                  `Joining Event: ${event.title}`
                )}`}
                className="block text-center px-5 py-3 rounded-full font-semibold"
                style={{
                  backgroundColor: "var(--kc-primary)",
                  color: "#FFFFFF",
                }}
              >
                Contact Organizer ↗
              </a>
            </section>

            {/* Event Information */}
            <section
              className="p-7 rounded-3xl border"
              style={{
                backgroundColor: "var(--kc-hover)",
                borderColor: "var(--kc-border)",
              }}
            >
              <p
                className="text-sm font-bold tracking-widest mb-4"
                style={{ color: "var(--kc-muted)" }}
              >
                05 / EVENT INFORMATION
              </p>

              <div className="space-y-4">
                <div>
                  <p className="text-sm" style={{ color: "var(--kc-muted)" }}>
                    Category
                  </p>
                  <p className="font-semibold">{event.eventType}</p>
                </div>

                <div>
                  <p className="text-sm" style={{ color: "var(--kc-muted)" }}>
                    Date
                  </p>
                  <p className="font-semibold">{formattedDate}</p>
                </div>

                <div>
                  <p className="text-sm" style={{ color: "var(--kc-muted)" }}>
                    Location
                  </p>
                  <p className="font-semibold">{event.location}</p>
                </div>
              </div>
            </section>

          </aside>
        </div>

        {/* Bottom CTA */}
        <section
          className="mt-16 p-8 md:p-12 rounded-[2rem] text-center"
          style={{
            backgroundColor: "var(--kc-panel)",
            color: "var(--kc-panel-text)",
          }}
        >
          <p className="text-sm tracking-widest font-bold mb-4">
            GOOD THINGS GROW TOGETHER
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mb-5">
            Small actions. Meaningful change.
          </h2>

          <p className="max-w-xl mx-auto mb-7 opacity-80">
            Every helping hand makes our community stronger.
            Join us and make a difference.
          </p>

          <a
            href={`mailto:${event.organizerEmail}?subject=${encodeURIComponent(
              `Joining Event: ${event.title}`
            )}`}
            className="inline-block px-8 py-3 rounded-full font-semibold"
            style={{
              backgroundColor: "var(--kc-accent)",
              color: "#244C3A",
            }}
          >
            Get Involved ↗
          </a>
        </section>

      </div>
    </main>
  );
};

export default EventDetailsPage;


