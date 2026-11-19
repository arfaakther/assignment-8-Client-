
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";

const CreateEventPage = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
      const eventData = Object.fromEntries(formData.entries());
      
      console.log(eventData)

    try {
      setLoading(true);

      const res = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Event created successfully!");
        form.reset();
      } else {
        toast.error(result.message || "Failed to create event");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full rounded-xl border border-[var(--kc-border)] bg-[var(--kc-hover)] px-4 py-3 text-sm text-[var(--kc-text)] placeholder:text-[var(--kc-muted)] outline-none transition focus:border-[#4D8C83] focus:ring-2 focus:ring-[#4D8C83]/20";

  const labelStyle =
    "mb-2 block text-sm font-bold text-[var(--kc-primary)]";

  return (
    <div className="min-h-screen bg-[var(--kc-bg)] px-4 py-10 sm:px-6">

      {/* Back Link */}
      <div className="mx-auto mb-8 max-w-3xl">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--kc-muted)] transition hover:text-[#4D8C83]"
        >
          ← Back to Upcoming Events
        </Link>
      </div>

      {/* Form Card */}
      <div className="mx-auto max-w-3xl rounded-3xl border border-[var(--kc-border)] bg-[var(--kc-bg)] p-6 shadow-xl sm:p-10">

        {/* Header */}
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#4D8C83]/10 px-4 py-2 text-sm font-semibold text-[#4D8C83]">
            ✨ Social Service Drive
          </span>

          <h1 className="mt-4 text-3xl font-extrabold text-[var(--kc-primary)] sm:text-4xl">
            Create a Community Event
          </h1>

          <p className="mt-3 text-sm leading-7 text-[var(--kc-muted)] sm:text-base">
            Organize a local relief effort, environmental cleanup, or community support drive.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-7">

          {/* Event Title */}
          <div>
            <label className={labelStyle}>
              Event Title <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              name="title"
              required
              placeholder="e.g. Winter Clothes Distribution – Mirpur 10, Dhaka"
              className={inputStyle}
            />
          </div>

          {/* Event Type & Date */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

            {/* Event Type */}
            <div>
              <label className={labelStyle}>
                Event Type <span className="text-red-500">*</span>
              </label>

              <select
                name="eventType"
                required
                defaultValue=""
                className={inputStyle}
              >
                <option value="" disabled>
                  Select event type
                </option>
                <option value="Donation">Donation</option>
                <option value="Cleanup">Cleanup</option>
                <option value="Education">Education</option>
                <option value="Health">Health</option>
                <option value="Food Distribution">Food Distribution</option>
                <option value="Tree Plantation">Tree Plantation</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Event Date */}
            <div>
              <label className={labelStyle}>
                Event Date <span className="text-red-500">*</span>
              </label>

              <input
                type="date"
                name="date"
                required
                min={new Date().toISOString().split("T")[0]}
                className={inputStyle}
              />

              <p className="mt-2 text-xs text-[var(--kc-muted)]">
                Dates must be in the future (today or later).
              </p>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className={labelStyle}>
              Location / Venue <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              name="location"
              required
              placeholder="e.g. Mohammadpur Town Hall, Dhaka"
              className={inputStyle}
            />
          </div>

          {/* Thumbnail Image URL */}
          <div>
            <label className={labelStyle}>
              Thumbnail Image URL <span className="text-red-500">*</span>
            </label>

            <input
              type="url"
              name="image"
              required
              placeholder="https://images.unsplash.com/photo-..."
              className={inputStyle}
            />

            {/* Quick Presets */}
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-[var(--kc-muted)]">
              <span>Quick photo presets:</span>

              <button type="button" className="text-[#4D8C83] hover:underline">
                Winter Clothes
              </button>

              <span>•</span>

              <button type="button" className="text-[#4D8C83] hover:underline">
                Blanket Relief
              </button>

              <span>•</span>

              <button type="button" className="text-[#4D8C83] hover:underline">
                Cleanup
              </button>

              <span>•</span>

              <button type="button" className="text-[#4D8C83] hover:underline">
                Tree Plantation
              </button>
            </div>
          </div>

          {/* Event Description */}
          <div>
            <label className={labelStyle}>
              Event Description <span className="text-red-500">*</span>
            </label>

            <textarea
              name="description"
              required
              rows="5"
              placeholder="Explain the purpose of the drive, volunteers required, items being distributed or tasks to complete..."
              className={`${inputStyle} resize-y leading-7`}
            />
          </div>

          {/* Organizer Email */}
          <div className="flex flex-col gap-3 rounded-2xl border border-[var(--kc-border)] bg-[var(--kc-hover)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm text-[var(--kc-muted)]">
              Organizer Email attached:
            </span>

            <input
              type="email"
              name="organizerEmail"
              required
              placeholder="Enter organizer email"
              className={`${inputStyle} sm:max-w-xs`}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0D9488] px-6 py-4 font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#4D8C83] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Publishing Event..." : "⊕ Publish Event"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateEventPage;

