
import Link from "next/link";


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
      

      {/* Hero Section */}
      <section className="bg-orange-50 py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
              Together We Can
              <span className="text-orange-500"> Make A Difference</span>
            </h1>

            <p className="text-gray-600 mt-5 leading-7">
              Join our charity events, help people in need, and
              spread kindness in your community.
            </p>

            <Link
              href="#events"
              className="btn bg-orange-500 text-white border-none hover:bg-orange-600 mt-7"
            >
              Explore Events
            </Link>
          </div>

          <div className="flex-1">
            <img
              src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=900"
              alt="People helping each other"
              className="rounded-2xl w-full h-80 object-cover"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          About Our Mission
        </h2>

        <p className="max-w-2xl mx-auto text-gray-600 mt-5 leading-7">
          Our mission is to bring people together and support
          those who need help. Every small contribution can
          create a big change.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mt-10">
          <div className="bg-orange-50 p-6 rounded-xl">
            <h3 className="text-3xl font-bold text-orange-500">500+</h3>
            <p className="text-gray-600 mt-2">Volunteers</p>
          </div>

          <div className="bg-orange-50 p-6 rounded-xl">
            <h3 className="text-3xl font-bold text-orange-500">25+</h3>
            <p className="text-gray-600 mt-2">Events</p>
          </div>

          <div className="bg-orange-50 p-6 rounded-xl">
            <h3 className="text-3xl font-bold text-orange-500">1000+</h3>
            <p className="text-gray-600 mt-2">People Helped</p>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">
              Upcoming Events
            </h2>
            <p className="text-gray-500 mt-3">
              Be a part of something meaningful.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {events.map((event) => (
              <div
                key={event.title}
                className="card bg-white shadow-md overflow-hidden"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />

                <div className="card-body">
                  <h3 className="card-title text-gray-800">
                    {event.title}
                  </h3>

                  <p className="text-gray-600">
                    {event.description}
                  </p>

                  <p className="text-orange-500 font-semibold text-sm">
                    {event.date}
                  </p>

                  <div className="card-actions mt-3">
                    <Link
                      href="#contact"
                      className="btn bg-orange-500 text-white border-none hover:bg-orange-600 w-full"
                    >
                      Join Event
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-orange-500 text-white text-center py-16 px-6">
        <h2 className="text-3xl font-bold">
          Be the Reason Someone Smiles!
        </h2>

        <p className="mt-4">
          Join our community and help us create a better tomorrow.
        </p>

        <Link
          href="#contact"
          className="btn bg-white text-orange-500 border-none hover:bg-gray-100 mt-6"
        >
          Become a Volunteer
        </Link>
      </section>

      
    </>
  );
}

