
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
    <>
      {/* Search and Filter */}
      <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${
                activeCategory === category
                  ? "border-[#0D9488] bg-[#0D9488] text-white shadow-sm"
                  : "border-[var(--kc-border)] bg-[var(--kc-bg)] text-[var(--kc-muted)] hover:border-[#0D9488] hover:text-[#0D9488]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full lg:max-w-xs">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-[var(--kc-muted)]">
            🔍
          </span>

          <input
            type="text"
            placeholder="Search events or areas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-[var(--kc-border)] bg-[var(--kc-bg)] py-3 pl-11 pr-10 text-sm text-[var(--kc-text)] shadow-sm outline-none transition placeholder:text-[var(--kc-muted)] focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/20"
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-[var(--kc-muted)] hover:text-[#0D9488]"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Results Count */}
      <p className="mb-6 text-sm text-[var(--kc-muted)]">
        Showing{" "}
        <span className="font-bold text-[var(--kc-primary)]">
          {filteredEvents.length}
        </span>{" "}
        of {events.length} events
      </p>

      {/* Event Cards */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 xl:grid-cols-3">
          {filteredEvents.map((event) => (
            <article
              key={event._id}
              className="overflow-hidden rounded-2xl border border-[var(--kc-border)] bg-[var(--kc-bg)] shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Event Image */}
              <div className="relative h-56">
                {event.image ? (
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-[#F7E8E4] text-5xl">
                    🌱
                  </div>
                )}

                <span className="absolute left-4 top-4 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#0D9488]">
                  {event.eventType || "Community Event"}
                </span>
              </div>

              {/* Event Information */}
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
        /* No Matching Events */
        <div className="rounded-2xl border border-[var(--kc-border)] px-5 py-16 text-center">
          <p className="text-5xl">🔎</p>

          <h3 className="mt-5 text-xl font-bold text-[var(--kc-primary)]">
            No matching events found
          </h3>

          <p className="mt-2 text-sm text-[var(--kc-muted)]">
            Try another search term or choose a different category.
          </p>

          <button
            onClick={() => {
              setSearch("");
              setActiveCategory("All");
            }}
            className="mt-6 rounded-xl bg-[#0D9488] px-6 py-3 font-bold text-white transition hover:bg-[#4D8C83]"
          >
            Clear Filters
          </button>
        </div>
      )}
    </>
  );
};

export default EventsClient;
