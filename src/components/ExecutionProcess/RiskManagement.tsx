"use client";

const riskItems = [
  {
    title: "Daily Site Supervision",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-6 h-6">
        <circle cx="16" cy="16" r="11" />
        <path d="M16 9v7l4 4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 6l2.5 2.5M23.5 6L26 8.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Budget Tracking System",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-6 h-6">
        <rect x="4" y="6" width="24" height="20" rx="2" />
        <path d="M4 11h24" />
        <path d="M10 16h4M10 20h4M18 16h4M18 20h4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Material Approval Before Installation",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-6 h-6">
        <path d="M16 4l10 5v9c0 5-10 10-10 10S6 23 6 18V9l10-5z" />
        <path d="M11 16l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Weekly Client Updates",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-6 h-6">
        <path d="M26 6H6a2 2 0 00-2 2v14l4-4h18a2 2 0 002-2V8a2 2 0 00-2-2z" />
        <path d="M10 13h12M10 17h7" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function RiskManagement() {
  return (
    <div className="pt-20 pb-24">
      <div className="mb-14 text-center">
        <div className="risk-label inline-block mb-5">
          <span className="text-xs font-bold tracking-[0.35em] uppercase" style={{ color: "#c9a750" }}>Risk Management</span>
          <div className="risk-header-line h-0.5 w-full mt-2" style={{ background: "linear-gradient(to right, transparent, #c9a750, transparent)" }}></div>
        </div>
        <h2 className="risk-title text-6xl md:text-8xl font-bold leading-[0.95] tracking-tight uppercase" style={{ color: "#e6d5c0" }}>
          How We Control{" "}
          <span className="italic" style={{ background: "linear-gradient(135deg, #c9a750 0%, #b2913c 50%, #8c6d3b 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Project Risks
          </span>
        </h2>
      </div>

      <div className="risk-grid grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {riskItems.map((item, i) => (
          <div key={i} className="risk-card group relative rounded-2xl border overflow-hidden"
            style={{ borderColor: "rgba(201,167,80,0.22)", background: "linear-gradient(145deg, rgba(201,167,80,0.06) 0%, rgba(23,20,16,0.5) 100%)" }}>
            <div className="h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700"
              style={{ background: "linear-gradient(to right, #c9a750, #8c6d3b)" }} />
            <div className="p-7 flex flex-col gap-5">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-500 group-hover:border-[rgba(201,167,80,0.6)] group-hover:bg-[rgba(201,167,80,0.08)]"
                  style={{ borderColor: "rgba(201,167,80,0.2)", color: "#c9a750", background: "rgba(201,167,80,0.04)" }}>
                  {item.icon}
                </div>
                <span className="text-5xl font-bold leading-none select-none"
                  style={{ background: "linear-gradient(135deg, rgba(201,167,80,0.18), rgba(140,109,59,0.08))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-base font-semibold leading-snug transition-colors duration-500 group-hover:opacity-100"
                style={{ color: "#e6d5c0", opacity: 0.75 }}>
                {item.title}
              </h3>
              <div className="h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 mt-1"
                style={{ background: "linear-gradient(to right, rgba(201,167,80,0.45), transparent)" }} />
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{ background: "radial-gradient(ellipse at 30% 0%, rgba(201,167,80,0.07) 0%, transparent 70%)" }} />
          </div>
        ))}
      </div>
    </div>
  );
}
