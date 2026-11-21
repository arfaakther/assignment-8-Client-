
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const categories = [
  "All",
  "Donation",
  "Cleanup",
  "Plantation",
  "Winter Relief",
  "Food Drive",
  "Health Camp",
  "Education",
];

const EventsClient = ({ events }) => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesCategory =
        activeCategory === "All" ||
        event.eventType?.toLowerCase() === activeCategory.toLowerCase();

      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        event.title?.toLowerCase().includes(searchText) ||
        event.location?.toLowerCase().includes(searchText) ||
        event.description?.toLowerCase().includes(searchText);

      return matchesCategory && matchesSearch;
    });
  }, [events, search, activeCategory]);

  return (
    <div>
      {/* Search and Filter */}
      <section className="mb-12">
        <div
          className="flex flex-col md:flex-row gap-5 md:items-center justify-between p-5 md:p-7 rounded-3xl border mb-7"
          style={{
            backgroundColor: "var(--kc-hover)",
            borderColor: "var(--kc-border)",
          }}
        >
          <div>
            <p
              className="text-xs font-bold uppercase tracking-[0.2em] mb-2"
              style={{ color: "var(--kc-muted)" }}
            >
              YOUR NEXT GOOD THING
            </p>

            <h3 className="text-xl md:text-2xl font-bold">
              Find something meaningful.
            </h3>
          </div>

          <div className="relative w-full md:max-w-md">
            <span
              className="absolute left-5 top-1/2 -translate-y-1/2 text-xl"
              style={{ color: "var(--kc-muted)" }}
            >
              ⌕
            </span>

            <input
              type="text"
              placeholder="Search by event, place or cause..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border py-4 pl-12 pr-12 text-sm outline-none transition focus:ring-2"
              style={{
                backgroundColor: "var(--kc-bg)",
                color: "var(--kc-text)",
                borderColor: "var(--kc-border)",
              }}
            />

            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-xl"
                style={{ color: "var(--kc-muted)" }}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Categories */}
        <div>
          <div className="flex items-center justify-between gap-4 mb-4">
            <h3 className="font-bold text-lg">Browse by interest</h3>

            <span
              className="text-xs uppercase tracking-widest font-semibold"
              style={{ color: "var(--kc-muted)" }}
            >
              Choose a cause
            </span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-3">
            {categories.map((category) => {
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className="shrink-0 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 border"
                  style={{
                    backgroundColor: isActive
                      ? "var(--kc-primary)"
                      : "var(--kc-bg)",
                    color: isActive ? "#FFFFFF" : "var(--kc-muted)",
                    borderColor: isActive
                      ? "var(--kc-primary)"
                      : "var(--kc-border)",
                  }}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Results Heading */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-7">
        <div>
          <p
            className="text-xs uppercase tracking-[0.2em] font-bold mb-2"
            style={{ color: "var(--kc-muted)" }}
          >
            THE COMMUNITY BOARD
          </p>

          <h3 className="text-2xl md:text-3xl font-bold">
            {activeCategory === "All"
              ? "All opportunities"
              : activeCategory + " events"}
          </h3>
        </div>

        <p className="text-sm" style={{ color: "var(--kc-muted)" }}>
          Showing{" "}
          <span
            className="font-bold"
            style={{ color: "var(--kc-primary)" }}
          >
            {filteredEvents.length}
          </span>{" "}
          of {events.length} events
        </p>
      </div>

      {/* Event Cards */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 items-stretch">
          {filteredEvents.map((event, index) => (
            <article
              key={event._id}
              className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{
                backgroundColor: "var(--kc-bg)",
                borderColor: "var(--kc-border)",
              }}
            >
              {/* Image */}
              <div className="relative h-64 shrink-0 overflow-hidden">
                {event.image ? (
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div
                    className="flex h-full items-center justify-center text-6xl"
                    style={{ backgroundColor: "var(--kc-hover)" }}
                  >
                    🌱
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                <span
                  className="absolute top-5 left-5 px-4 py-2 rounded-full text-xs font-bold"
                  style={{
                    backgroundColor: "var(--kc-accent)",
                    color: "#244C3A",
                  }}
                >
                  {event.eventType || "Community Event"}
                </span>

                <span className="absolute bottom-5 right-5 text-white text-sm font-bold">
                  #{String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Card Content */}
              <div className="flex flex-1 flex-col p-6 md:p-7">

                {/* Title */}
                <h3 className="min-h-[64px] text-xl md:text-2xl font-bold leading-snug line-clamp-2">
                  {event.title}
                </h3>

                {/* Date and Location */}
                <div
                  className="flex flex-col gap-3 mt-5 text-sm min-h-[52px]"
                  style={{ color: "var(--kc-muted)" }}
                >
                  <span className="flex items-center gap-2">
                    <span>📅</span>
                    {event.date || "Date not specified"}
                  </span>

                  <span className="flex items-center gap-2">
                    <span>📍</span>
                    {event.location || "Location not specified"}
                  </span>
                </div>

                {/* Description */}
                <p
                  className="mt-5 text-sm leading-7 line-clamp-3 min-h-[84px]"
                  style={{ color: "var(--kc-muted)" }}
                >
                  {event.description || "Join this community event and make a difference."}
                </p>

                {/* Organizer */}
                <div
                  className="mt-auto pt-5 border-t flex flex-col gap-1 min-h-[85px]"
                  style={{ borderColor: "var(--kc-border)" }}
                >
                  <span
                    className="text-xs uppercase tracking-widest font-bold"
                    style={{ color: "var(--kc-muted)" }}
                  >
                    Organized by
                  </span>

                  <span className="text-sm font-semibold break-all line-clamp-2">
                    {event.organizerEmail || "Community Organizer"}
                  </span>
                </div>

                {/* Button */}
                <Link
                  href={`/events/${event._id}`}
                  className="mt-6 flex items-center justify-between rounded-full px-6 py-4 font-bold text-sm transition-all hover:opacity-90"
                  style={{
                    backgroundColor: "var(--kc-primary)",
                    color: "#FFFFFF",
                  }}
                >
                  <span>Explore this event</span>
                  <span className="text-lg transition-transform group-hover:translate-x-1">
                    ↗
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div
          className="rounded-[2rem] border text-center px-6 py-20"
          style={{
            backgroundColor: "var(--kc-hover)",
            borderColor: "var(--kc-border)",
          }}
        >
          <div className="text-5xl mb-5">🌿</div>

          <p
            className="text-xs uppercase tracking-[0.2em] font-bold mb-3"
            style={{ color: "var(--kc-muted)" }}
          >
            NOTHING HERE JUST YET
          </p>

          <h3 className="text-2xl md:text-3xl font-bold">
            No matching events found.
          </h3>

          <p
            className="mt-3 max-w-md mx-auto leading-7"
            style={{ color: "var(--kc-muted)" }}
          >
            Try another search or explore a different category.
            Your next opportunity might be just around the corner.
          </p>

          <button
            onClick={() => {
              setSearch("");
              setActiveCategory("All");
            }}
            className="mt-7 px-7 py-3 rounded-full font-bold transition hover:opacity-80"
            style={{
              backgroundColor: "var(--kc-primary)",
              color: "#FFFFFF",
            }}
          >
            Reset filters ↗
          </button>
        </div>
      )}
    </div>
  );
};

export default EventsClient;


