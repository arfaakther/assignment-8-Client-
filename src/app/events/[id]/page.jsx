

import { Suspense } from "react";
import EventDetailsPage from "./EventDetails";

const EventDetails = ({ params }) => {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center">
          <p>Loading event details...</p>
        </main>
      }
    >
      <EventDetailsPage params={params} />
    </Suspense>
  );
};

export default EventDetails;


