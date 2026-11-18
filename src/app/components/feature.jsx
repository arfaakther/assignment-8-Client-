
const features = [
  {
    icon: "🤝",
    title: "Community-Led Events",
    description:
      "Create meaningful gatherings, community activities, and local initiatives that bring people together.",
    color: "#4D8C83",
  },
  {
    icon: "📅",
    title: "Easy Participation",
    description:
      "Join exciting events with just a few clicks and connect with people who share your interests.",
    color: "#7C3AED",
  },
  {
    icon: "🛡️",
    title: "Event Management",
    description:
      "Create, update, and manage your events easily while keeping track of your participants.",
    color: "#059669",
  },
  {
    icon: "🌱",
    title: "Grow Together",
    description:
      "Discover new opportunities, build friendships, and make a positive difference in your community.",
    color: "#F59E0B",
  },
];

const Features = () => {
  return (
    <section className="bg-[var(--kc-bg)] px-6 py-20 sm:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#4D8C83]">
            Platform Features
          </p>

          <h2 className="text-3xl font-extrabold text-[var(--kc-primary)] sm:text-4xl">
            Built for Meaningful Connections
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-[var(--kc-muted)]">
            A simple platform to bring people together, discover local
            activities, and make a positive impact in your community.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-2xl border border-[var(--kc-border)] bg-[var(--kc-bg)] p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Icon */}
              <div
                className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl text-2xl"
                style={{
                  backgroundColor: `${feature.color}15`,
                  color: feature.color,
                }}
              >
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-[var(--kc-primary)]">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-sm leading-7 text-[var(--kc-muted)]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;
