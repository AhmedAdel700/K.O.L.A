"use client";

import { useLocale } from "next-intl";

const executionSteps = [
  {
    number: "01",
    title: "Site Survey & BOQ",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-9 h-9">
        <path d="M6 34L14 26M14 26L20 32M14 26L24 16M34 6L24 16M24 16L30 22" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="8" cy="32" r="3" />
        <circle cx="32" cy="8" r="3" />
        <path d="M22 8h10v10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Design Approval",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-9 h-9">
        <rect x="7" y="5" width="24" height="30" rx="2" />
        <path d="M13 13h14M13 19h14M13 25h8" strokeLinecap="round" />
        <path d="M24 27l2.5 2.5 5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Execution Phase",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-9 h-9">
        <path d="M20 6v5M20 29v5M6 20h5M29 20h5" strokeLinecap="round" />
        <circle cx="20" cy="20" r="6" />
        <path d="M11 11l3 3M26 26l3 3M11 29l3-3M26 14l3-3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Final Inspection & Handover",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-9 h-9">
        <circle cx="20" cy="20" r="14" />
        <path d="M13 20l4.5 4.5L27 14" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function StepByStepExecution() {
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <div className="pt-24 pb-32">
      <div className="mb-20 text-center">
        <div className="ep-label inline-flex items-center gap-4 mb-5">
          <div className="w-10 h-px"/>
          <span className="text-xs font-bold tracking-[0.35em] uppercase" style={{ color: "#c9a750" }}>Our Process</span>
          <div className="w-10 h-px" />
        </div>
        <h2 className="ep-title text-6xl md:text-8xl font-bold leading-[0.95] tracking-tight mb-6 uppercase" style={{ color: "#e6d5c0" }}>
          Step-by-Step{" "}
          <span className="italic" style={{ background: "linear-gradient(135deg, #c9a750 0%, #b2913c 50%, #8c6d3b 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Execution
          </span>
        </h2>
        <div className="ep-divider h-px w-40 mx-auto" style={{ background: "linear-gradient(to right, transparent, #c9a750, transparent)" }} />
      </div>

      {/* Desktop */}
      <div className="exec-steps hidden lg:block">
        <div className="relative flex items-start">
          {executionSteps.map((step, i) => (
            <div key={i} className="relative flex items-center flex-1 min-w-0">
              <div className="exec-card flex flex-col items-center text-center flex-1 min-w-0 px-4">
                <div className="relative mb-8">
                  <div className="absolute rounded-full border" style={{ inset: "-18px", borderColor: "rgba(201,167,80,0.12)" }} />
                  <div className="absolute rounded-full border" style={{ inset: "-8px", borderColor: "rgba(201,167,80,0.28)" }} />
                  <div className="relative w-24 h-24 rounded-full flex items-center justify-center"
                    style={{ border: "1.5px solid rgba(201,167,80,0.8)", background: "linear-gradient(135deg, rgba(201,167,80,0.12), rgba(140,109,59,0.06))", boxShadow: "0 0 40px rgba(201,167,80,0.18), inset 0 0 20px rgba(201,167,80,0.05)" }}>
                    <div style={{ color: "#c9a750" }}>{step.icon}</div>
                  </div>
                  <div className="absolute -top-1.5 -right-1.5 w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: "#171410", border: "1px solid rgba(201,167,80,0.8)" }}>
                    <span className="text-[9px] font-black tabular-nums" style={{ color: "#c9a750" }}>{step.number}</span>
                  </div>
                </div>
                <h3 className="text-sm font-semibold leading-snug max-w-[140px]" style={{ color: "#e6d5c0" }}>{step.title}</h3>
                <div className="mt-3 h-px" style={{ width: "40px", background: "#c9a750" }} />
              </div>
              {i < executionSteps.length - 1 && (
                <div className={`exec-connector flex-shrink-0 flex items-center ${isRtl ? 'scale-x-[-1]' : ''}`} style={{ marginTop: "-60px", width: "80px" }}>
                  <svg width="80" height="48" viewBox="0 0 80 48" fill="none" style={{ overflow: "visible" }}>
                    <defs>
                      <linearGradient id={`cg${i}`} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#c9a750" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#c9a750" stopOpacity="0.2" />
                      </linearGradient>
                    </defs>
                    <path d="M0 24 C18 24, 18 36, 40 36 C62 36, 62 24, 80 24" stroke={`url(#cg${i})`} strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round" fill="none" />
                    <path d="M73 20 L80 24 L73 28" stroke="#c9a750" strokeOpacity="0.55" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile */}
      <div className="lg:hidden flex flex-col gap-0">
        {executionSteps.map((step, i) => (
          <div key={i}>
            <div className="rounded-2xl border overflow-hidden"
              style={{ borderColor: "rgba(201,167,80,0.55)", background: "linear-gradient(135deg, rgba(201,167,80,0.08), rgba(23,20,16,0.7))" }}>
              <div className="h-[2px]" style={{ background: "linear-gradient(to right, #c9a750, transparent)" }} />
              <div className="flex items-center gap-5 p-5">
                <div className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ border: "1.5px solid rgba(201,167,80,0.7)", background: "linear-gradient(135deg, rgba(201,167,80,0.10), rgba(140,109,59,0.04))", boxShadow: "0 0 20px rgba(201,167,80,0.12)", color: "#c9a750" }}>
                  {step.icon}
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-black tracking-[0.3em] uppercase block mb-1" style={{ color: "#c9a750" }}>Step {step.number}</span>
                  <h3 className="text-base font-semibold" style={{ color: "#e6d5c0" }}>{step.title}</h3>
                </div>
              </div>
            </div>
            {i < executionSteps.length - 1 && (
              <div className="flex justify-start pl-8" style={{ height: 48 }}>
                <svg width="120" height="48" viewBox="0 0 120 48" fill="none" className={isRtl ? 'scale-x-[-1]' : ''}>
                  <defs>
                    <linearGradient id={`mg${i}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#c9a750" stopOpacity="0.55" />
                      <stop offset="100%" stopColor="#c9a750" stopOpacity="0.12" />
                    </linearGradient>
                  </defs>
                  {i % 2 === 0 ? (
                    <>
                      <path d="M16 0 C16 24, 80 24, 80 48" stroke={`url(#mg${i})`} strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round" fill="none" />
                      <path d="M75 42 L80 48 L85 42" stroke="#c9a750" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </>
                  ) : (
                    <>
                      <path d="M80 0 C80 24, 16 24, 16 48" stroke={`url(#mg${i})`} strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round" fill="none" />
                      <path d="M11 42 L16 48 L21 42" stroke="#c9a750" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </>
                  )}
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
