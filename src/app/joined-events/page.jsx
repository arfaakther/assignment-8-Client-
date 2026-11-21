
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
      <div
        className="flex min-h-screen items-center justify-center"
        style={{
          backgroundColor: "var(--kc-bg)",
          color: "var(--kc-primary)",
        }}
      >
        <div className="text-center">
          <div
            className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[var(--kc-border)] border-t-[var(--kc-primary)]"
          />
          <p className="font-medium">Loading your community journey...</p>
        </div>
      </div>
    );
  }

  return (
    <main
      className="min-h-screen px-4 py-12 sm:px-6 lg:px-8"
      style={{
        backgroundColor: "var(--kc-bg)",
        color: "var(--kc-text)",
      }}
    >
      <div className="mx-auto max-w-6xl">

        {/* Page Heading */}
        <section className="relative mb-12 overflow-hidden rounded-[2rem] bg-[var(--kc-panel)] px-6 py-10 text-[var(--kc-panel-text)] sm:px-10 sm:py-14">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D5E7A1]">
              Your Community Journey
            </span>

            <h1 className="mt-5 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Good things happen when we show up.
            </h1>

            <p className="mt-5 max-w-lg text-sm leading-7 opacity-75 sm:text-base">
              Every event you join is a little step toward a stronger,
              kinder community. Here's where your journey is taking you.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#D5E7A1] px-5 py-2 text-sm font-bold text-[#244C3A]">
                {events.length} {events.length === 1 ? "Event" : "Events"} Joined
              </span>

              <Link
                href="/events"
                className="rounded-full border border-white/30 px-5 py-2 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Discover More Events →
              </Link>
            </div>
          </div>

          <div className="pointer-events-none absolute -right-10 -top-16 hidden h-72 w-72 rounded-full border border-white/10 sm:block" />
          <div className="pointer-events-none absolute -right-2 -top-8 hidden h-56 w-56 rounded-full border border-white/10 sm:block" />
          <div className="pointer-events-none absolute -bottom-24 right-28 hidden h-48 w-48 rounded-full bg-[#D5E7A1]/10 blur-2xl sm:block" />
        </section>

        {/* Empty State */}
        {events.length === 0 ? (
          <section
            className="rounded-[2rem] border px-6 py-20 text-center"
            style={{
              borderColor: "var(--kc-border)",
              backgroundColor: "var(--kc-hover)",
            }}
          >
            <div className="mb-6 text-6xl">🌱</div>

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--kc-muted)]">
              Your journey starts here
            </span>

            <h2 className="mt-4 text-2xl font-black text-[var(--kc-primary)] sm:text-3xl">
              No Joined Events Yet
            </h2>

            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[var(--kc-muted)]">
              You haven't joined any community events yet. Find something
              meaningful, meet new people, and make a difference together.
            </p>

            <Link
              href="/events"
              className="mt-8 inline-flex items-center rounded-full bg-[var(--kc-primary)] px-7 py-3 font-bold text-[var(--kc-bg)] transition hover:opacity-80"
            >
              Explore Events →
            </Link>
          </section>
        ) : (
          <>
            {/* Events Section Heading */}
            <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--kc-muted)]">
                  Your Contributions
                </span>

                <h2 className="mt-2 text-2xl font-black text-[var(--kc-primary)] sm:text-3xl">
                  Events You're Part Of
                </h2>
              </div>

              <p className="text-sm font-medium text-[var(--kc-muted)]">
                Showing {events.length} joined{" "}
                {events.length === 1 ? "event" : "events"}
              </p>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event, index) => (
                <article
                  key={event._id}
                  className="group overflow-hidden rounded-[1.5rem] border transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                  style={{
                    borderColor: "var(--kc-border)",
                    backgroundColor: "var(--kc-bg)",
                  }}
                >
                  {/* Event Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />

                    <div className="absolute left-4 top-4">
                      <span className="rounded-full bg-[#F8F7F0] px-4 py-2 text-xs font-bold text-[#244C3A] shadow-sm">
                        {event.eventType}
                      </span>
                    </div>

                    <div className="absolute bottom-4 right-4">
                      <span className="rounded-full bg-[#244C3A] px-3 py-1.5 text-xs font-bold text-[#D5E7A1]">
                        ✓ Joined
                      </span>
                    </div>
                  </div>

                  {/* Event Content */}
                  <div className="p-6">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-widest text-[var(--kc-muted)]">
                        Community Event
                      </span>

                      <span className="text-xs font-bold text-[var(--kc-muted)]">
                        #{String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="text-xl font-black leading-snug text-[var(--kc-primary)] transition group-hover:opacity-75">
                      {event.title}
                    </h3>

                    <div
                      className="my-5 space-y-3 border-y py-4 text-sm"
                      style={{ borderColor: "var(--kc-border)" }}
                    >
                      <p className="flex items-center gap-3 text-[var(--kc-muted)]">
                        <span className="text-lg">📅</span>
                        {event.date}
                      </p>

                      <p className="flex items-center gap-3 text-[var(--kc-muted)]">
                        <span className="text-lg">📍</span>
                        {event.location}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <Link
                        href={`/events/${event._id}`}
                        className="inline-flex items-center gap-2 rounded-full bg-[var(--kc-primary)] px-5 py-2.5 text-sm font-bold text-[var(--kc-bg)] transition hover:opacity-80"
                      >
                        View Details
                        <span>↗</span>
                      </Link>

                      <span className="text-xs font-bold text-[var(--kc-muted)]">
                        Part of something good
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default JoinedEventsPage;
