"use client";

const standardsList = [
  {
    title: "Executive Site Assessment & Strategic Planning",
    desc: "Comprehensive site evaluation and strategic roadmap development to align with project goals.",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-5 h-5">
        <path d="M4 14h20M14 4v20" strokeLinecap="round" />
        <circle cx="14" cy="14" r="3" />
        <path d="M14 4l3 3M14 4l-3 3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Scope Definition & Budget Structuring",
    desc: "Detailed scope mapping and transparent financial framework for predictable cost management.",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-5 h-5">
        <circle cx="14" cy="9" r="4" />
        <path d="M6 24c0-4.4 3.6-8 8-8s8 3.6 8 8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Technical Documentation & Compliance Review",
    desc: "Rigorous technical planning and compliance auditing to ensure operational readiness.",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-5 h-5">
        <rect x="3" y="5" width="22" height="18" rx="2" />
        <path d="M3 10h22" />
        <path d="M8 15h4M8 19h4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Supervised Execution with Milestone Tracking",
    desc: "Disciplined project oversight with real-time milestone monitoring for deadline protection.",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-5 h-5">
        <path d="M14 3l11 19H3L14 3z" />
        <path d="M14 11v5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Formal Handover & Operational Readiness Review",
    desc: "Structured final approval process ensuring the space is fully ready for its intended use.",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-5 h-5">
        <path d="M6 7h10a2 2 0 012 2v10l-4-3H6a2 2 0 01-2-2V9a2 2 0 012-2z" />
        <path d="M10 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];


export default function ExecutionStandard() {
  return (
    <div className="pt-24 pb-24 relative">
      {/* Header */}
      <div className="mb-20 text-center">
        <div className="std-label inline-block mb-5">
          <span className="text-xs font-bold tracking-[0.35em] uppercase" style={{ color: "#c9a750" }}>Standards</span>
          <div className="std-header-line h-0.5 w-full mt-2 bg-gradient-to-r from-transparent via-[#c9a750] to-transparent"></div>
        </div>
        <h2 className="std-title text-6xl md:text-8xl font-bold leading-[1] tracking-tight text-[#e6d5c0] uppercase">
          Our{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c9a750] via-[#b2913c] to-[#8c6d3b]">
            Execution
          </span>{" "}
          Standard
        </h2>
      </div>

      {/* Vertical Timeline/Stepper Layout */}
      <div className="relative space-y-12 std-list">
        {/* Central Vertical Line */}
        <div className="std-timeline absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#c9a750] via-[#c9a750]/20 to-transparent -translate-x-1/2 pointer-events-none"></div>

        {standardsList.map((item, i) => (
          <div key={i} className={`std-item group relative flex flex-col lg:flex-row items-center lg:items-center gap-8 ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
            
            {/* Number/Icon Node */}
            <div className="relative z-10 w-16 h-16 flex-shrink-0 flex items-center justify-center rounded-2xl bg-[#171410] border-2 border-[#c9a750] shadow-[0_0_20px_rgba(201,167,80,0.2)] transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(201,167,80,0.4)]">
               <span className="absolute -top-6 text-xs font-bold text-[#c9a750] tracking-widest">{String(i + 1).padStart(2, "0")}</span>
               <div className="text-[#c9a750]">{item.icon}</div>
            </div>

            {/* Content Card */}
            <div className={`flex-1 p-8 rounded-3xl bg-gradient-to-br from-[#171410] to-[#252119] border border-[#c9a750]/10 hover:border-[#c9a750]/40 transition-all duration-500 lg:w-[45%] text-center ${i % 2 !== 0 ? 'lg:text-right' : 'lg:text-left'}`}>
              <h3 className="text-xl md:text-3xl font-bold text-[#e6d5c0] mb-4 text-start">
                {item.title}
              </h3>
              <p className="text-[#e6d5c0]/60 text-base md:text-lg text-start leading-relaxed max-w-lg mx-auto lg:mx-0 ${i % 2 !== 0 ? 'lg:ml-auto' : ''}">
                {item.desc}
              </p>
              
              {/* Decorative detail */}
              <div className={`mt-6 h-1 w-12 bg-[#c9a750] group-hover:w-full transition-all duration-700 mx-auto ${i % 2 !== 0 ? 'lg:ml-auto' : 'lg:mr-auto'}`}></div>
            </div>

            {/* Empty space for alternating layout */}
            <div className="hidden lg:block lg:w-[45%]"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
