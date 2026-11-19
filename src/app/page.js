

import Banner from "./components/banner";
import Features from "./components/feature";
import UpcomingEvents from "./components/UpcomingEvents";
import CallToAction from "./components/CallToAction";


const events = [
  {
    title: "Food Distribution",
    description: "Help us provide food to families in need.",
    date: "November 20, 2026",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600",
  },
  {
    title: "Education for Children",
    description: "Support children's education and bright futures.",
    date: "November 25, 2026",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600",
  },
  {
    title: "Tree Plantation",
    description: "Join us to make our environment greener.",
    date: "December 5, 2026",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600",
  },
];

export default function Home() {
  return (
    <>
      <Banner></Banner>

      <Features></Features>
      <UpcomingEvents />
    <CallToAction />

      
    </>
  );
}

