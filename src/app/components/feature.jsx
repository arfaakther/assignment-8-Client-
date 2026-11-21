
const features = [
  {
    icon: "🤝",
    title: "Community-Led Events",
    description:
      "Create meaningful gatherings, community activities, and local initiatives that bring people together.",
    number: "01",
  },
  {
    icon: "📅",
    title: "Easy Participation",
    description:
      "Join exciting events with just a few clicks and connect with people who share your interests.",
    number: "02",
  },
  {
    icon: "🛡️",
    title: "Event Management",
    description:
      "Create, update, and manage your events easily while keeping track of your participants.",
    number: "03",
  },
  {
    icon: "🌱",
    title: "Grow Together",
    description:
      "Discover new opportunities, build friendships, and make a positive difference in your community.",
    number: "04",
  },
];

const Features = () => {
  return (
    <section className="bg-[var(--kc-hover)] px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">

        {/* Left Introduction */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-[2px] w-10 bg-[#D77D5B]"></span>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#4D8060]">
                What makes us different
              </p>
            </div>

            <h2 className="max-w-lg text-4xl font-black leading-tight tracking-tight text-[var(--kc-text)] sm:text-5xl lg:text-6xl">
              More than
              <span className="block italic text-[#4D8060]">
                just events.
              </span>
              A place to belong.
            </h2>

            <p className="mt-6 max-w-md text-base leading-8 text-[var(--kc-muted)]">
              A simple platform to bring people together, discover local
              activities, and make a positive impact in your community.
            </p>
          </div>

          {/* Decorative Statement */}
          <div className="mt-10 hidden max-w-sm border-l-4 border-[#D77D5B] pl-5 lg:block">
            <p className="text-xl font-bold leading-relaxed text-[var(--kc-text)]">
              "Great things happen when people come together."
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-[var(--kc-muted)]">
              The Kindred Circle idea
            </p>
          </div>

          <div className="mt-8 flex items-center gap-3 lg:hidden">
            <span className="text-3xl text-[#D77D5B]">✳</span>
            <p className="text-sm font-semibold text-[var(--kc-muted)]">
              Great things happen when people come together.
            </p>
          </div>
        </div>

        {/* Right Feature List */}
        <div className="divide-y divide-[var(--kc-border)] border-y border-[var(--kc-border)]">
          {features.map((feature) => (
            <div
              key={feature.number}
              className="group grid grid-cols-[45px_48px_1fr] items-start gap-3 py-7 transition-all duration-300 sm:grid-cols-[55px_60px_1fr] sm:gap-5 sm:py-9"
            >
              {/* Number */}
              <span className="pt-2 text-xs font-bold tracking-widest text-[#D77D5B]">
                {feature.number}
              </span>

              {/* Icon */}
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--kc-bg)] text-2xl shadow-sm transition duration-300 group-hover:-rotate-6 group-hover:scale-110 sm:h-14 sm:w-14">
                {feature.icon}
              </div>

              {/* Content */}
              <div>
                <h3 className="text-lg font-extrabold text-[var(--kc-text)] transition-colors duration-300 group-hover:text-[#4D8060] sm:text-xl">
                  {feature.title}
                </h3>

                <p className="mt-2 max-w-lg text-sm leading-7 text-[var(--kc-muted)] sm:text-base">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;
