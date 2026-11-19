"use client";

import React, { useState } from "react";
// import EditEventModal from "./EditEventModal";

const ManageEventsPage = () => {
  const [events, setEvents] = useState([]);

  // ADD THIS HERE
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div>
      {/* Your existing event cards */}

      {events.map((event) => (
        <div key={event._id}>
          <h2>{event.title}</h2>

          <button onClick={() => setSelectedEvent(event)}>
            ✏️ Edit
          </button>
        </div>
      ))}

      {/* ADD THE MODAL HERE */}
      {selectedEvent && (
        <EditEventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onUpdated={() => window.location.reload()}
        />
      )}
    </div>
  );
};

export default ManageEventsPage;