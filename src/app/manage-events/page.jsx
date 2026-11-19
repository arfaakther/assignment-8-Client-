
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSelectedEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <main
      className="min-h-screen px-5 py-12"
      style={{
        background: "var(--kc-bg)",
        color: "var(--kc-text)",
      }}
    >
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 font-semibold text-[#4D8C83]">
              YOUR CONTRIBUTIONS
            </p>

            <h1 className="text-3xl font-extrabold sm:text-4xl">
              Manage My Events
            </h1>

            <p
              className="mt-3"
              style={{ color: "var(--kc-muted)" }}
            >
              Manage and update the events you've created.
            </p>
          </div>

          <Link
            href="/create-event"
            className="rounded-xl bg-[#35213B] px-6 py-3 text-center font-semibold text-white transition hover:bg-[#4D8C83]"
          >
            + Create New Event
          </Link>
        </div>

        {/* Event count */}
        {!loading && (
          <div
            className="mb-7 inline-flex items-center gap-2 rounded-full px-5 py-2 font-semibold"
            style={{ background: "var(--kc-hover)" }}
          >
            <span>📅</span>
            {events.length} My Events
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="py-20 text-center">
            <span className="loading loading-spinner loading-lg text-[#4D8C83]"></span>
            <p className="mt-4">Loading your events...</p>
          </div>
        )}

        {/* No events */}
        {!loading && events.length === 0 && (
          <div
            className="rounded-3xl border p-12 text-center"
            style={{
              background: "var(--kc-hover)",
              borderColor: "var(--kc-border)",
            }}
          >
            <div className="mb-4 text-5xl">🌱</div>

            <h2 className="text-2xl font-bold">
              No events created yet!
            </h2>

            <p
              className="mt-3"
              style={{ color: "var(--kc-muted)" }}
            >
              Start something meaningful in your community.
            </p>

            <Link
              href="/create-event"
              className="mt-6 inline-block rounded-xl bg-[#35213B] px-6 py-3 font-semibold text-white hover:bg-[#4D8C83]"
            >
              Create Your First Event
            </Link>
          </div>
        )}

        {/* Events */}
        {!loading && events.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div
                key={event._id}
                className="overflow-hidden rounded-2xl border shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                style={{
                  background: "var(--kc-bg)",
                  borderColor: "var(--kc-border)",
                }}
              >
                {/* Image */}
                <div className="h-52 overflow-hidden bg-[#F7E8E4]">
                  {event.image ? (
                    <img
                      src={event.image}
                      alt={event.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-5xl">
                      🌿
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <span className="rounded-full bg-[#F7E8E4] px-3 py-1 text-xs font-bold text-[#35213B]">
                    {event.eventType || "Community Event"}
                  </span>

                  <h2 className="mt-4 text-xl font-bold">
                    {event.title}
                  </h2>

                  <div
                    className="mt-4 space-y-2 text-sm"
                    style={{ color: "var(--kc-muted)" }}
                  >
                    <p>📅 {event.date || "Date not specified"}</p>
                    <p>📍 {event.location || "Location not specified"}</p>
                  </div>

                  <p
                    className="mt-4 line-clamp-2 text-sm"
                    style={{ color: "var(--kc-muted)" }}
                  >
                    {event.description}
                  </p>

                  {/* Buttons */}
                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => setSelectedEvent({ ...event })}
                      className="flex-1 rounded-xl bg-[#35213B] px-4 py-3 font-semibold text-white transition hover:bg-[#4D8C83]"
                    >
                      ✏️ Edit
                    </button>

                    <button
                      onClick={() => handleDelete(event._id)}
                      disabled={deleting === event._id}
                      className="flex-1 rounded-xl border border-red-300 px-4 py-3 font-semibold text-red-500 transition hover:bg-red-500 hover:text-white disabled:opacity-50"
                    >
                      {deleting === event._id
                        ? "Deleting..."
                        : "🗑️ Delete"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4">
          <div
            className="my-auto max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl p-6 shadow-2xl sm:p-8"
            style={{ background: "var(--kc-bg)" }}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                Edit Your Event ✏️
              </h2>

              <button
                onClick={() => setSelectedEvent(null)}
                className="text-2xl"
                aria-label="Close edit form"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">

              <div>
                <label className="mb-2 block font-semibold">
                  Event Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={selectedEvent.title || ""}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border p-3 outline-none"
                  style={{
                    background: "var(--kc-bg)",
                    borderColor: "var(--kc-border)",
                    color: "var(--kc-text)",
                  }}
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold">
                  Event Type
                </label>
                <select
                  name="eventType"
                  value={selectedEvent.eventType || ""}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border p-3 outline-none"
                  style={{
                    background: "var(--kc-bg)",
                    borderColor: "var(--kc-border)",
                    color: "var(--kc-text)",
                  }}
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
                <label className="mb-2 block font-semibold">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={selectedEvent.date || ""}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border p-3 outline-none"
                  style={{
                    background: "var(--kc-bg)",
                    borderColor: "var(--kc-border)",
                    color: "var(--kc-text)",
                  }}
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={selectedEvent.location || ""}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border p-3 outline-none"
                  style={{
                    background: "var(--kc-bg)",
                    borderColor: "var(--kc-border)",
                    color: "var(--kc-text)",
                  }}
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold">
                  Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={selectedEvent.image || ""}
                  onChange={handleChange}
                  className="w-full rounded-xl border p-3 outline-none"
                  style={{
                    background: "var(--kc-bg)",
                    borderColor: "var(--kc-border)",
                    color: "var(--kc-text)",
                  }}
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold">
                  Description
                </label>
                <textarea
                  name="description"
                  value={selectedEvent.description || ""}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full rounded-xl border p-3 outline-none"
                  style={{
                    background: "var(--kc-bg)",
                    borderColor: "var(--kc-border)",
                    color: "var(--kc-text)",
                  }}
                />
              </div>

              <div className="flex flex-col gap-3 pt-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setSelectedEvent(null)}
                  className="flex-1 rounded-xl border px-5 py-3 font-semibold"
                  style={{ borderColor: "var(--kc-border)" }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 rounded-xl bg-[#35213B] px-5 py-3 font-semibold text-white transition hover:bg-[#4D8C83] disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
