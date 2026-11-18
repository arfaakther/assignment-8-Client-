
import Link from "next/link";
import { getTokenFromServer } from "@/app/lib/getTokenFromServer";

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
    return <div className="p-10 text-center">Failed to load event.</div>;
  }

  const event = await res.json();

  if (!event) {
    return <div className="p-10 text-center">Event not found.</div>;
  }

  return (
    <div className="min-h-screen bg-[var(--kc-bg)] text-[var(--kc-text)] px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/events"
          className="inline-block mb-6 text-[var(--kc-muted)] hover:text-[#4D8C83]"
        >
          ← Back to Events
        </Link>

        <div className="overflow-hidden rounded-3xl border border-[var(--kc-border)] bg-[var(--kc-bg)] shadow-lg">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-72 object-cover"
          />

          <div className="p-6 sm:p-10">
            <span className="inline-block rounded-full bg-[var(--kc-hover)] px-4 py-2 text-sm font-semibold mb-4">
              {event.eventType}
            </span>

            <h1 className="text-3xl sm:text-4xl font-bold mb-6">
              {event.title}
            </h1>

            <div className="space-y-3 mb-8">
              <p>📅 {event.date}</p>
              <p>📍 {event.location}</p>
              <p>✉️ {event.organizerEmail}</p>
            </div>

            <div className="border-t border-[var(--kc-border)] pt-6">
              <h2 className="text-xl font-bold mb-3">
                About This Event
              </h2>

              <p className="text-[var(--kc-muted)] leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
