
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";

export default function ManageEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);

  // Fetch my events
  const fetchMyEvents = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/my-events", {
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to load events");
        setEvents([]);
        return;
      }

      setEvents(data);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyEvents();
  }, []);

  // Delete event
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) return;

    try {
      setDeleting(id);

      const res = await fetch(`/api/events/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to delete event");
        return;
      }

      setEvents((prev) => prev.filter((event) => event._id !== id));

      toast.success("Event deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setDeleting(null);
    }
  };

  // Update event
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const res = await fetch(`/api/events/${selectedEvent._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedEvent),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to update event");
        return;
      }

      setEvents((prev) =>
        prev.map((event) =>
          event._id === selectedEvent._id ? selectedEvent : event
        )
      );

      setSelectedEvent(null);
      toast.success("Event updated successfully! 🎉");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setSaving(false);
    }
  };

  // Edit form changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setSelectedEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const inputStyle =
    "w-full rounded-xl border border-[var(--kc-border)] bg-[var(--kc-hover)] px-4 py-3 text-sm text-[var(--kc-text)] outline-none transition placeholder:text-[var(--kc-muted)] focus:border-[var(--kc-primary)] focus:ring-2 focus:ring-[var(--kc-primary)]/15";

  const labelStyle =
    "mb-2 block text-sm font-bold text-[var(--kc-text)]";

  return (
    <main className="min-h-screen bg-[var(--kc-bg)] px-4 py-10 text-[var(--kc-text)] transition-colors duration-300 sm:px-6 lg:px-10">

      <div className="mx-auto max-w-7xl">

        {/* PAGE HEADER */}
        <section className="mb-10">

          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--kc-muted)] transition hover:text-[var(--kc-primary)]"
          >
            ← Back to Home
          </Link>

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--kc-primary)]">
                Your contributions / Dashboard
              </p>

              <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                Manage your
                <span className="font-serif font-normal italic text-[#D77D5B]">
                  {" "}events.
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--kc-muted)] sm:text-base">
                Every event is an opportunity to bring people together.
                Keep your community activities organized and up to date.
              </p>
            </div>

            <Link
              href="/create-event"
              className="inline-flex items-center justify-center gap-3 self-start rounded-xl bg-[#244C3A] px-6 py-4 font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#315E48] md:self-auto"
            >
              <span className="text-xl">+</span>
              Create New Event
            </Link>

          </div>
        </section>

        {/* SUMMARY STRIP */}
        {!loading && (
          <section className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2">

            <div className="flex items-center gap-5 rounded-2xl border border-[var(--kc-border)] bg-[var(--kc-hover)] p-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D5E7A1] text-2xl">
                📅
              </div>

              <div>
                <p className="text-3xl font-black">
                  {events.length}
                </p>
                <p className="mt-1 text-sm text-[var(--kc-muted)]">
                  Events you've created
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 rounded-2xl border border-[var(--kc-border)] bg-[var(--kc-hover)] p-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F1D7CA] text-2xl">
                🌱
              </div>

              <div>
                <p className="text-lg font-bold">
                  Keep growing
                </p>
                <p className="mt-1 text-sm text-[var(--kc-muted)]">
                  Your next community initiative starts here.
                </p>
              </div>
            </div>

          </section>
        )}

        {/* SECTION HEADING */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D77D5B]">
              Your activity
            </p>
            <h2 className="mt-2 text-2xl font-black">
              My events
            </h2>
          </div>

          {!loading && (
            <span className="rounded-full border border-[var(--kc-border)] px-4 py-2 text-xs font-bold text-[var(--kc-muted)]">
              {events.length} {events.length === 1 ? "EVENT" : "EVENTS"}
            </span>
          )}
        </div>

        {/* LOADING */}
        {loading && (
          <div className="flex min-h-[300px] flex-col items-center justify-center">
            <span className="loading loading-spinner loading-lg text-[#244C3A]"></span>
            <p className="mt-5 text-sm text-[var(--kc-muted)]">
              Gathering your events...
            </p>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && events.length === 0 && (
          <div className="overflow-hidden rounded-[2rem] border border-[var(--kc-border)] bg-[var(--kc-hover)] px-6 py-16 text-center sm:py-20">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#D5E7A1] text-4xl">
              🌱
            </div>

            <p className="mt-7 text-xs font-bold uppercase tracking-[0.25em] text-[var(--kc-primary)]">
              A fresh beginning
            </p>

            <h2 className="mt-3 text-3xl font-black">
              Nothing here just yet.
            </h2>

            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[var(--kc-muted)]">
              You haven't created an event yet. Start something meaningful
              and invite your community to be part of it.
            </p>

            <Link
              href="/create-event"
              className="mt-8 inline-flex items-center gap-3 rounded-xl bg-[#244C3A] px-7 py-4 font-bold text-white transition hover:bg-[#315E48]"
            >
              Create your first event
              <span>→</span>
            </Link>

          </div>
        )}

        {/* EVENT GRID */}
        {!loading && events.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">

            {events.map((event, index) => (
              <article
                key={event._id}
                className="group overflow-hidden rounded-[1.5rem] border border-[var(--kc-border)] bg-[var(--kc-bg)] transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                {/* EVENT IMAGE */}
                <div className="relative h-56 overflow-hidden bg-[var(--kc-hover)]">

                  {event.image ? (
                    <img
                      src={event.image}
                      alt={event.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-6xl">
                      🌿
                    </div>
                  )}

                  <div className="absolute left-4 top-4 rounded-full bg-[#F8F7F0] px-4 py-2 text-xs font-bold text-[#244C3A] shadow-sm">
                    {event.eventType || "Community Event"}
                  </div>

                  <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#244C3A] text-sm font-bold text-white">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                </div>

                {/* EVENT CONTENT */}
                <div className="p-5 sm:p-6">

                  <h3 className="line-clamp-2 min-h-[3.5rem] text-xl font-black leading-snug">
                    {event.title}
                  </h3>

                  <div className="mt-5 space-y-3 border-y border-[var(--kc-border)] py-4">

                    <div className="flex items-center gap-3 text-sm">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--kc-hover)]">
                        📅
                      </span>
                      <span className="text-[var(--kc-muted)]">
                        {event.date || "Date not specified"}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--kc-hover)]">
                        📍
                      </span>
                      <span className="line-clamp-1 text-[var(--kc-muted)]">
                        {event.location || "Location not specified"}
                      </span>
                    </div>

                  </div>

                  <p className="mt-4 line-clamp-2 min-h-10 text-sm leading-6 text-[var(--kc-muted)]">
                    {event.description}
                  </p>

                  {/* ACTIONS */}
                  <div className="mt-6 grid grid-cols-2 gap-3">

                    <button
                      onClick={() => setSelectedEvent({ ...event })}
                      className="flex items-center justify-center gap-2 rounded-xl bg-[#244C3A] px-3 py-3 text-sm font-bold text-white transition hover:bg-[#315E48]"
                    >
                      <span>✎</span>
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(event._id)}
                      disabled={deleting === event._id}
                      className="flex items-center justify-center gap-2 rounded-xl border border-red-400/40 px-3 py-3 text-sm font-bold text-red-500 transition hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <span>⌫</span>
                      {deleting === event._id ? "Deleting..." : "Delete"}
                    </button>

                  </div>

                </div>
              </article>
            ))}

          </div>
        )}

      </div>

      {/* EDIT MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-3 backdrop-blur-sm sm:p-6">

          <div className="my-auto max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-[2rem] border border-[var(--kc-border)] bg-[var(--kc-bg)] p-6 text-[var(--kc-text)] shadow-2xl sm:p-9">

            {/* MODAL HEADER */}
            <div className="mb-8 flex items-start justify-between gap-4">

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D77D5B]">
                  Your contribution
                </p>

                <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                  Edit your event<span className="text-[#D77D5B]">.</span>
                </h2>

                <p className="mt-2 text-sm text-[var(--kc-muted)]">
                  Make changes to your event details.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--kc-hover)] text-2xl transition hover:bg-[var(--kc-border)]"
                aria-label="Close edit form"
              >
                ×
              </button>

            </div>

            {/* EDIT FORM */}
            <form onSubmit={handleUpdate} className="space-y-5">

              <div>
                <label className={labelStyle}>
                  Event Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={selectedEvent.title || ""}
                  onChange={handleChange}
                  required
                  className={inputStyle}
                />
              </div>

              <div>
                <label className={labelStyle}>
                  Event Type
                </label>

                <select
                  name="eventType"
                  value={selectedEvent.eventType || ""}
                  onChange={handleChange}
                  required
                  className={inputStyle}
                >
                  <option value="">Select Event Type</option>
                  <option value="Donation">Donation</option>
                  <option value="Cleanup">Cleanup</option>
                  <option value="Education">Education</option>
                  <option value="Health">Health</option>
                  <option value="Food Distribution">Food Distribution</option>
                  <option value="Tree Plantation">Tree Plantation</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className={labelStyle}>
                  Event Date
                </label>

                <input
                  type="date"
                  name="date"
                  value={selectedEvent.date || ""}
                  onChange={handleChange}
                  required
                  className={inputStyle}
                />
              </div>

              <div>
                <label className={labelStyle}>
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={selectedEvent.location || ""}
                  onChange={handleChange}
                  required
                  className={inputStyle}
                />
              </div>

              <div>
                <label className={labelStyle}>
                  Image URL
                </label>

                <input
                  type="url"
                  name="image"
                  value={selectedEvent.image || ""}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </div>

              <div>
                <label className={labelStyle}>
                  Description
                </label>

                <textarea
                  name="description"
                  value={selectedEvent.description || ""}
                  onChange={handleChange}
                  required
                  rows={4}
                  className={`${inputStyle} resize-y leading-7`}
                />
              </div>

              {/* MODAL ACTIONS */}
              <div className="flex flex-col gap-3 border-t border-[var(--kc-border)] pt-6 sm:flex-row">

                <button
                  type="button"
                  onClick={() => setSelectedEvent(null)}
                  className="flex-1 rounded-xl border border-[var(--kc-border)] px-5 py-3.5 font-bold transition hover:bg-[var(--kc-hover)]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 rounded-xl bg-[#244C3A] px-5 py-3.5 font-bold text-white transition hover:bg-[#315E48] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving ? "Saving Changes..." : "Save Changes →"}
                </button>

              </div>

            </form>
          </div>
        </div>
      )}

    </main>
  );
}
