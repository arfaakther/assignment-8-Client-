
"use client";
import { toast } from "react-toastify";
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
      method: joined ? "DELETE" : "POST",
    });

    const data = await res.json();

    if (res.status === 401) {
      toast.error("Please log in to join this event.");
      return;
    }

    if (!res.ok) {
      toast.error(data.message || "Something went wrong!");
      return;
    }

    setJoined(!joined);

    if (joined) {
      toast.error("You left the event successfully!");
    } else {
      toast.success("You joined the event successfully! 🎉");
    }

  } catch (error) {
    console.error(error);
    toast.error("Something went wrong!");
  } finally {
    setJoining(false);
  }
};

  return (
    <button
      onClick={handleJoin}
      disabled={loading || joining}
      className={`flex shrink-0 items-center justify-center gap-2 rounded-xl px-7 py-4 font-bold text-white shadow-md transition ${
        joined
          ? "bg-[#4D8C83] hover:bg-red-500"
          : "bg-[#0D9488] hover:-translate-y-0.5 hover:bg-[#4D8C83]"
      } disabled:cursor-not-allowed disabled:opacity-70`}
    >
      {loading
        ? "Checking..."
        : joining
        ? "Please wait..."
        : joined
        ? "✓ Joined (Leave)"
        : "♡ Join Event"}
    </button>
  );
};

export default JoinEventButton;
