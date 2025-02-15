const features = [
  {
    title: "Task Management",
    description: "Create, track, and organize your tasks.",
    icon: "📝",
  },
  {
    title: "Project Organization",
    description: "Group tasks into projects for better clarity.",
    icon: "📁",
  },
  {
    title: "Priority Levels",
    description: "Set priorities to focus on what matters.",
    icon: "🎯",
  },
  {
    title: "Calendar View",
    description: "Visualize your deadlines effectively.",
    icon: "📅",
  },
];

export default function Features() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Features</h2>
        <p className="mt-4 text-lg text-gray-600">
          Everything you need to stay productive.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map(({ title, description, icon }) => (
            <div
              key={title}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <div className="text-3xl">{icon}</div>
              <h3 className="text-xl font-semibold mt-4">{title}</h3>
              <p className="text-gray-600 mt-2">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
