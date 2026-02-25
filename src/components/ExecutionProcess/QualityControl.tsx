"use client";

const qualitySteps = [
  {
    number: "01",
    title: "Material Inspection",
    desc: "Every material is verified against specifications before it reaches the site.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-5 h-5">
        <circle cx="14" cy="14" r="8" />
        <path d="M20 20l6 6" strokeLinecap="round" />
        <path d="M11 14l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "On-Site Technical Supervision",
    desc: "Qualified engineers monitor every stage of installation in real time.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-5 h-5">
        <path d="M4 26l5-5m0 0l4 4m-4-4l7-7m0 0l4 4m-4-4l6-6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="25" cy="7" r="3" />
        <circle cx="5" cy="27" r="2" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Stage-by-Stage Approval",
    desc: "No phase proceeds until the prior stage is formally signed off.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-5 h-5">
        <rect x="4" y="5" width="24" height="22" rx="2" />
        <path d="M4 11h24" />
        <path d="M10 17l2 2 4-4M10 22h12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Final Snag List Before Handover",
    desc: "A comprehensive punch list is cleared before any handover is issued.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-5 h-5">
        <path d="M8 6h16a2 2 0 012 2v18l-4-3H8a2 2 0 01-2-2V8a2 2 0 012-2z" />
        <path d="M11 13l2 2 5-5M11 19h8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function QualityControl() {
  return (
    <div className="pt-24 pb-24 max-w-9xl mx-auto">
      <div className="mb-16 text-center">
        <div className="qc-label inline-flex items-center gap-4 mb-5">
          <div className="w-10 h-px" style={{ background: "#c9a750" }} />
          <span className="text-xs font-bold tracking-[0.35em] uppercase" style={{ color: "#c9a750" }}>Quality Control</span>
          <div className="w-10 h-px" style={{ background: "#c9a750" }} />
        </div>
        <h2 className="qc-title text-6xl md:text-8xl font-bold leading-[1.1] tracking-tight uppercase w-full" style={{ color: "#e6d5c0" }}>
          Our Quality{" "}
          <span className="italic" style={{ background: "linear-gradient(135deg, #c9a750 0%, #b2913c 50%, #8c6d3b 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Control Process
          </span>
        </h2>
      </div>

      <div className="qc-list grid grid-cols-1 md:grid-cols-2 gap-6">
        {qualitySteps.map((step, i) => (
          <div key={i} className="qc-row group relative p-px rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02]">
             {/* Gradient Border Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#c9a750]/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="relative h-full p-8 rounded-[1.4rem] bg-[#171410]/80 backdrop-blur-xl border border-[#c9a750]/10 flex flex-col gap-6">
             {/* Top: Icon & Number */}
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-[#c9a750]/20 bg-[#c9a750]/5 text-[#c9a750] group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#c9a750]/20 to-[#8c6d3b]/10 group-hover:from-[#c9a750]/40 group-hover:to-[#8c6d3b]/20 transition-all duration-700 leading-none">
                  {step.number}
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-2xl font-bold text-[#e6d5c0] mb-3 tracking-wide">
                  {step.title}
                </h3>
                <p className="text-[#e6d5c0]/60 text-base leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[#c9a750]/30 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
