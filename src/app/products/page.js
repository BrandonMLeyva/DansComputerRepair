export const metadata = {
  title: "Services | Dan's Computer Repair",
  description: "Explore the repair and IT services offered by Dan's Computer Repair.",
};

export default function ProductsPage() {
  const services = [
    {
      title: "PC and Mac diagnostics",
      description:
        "Full hardware and software checks to pinpoint slowdowns, crashes, or boot issues.",
    },
    {
      title: "Virus and malware removal",
      description:
        "Deep scans and cleanup with security hardening so infections don’t return.",
    },
    {
      title: "Hardware upgrades (RAM, SSD, GPU)",
      description:
        "Performance boosts with quality parts, installed and tested for stability.",
    },
    {
      title: "Data backup and recovery",
      description:
        "Recover lost files when possible and set up reliable backups for peace of mind.",
    },
    {
      title: "Network setup and troubleshooting",
      description:
        "Wi-Fi optimization, printer sharing, and resolving connectivity or speed issues.",
    },
    {
      title: "Custom PC builds",
      description:
        "Personalized builds for gaming, creative work, or business, tuned for your budget.",
    },
  ];

  const steps = [
    "Tell us what you need repaired or built.",
    "Schedule drop-off or on-site support.",
    "Receive a clear estimate.",
    "We repair, test, and verify your device.",
    "Pick up or delivery with post-service guidance.",
  ];

  return (
    <main className="bg-white text-gray-800">
      <section className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-[1.2fr,1fr] md:items-start">
          <div className="space-y-6">
            <h1 className="text-3xl font-semibold tracking-tight text-pink-800 sm:text-4xl">
              Computer Repair & IT Services
            </h1>
            <p className="text-lg leading-relaxed text-gray-700">
              Reliable, transparent service for laptops, desktops, and custom builds.
              We diagnose issues quickly, explain your options, and keep you updated
              at every step. Reach out any time to discuss your device or project.
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-gray-200 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:border-pink-300">
                <h2 className="text-2xl font-semibold text-pink-800">Services</h2>
                <div className="mt-4 space-y-4">
                  {services.map(({ title, description }) => (
                    <div key={title} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-pink-700" />
                      <div className="space-y-1 leading-relaxed">
                        <p className="font-semibold">{title}</p>
                        <p className="text-gray-700">{description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-gray-200 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:border-pink-300">
                <h3 className="text-2xl font-semibold text-pink-800">Service Steps</h3>
                <ol className="mt-4 space-y-3 text-gray-700">
                  {steps.map((step, idx) => (
                    <li key={step} className="flex gap-3">
                      <span className="font-semibold text-pink-700">{idx + 1}.</span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-xl border border-gray-200 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:border-pink-300">
              <h2 className="text-2xl font-semibold text-pink-800">
                Unsure of what you need?
              </h2>
              <p className="mt-3 text-gray-700 leading-relaxed">
                Describe your issue and we&apos;ll recommend the right service,
                timeline, and options to fit your budget.
              </p>
              <div className="mt-6">
                <a
                  href="/service-request"
                  className="inline-flex w-full items-center justify-center rounded-md border border-pink-600 px-4 py-3 text-pink-700 transition hover:bg-pink-600 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
                >
                  Start a Service Request
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
