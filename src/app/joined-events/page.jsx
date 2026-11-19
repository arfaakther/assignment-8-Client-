"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const JoinedEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getJoinedEvents = async () => {
      try {
        const res = await fetch("/api/joined-events");

        if (!res.ok) {
          throw new Error("Failed to fetch joined events");
        }

        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getJoinedEvents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--kc-bg)] text-[var(--kc-primary)]">
        Loading your joined events...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--kc-bg)] px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-6xl">

        <div className="mb-10">
          <span className="text-sm font-bold uppercase tracking-wider text-[#4D8C83]">
            Your Community Journey
          </span>

          <h1 className="mt-3 text-3xl font-extrabold text-[var(--kc-primary)] sm:text-4xl">
            My Joined Events
          </h1>

          <p className="mt-3 text-[var(--kc-muted)]">
            Events you've joined and the difference you're helping make.
          </p>
        </div>

        {events.length === 0 ? (
          <div className="rounded-3xl border border-[var(--kc-border)] bg-[var(--kc-hover)] px-6 py-16 text-center">
            <div className="mb-5 text-5xl">🤝</div>

            <h2 className="text-2xl font-bold text-[var(--kc-primary)]">
              No Joined Events Yet
            </h2>

            <p className="mx-auto mt-3 max-w-md text-[var(--kc-muted)]">
              You haven't joined any community events yet. Explore upcoming events and become part of something meaningful!
            </p>

            <Link
              href="/events"
              className="mt-7 inline-flex rounded-xl bg-[#0D9488] px-7 py-3 font-bold text-white transition hover:bg-[#4D8C83]"
            >
              Explore Events →
            </Link>
          </div>
        ) : (
          <>
            <p className="mb-6 font-semibold text-[var(--kc-muted)]">
              {events.length} event(s) joined
            </p>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <div
                  key={event._id}
                  className="overflow-hidden rounded-2xl border border-[var(--kc-border)] bg-[var(--kc-bg)] shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-52 w-full object-cover"
                  />

                  <div className="p-5">
                    <span className="inline-block rounded-full bg-[#4D8C83]/10 px-3 py-1 text-xs font-bold text-[#4D8C83]">
                      {event.eventType}
                    </span>

                    <h2 className="mt-3 text-xl font-bold text-[var(--kc-primary)]">
                      {event.title}
                    </h2>

                    <div className="mt-4 space-y-2 text-sm text-[var(--kc-muted)]">
                      <p>📅 {event.date}</p>
                      <p>📍 {event.location}</p>
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-3">
                      <Link
                        href={`/events/${event._id}`}
                        className="rounded-lg bg-[#0D9488] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#4D8C83]"
                      >
                        View Details
                      </Link>

                      <span className="text-sm font-bold text-[#4D8C83]">
                        ✓ Joined
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default JoinedEventsPage;