"use client";

import { useEffect, useState } from "react";

const JoinEventButton = ({ eventId }) => {
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    const checkJoined = async () => {
      try {
        const res = await fetch(`/api/events/${eventId}/join`);

        if (res.ok) {
          const data = await res.json();
          setJoined(data.joined);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    checkJoined();
  }, [eventId]);

  const handleJoin = async () => {
    try {
      setJoining(true);

      const res = await fetch(`/api/events/${eventId}/join`, {
        method: "POST",
      });

      const data = await res.json();

      if (res.status === 401) {
        alert("Please log in to join this event.");
        return;
      }

      if (!res.ok) {
        alert(data.message || "Could not join event.");
        return;
      }

      setJoined(true);
      alert("You successfully joined this event!");
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setJoining(false);
    }
  };

  return (
    <button
      onClick={handleJoin}
      disabled={loading || joining || joined}
      className={`flex shrink-0 items-center justify-center gap-2 rounded-xl px-7 py-4 font-bold text-white shadow-md transition ${
        joined
          ? "cursor-not-allowed bg-[#4D8C83]"
          : "bg-[#0D9488] hover:-translate-y-0.5 hover:bg-[#4D8C83]"
      } disabled:opacity-80`}
    >
      {loading
        ? "Checking..."
        : joining
        ? "Joining..."
        : joined
        ? "✓ Joined"
        : "♡ Join Event"}
    </button>
  );
};

export default JoinEventButton;