
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

    console.log(eventData);

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
    "w-full rounded-xl border border-[var(--kc-border)] bg-[var(--kc-hover)] px-4 py-3.5 text-sm text-[var(--kc-text)] placeholder:text-[var(--kc-muted)] outline-none transition focus:border-[var(--kc-primary)] focus:ring-2 focus:ring-[var(--kc-primary)]/15";

  const labelStyle =
    "mb-2.5 block text-sm font-bold text-[var(--kc-text)]";

  const sectionStyle =
    "border-b border-[var(--kc-border)] pb-8";

  return (
    <main className="min-h-screen bg-[var(--kc-bg)] px-4 py-8 text-[var(--kc-text)] transition-colors duration-300 sm:px-6 lg:px-10 lg:py-12">

      <div className="mx-auto max-w-7xl">

        {/* Back Navigation */}
        <Link
          href="/events"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--kc-muted)] transition hover:text-[var(--kc-primary)]"
        >
          <span>←</span>
          Back to Upcoming Events
        </Link>

        <div className="grid items-start gap-8 lg:grid-cols-[0.75fr_1.25fr]">

          {/* LEFT EDITORIAL PANEL */}
          <aside className="relative overflow-hidden rounded-[2rem] bg-[#244C3A] p-8 text-[#F8F7F0] sm:p-10 lg:sticky lg:top-8 lg:min-h-[680px] lg:p-12">

            {/* Decorations */}
            <div className="absolute -right-24 -top-20 h-72 w-72 rounded-full border border-white/15" />
            <div className="absolute -right-12 -top-8 h-48 w-48 rounded-full border border-white/10" />
            <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-[#D5E7A1]/10" />

            <div className="relative z-10 flex h-full flex-col justify-between gap-16">

              <div>
                <Link
                  href="/"
                  className="text-2xl font-black tracking-tight"
                >
                  Kindred<span className="text-[#D5E7A1]">.</span>
                </Link>

                <p className="mt-2 text-xs uppercase tracking-[0.25em] text-white/55">
                  Good things grow together
                </p>
              </div>

              <div>
                <span className="inline-flex rounded-full border border-[#D5E7A1]/30 bg-[#D5E7A1]/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#D5E7A1]">
                  ✳ Create something meaningful
                </span>

                <h1 className="mt-8 text-4xl font-black leading-[1.12] tracking-tight sm:text-5xl">
                  Every good
                  <span className="block font-serif font-normal italic text-[#D5E7A1]">
                    change starts
                  </span>
                  with an idea.
                </h1>

                <p className="mt-6 max-w-md text-sm leading-8 text-white/70 sm:text-base">
                  Bring people together around a shared purpose.
                  Create an event, invite your community, and make
                  a difference one small action at a time.
                </p>

                {/* Steps */}
                <div className="mt-12 space-y-6">

                  <div className="flex items-center gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D5E7A1] text-sm font-black text-[#244C3A]">
                      01
                    </span>
                    <div>
                      <p className="font-bold">Share your idea</p>
                      <p className="mt-1 text-xs text-white/55">
                        Give your event a name and purpose.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 text-sm font-bold">
                      02
                    </span>
                    <div>
                      <p className="font-bold">Set the details</p>
                      <p className="mt-1 text-xs text-white/55">
                        Choose a date, location, and category.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 text-sm font-bold">
                      03
                    </span>
                    <div>
                      <p className="font-bold">Bring people together</p>
                      <p className="mt-1 text-xs text-white/55">
                        Publish your event and welcome volunteers.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              <div className="border-t border-white/20 pt-6">
                <p className="font-serif text-lg italic text-[#D5E7A1]">
                  "Small acts, when multiplied by millions of people,
                  can transform the world."
                </p>

                <p className="mt-4 text-xs uppercase tracking-widest text-white/40">
                  Kindred Circle Community
                </p>
              </div>

            </div>
          </aside>

          {/* RIGHT FORM PANEL */}
          <section className="rounded-[2rem] border border-[var(--kc-border)] bg-[var(--kc-bg)] p-5 shadow-sm sm:p-8 lg:p-10">

            {/* Form Header */}
            <div className="mb-10">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--kc-primary)]">
                Community / New event
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                Create an event<span className="text-[#D77D5B]">.</span>
              </h2>

              <p className="mt-3 max-w-lg text-sm leading-7 text-[var(--kc-muted)]">
                Fill in the details below to introduce your event
                to the Kindred Circle community.
              </p>

              <div className="mt-7 flex items-center gap-3">
                <div className="h-1.5 flex-1 rounded-full bg-[#244C3A]" />
                <div className="h-1.5 flex-1 rounded-full bg-[#A8BDA3]/40" />
                <div className="h-1.5 flex-1 rounded-full bg-[#A8BDA3]/40" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">

              {/* SECTION 01 */}
              <div className={sectionStyle}>

                <div className="mb-6 flex items-center gap-3">
                  <span className="text-xs font-black tracking-widest text-[#D77D5B]">
                    01
                  </span>
                  <h3 className="text-lg font-bold">
                    The event basics
                  </h3>
                </div>

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
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">

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
                      Choose today or a future date.
                    </p>
                  </div>

                </div>
              </div>

              {/* SECTION 02 */}
              <div className={sectionStyle}>

                <div className="mb-6 flex items-center gap-3">
                  <span className="text-xs font-black tracking-widest text-[#D77D5B]">
                    02
                  </span>
                  <h3 className="text-lg font-bold">
                    Where it happens
                  </h3>
                </div>

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

              </div>

              {/* SECTION 03 */}
              <div className={sectionStyle}>

                <div className="mb-6 flex items-center gap-3">
                  <span className="text-xs font-black tracking-widest text-[#D77D5B]">
                    03
                  </span>
                  <h3 className="text-lg font-bold">
                    Tell your story
                  </h3>
                </div>

                {/* Thumbnail */}
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

                  <div className="mt-4 rounded-xl bg-[var(--kc-hover)] p-4">
                    <p className="text-xs font-bold text-[var(--kc-text)]">
                      PHOTO INSPIRATION
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-[var(--kc-muted)]">
                      <span>Winter Clothes</span>
                      <span className="text-[#D77D5B]">•</span>
                      <span>Blanket Relief</span>
                      <span className="text-[#D77D5B]">•</span>
                      <span>Cleanup</span>
                      <span className="text-[#D77D5B]">•</span>
                      <span>Tree Plantation</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-6">
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

              </div>

              {/* SECTION 04 */}
              <div>

                <div className="mb-6 flex items-center gap-3">
                  <span className="text-xs font-black tracking-widest text-[#D77D5B]">
                    04
                  </span>
                  <h3 className="text-lg font-bold">
                    Organizer information
                  </h3>
                </div>

                <div className="rounded-2xl border border-[var(--kc-border)] bg-[var(--kc-hover)] p-5">

                  <label className={labelStyle}>
                    Organizer Email <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="email"
                    name="organizerEmail"
                    required
                    placeholder="Enter organizer email"
                    className="w-full rounded-xl border border-[var(--kc-border)] bg-[var(--kc-bg)] px-4 py-3.5 text-sm text-[var(--kc-text)] outline-none transition placeholder:text-[var(--kc-muted)] focus:border-[var(--kc-primary)] focus:ring-2 focus:ring-[var(--kc-primary)]/15"
                  />

                  <p className="mt-3 text-xs leading-5 text-[var(--kc-muted)]">
                    Participants can use this email to contact the event organizer.
                  </p>

                </div>

              </div>

              {/* Submit */}
              <div className="pt-2">

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#244C3A] px-6 py-4 font-bold text-white shadow-md transition duration-300 hover:-translate-y-0.5 hover:bg-[#315E48] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Publishing Event..." : "Publish Community Event"}

                  {!loading && (
                    <span className="text-lg transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  )}
                </button>

                <p className="mt-4 text-center text-xs leading-6 text-[var(--kc-muted)]">
                  By publishing, you're helping bring your community together. 🌿
                </p>

              </div>

            </form>
          </section>

        </div>
      </div>
    </main>
  );
};

export default CreateEventPage;


