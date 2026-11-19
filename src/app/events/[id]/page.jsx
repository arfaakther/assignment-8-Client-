
import Link from "next/link";
import { getTokenFromServer } from "@/app/lib/getTokenFromServer";
import JoinEventButton from "./JoinEventButton";
const EventDetailsPage = async ({ params }) => {
  const { id } = await params;
  const token = await getTokenFromServer();

  if (!token) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--kc-bg)] text-[var(--kc-text)] px-6">
        <h1 className="text-3xl font-bold mb-4">Login Required</h1>
        <p className="mb-6">
          Please log in to view event details.
        </p>
        <Link
          href="/login"
          className="rounded-xl bg-[#4D8C83] px-6 py-3 text-white font-semibold"
        >
          Login Now
        </Link>
      </div>
    );
  }

  const res = await fetch(`http://localhost:8000/events/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (res.status === 401 || res.status === 403) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--kc-bg)] text-[var(--kc-text)] px-6">
        <h1 className="text-3xl font-bold mb-4">Unauthorized</h1>
        <p className="mb-6">
          You need to log in to view this event.
        </p>
        <Link
          href="/login"
          className="rounded-xl bg-[#4D8C83] px-6 py-3 text-white font-semibold"
        >
          Login
        </Link>
      </div>
    );
  }

  if (!res.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--kc-bg)] text-[var(--kc-text)]">
        Failed to load event.
      </div>
    );
  }

  const event = await res.json();

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--kc-bg)] text-[var(--kc-text)]">
        Event not found.
      </div>
    );
  }

  const formattedDate = event.date
    ? new Date(`${event.date}T12:00:00`).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Date not specified";

  return (
    <div className="min-h-screen bg-[var(--kc-bg)] px-4 py-10 sm:px-6">

      {/* Main Container */}
      <div className="mx-auto max-w-5xl">

        {/* Back Link */}
        <Link
          href="/events"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--kc-muted)] transition hover:text-[#4D8C83]"
        >
          <span>←</span> Back to Upcoming Events
        </Link>

        {/* Event Card */}
        <div className="overflow-hidden rounded-3xl border border-[var(--kc-border)] bg-[var(--kc-bg)] shadow-xl">

          {/* Hero Image */}
          <div className="relative h-[320px] sm:h-[400px]">

            <img
              src={event.image}
              alt={event.title}
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />

            {/* Event Type */}
            <div className="absolute left-6 top-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#35213B] shadow-md">
                <span className="text-[#0D9488]">♢</span>
                {event.eventType}
              </span>
            </div>

            {/* Hero Content */}
            <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8">

              <h1 className="max-w-3xl text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
                {event.title}
              </h1>

              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-white sm:text-base">

                <span className="flex items-center gap-2">
                  <span className="text-[#14B8A6]">📍</span>
                  {event.location}
                </span>

                <span className="flex items-center gap-2">
                  <span className="text-[#14B8A6]">▦</span>
                  {formattedDate}
                </span>

              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-5 sm:p-8">

            {/* Volunteer Action Section */}
            <div className="mb-8 flex flex-col gap-5 rounded-2xl border border-[var(--kc-border)] bg-[var(--kc-hover)] p-5 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#0D9488]/10 text-3xl">
                  🤝
                </div>

                <div>
                  <h2 className="font-bold text-[var(--kc-primary)]">
                    Be Part of This Initiative
                  </h2>

                  <p className="mt-1 text-sm text-[var(--kc-muted)]">
                    Join hands with your community and make a difference.
                  </p>
                </div>
              </div>

              <JoinEventButton eventId={id} />

            </div>

            {/* Description + Sidebar */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

              {/* Left Content */}
              <div className="lg:col-span-2">

                {/* About Event */}
                <section>
                  <div className="mb-5 flex items-center gap-3">
                    <div className="h-7 w-1 rounded-full bg-[#0D9488]" />

                    <h2 className="text-xl font-extrabold text-[var(--kc-primary)]">
                      About This Social Initiative
                    </h2>
                  </div>

                  <p className="text-sm leading-8 text-[var(--kc-muted)] sm:text-base">
                    {event.description}
                  </p>
                </section>

                {/* Divider */}
                <div className="my-7 border-t border-[var(--kc-border)]" />

                {/* Volunteer Guidelines */}
                <section>
                  <h3 className="mb-5 text-sm font-extrabold uppercase tracking-wider text-[var(--kc-muted)]">
                    Volunteer Guidelines
                  </h3>

                  <div className="space-y-3 text-sm leading-6 text-[var(--kc-muted)]">

                    <p className="flex gap-3">
                      <span className="font-bold text-[#0D9488]">●</span>
                      Please arrive 15 minutes before the scheduled event.
                    </p>

                    <p className="flex gap-3">
                      <span className="font-bold text-[#0D9488]">●</span>
                      Wear comfortable clothing suitable for the activity.
                    </p>

                    <p className="flex gap-3">
                      <span className="font-bold text-[#0D9488]">●</span>
                      Follow the organizer's instructions and work together.
                    </p>

                    <p className="flex gap-3">
                      <span className="font-bold text-[#0D9488]">●</span>
                      Bring any pre-coordinated supplies if requested.
                    </p>

                  </div>
                </section>

              </div>

              {/* Right Sidebar */}
              <aside className="space-y-6">

                {/* Organizer Card */}
                <div className="rounded-2xl border border-[var(--kc-border)] bg-[var(--kc-bg)] p-6">

                  <h3 className="mb-5 text-xs font-extrabold uppercase tracking-wider text-[var(--kc-muted)]">
                    Initiative Organizer
                  </h3>

                  <div className="flex items-center gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#4D8C83]/15 text-xl font-bold text-[#4D8C83]">
                      {event.organizerEmail?.charAt(0).toUpperCase() || "O"}
                    </div>

                    <div className="min-w-0">
                      <h4 className="truncate font-bold text-[var(--kc-primary)]">
                        Community Organizer
                      </h4>

                      <a
                        href={`mailto:${event.organizerEmail}`}
                        className="mt-1 block break-all text-xs text-[var(--kc-muted)] hover:text-[#4D8C83]"
                      >
                        ✉ {event.organizerEmail}
                      </a>
                    </div>

                  </div>

                  <div className="mt-5 border-t border-[var(--kc-border)] pt-4">
                    <p className="flex items-center gap-2 text-xs font-medium text-[var(--kc-muted)]">
                      <span className="text-[#0D9488]">♢</span>
                      Event Organizer
                    </p>
                  </div>

                </div>

                {/* Event Information Card */}
                <div className="rounded-2xl border border-[var(--kc-border)] bg-[var(--kc-bg)] p-6">

                  <h3 className="mb-5 text-xs font-extrabold uppercase tracking-wider text-[var(--kc-muted)]">
                    Event Information
                  </h3>

                  <div className="space-y-5">

                    <div className="flex items-start gap-3">
                      <span className="text-xl">📅</span>
                      <div>
                        <p className="text-xs text-[var(--kc-muted)]">
                          Event Date
                        </p>
                        <p className="mt-1 text-sm font-bold text-[var(--kc-primary)]">
                          {formattedDate}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="text-xl">📍</span>
                      <div>
                        <p className="text-xs text-[var(--kc-muted)]">
                          Venue
                        </p>
                        <p className="mt-1 text-sm font-bold text-[var(--kc-primary)]">
                          {event.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="text-xl">🏷️</span>
                      <div>
                        <p className="text-xs text-[var(--kc-muted)]">
                          Event Category
                        </p>
                        <p className="mt-1 text-sm font-bold text-[var(--kc-primary)]">
                          {event.eventType}
                        </p>
                      </div>
                    </div>

                  </div>

                </div>

              </aside>

            </div>

            {/* Bottom CTA */}
            <div className="mt-9 rounded-2xl bg-[#35213B] px-6 py-8 text-center sm:px-10">
              <h2 className="text-2xl font-extrabold text-white">
                Together, We Can Make a Difference!
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/75">
                Every helping hand matters. Reach out to the organizer and become part of something meaningful.
              </p>

              <a
                href={`mailto:${event.organizerEmail}?subject=${encodeURIComponent(
                  `Joining Event: ${event.title}`
                )}`}
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#F3B63F] px-7 py-3 font-bold text-[#35213B] transition hover:bg-[#F7D17A]"
              >
                Get Involved →
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
