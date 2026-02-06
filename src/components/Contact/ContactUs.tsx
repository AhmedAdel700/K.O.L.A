"use client";

import { useRef, useState } from "react";
import { z } from "zod";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// Zod validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function KoiaContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormData, string>>
  >({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 30%",
        end: "bottom 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Header Animation
    tl.from(".contact-header", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
    });

    // Header Line Animation - growing from center
    tl.from(
      ".contact-header-line",
      {
        scaleX: 0,
        transformOrigin: "center",
        duration: 1.2,
        ease: "power2.ininOut",
      },
      "-=0.4",
    );

    // Title Animation
    tl.from(
      ".contact-title",
      {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
      },
      "-=0.6",
    );

    // Description Animation
    tl.from(
      ".contact-description",
      {
        y: 15,
        opacity: 0,
        duration: 0.7,
        ease: "power2.inOut",
      },
      "-=0.5",
    );

    // Contact Info Cards (Left Side) and Form (Right Side) - simultaneous
    tl.from(
      ".contact-info-card",
      {
        x: -30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power2.inOut",
      },
      "-=0.3",
    );

    // Contact Form (Right Side) - starts at same time as cards
    tl.from(
      ".contact-form",
      {
        x: 30,
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
      },
      "-=1",
    );

    // Decorative Quote - comes in last
    tl.from(
      ".contact-quote",
      {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
      },
      "-=0.7",
    );
  }, { scope: sectionRef });


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Validate form data
      const validatedData = contactSchema.parse(formData);

      // Console log the validated data
      console.log("Form Data Submitted:", validatedData);
      // Success
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });

    } catch (error) {
      if (error instanceof z.ZodError) {
        // Set validation errors
        const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
        error.issues.forEach((err) => {
          if (err.path && err.path[0]) {
            fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
          }
        });
        console.log("Validation errors:", fieldErrors);
        setErrors(fieldErrors);
        setSubmitStatus("error");
      } else {
        console.error("Unexpected error:", error);
        setSubmitStatus("error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      title: "Phone",
      value: "+1 (555) 123-4567",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Email",
      value: "info@koiaconstruction.com",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      title: "Location",
      value: "123 Construction Ave, City, State",
    },
  ];

  return (
    <section
      id="contact-us"
      ref={sectionRef}
      className="relative min-h-screen bg-[#171410] overflow-hidden pt-6 pb-12 px-6 md:px-12 lg:px-20"
    >
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="contact-header inline-block mb-6">
            <span className="text-[#c9a750] text-sm font-semibold tracking-[0.3em] uppercase">
              Get In Touch
            </span>
            <div className="contact-header-line h-0.5 w-full bg-gradient-to-r from-transparent via-[#c9a750] to-transparent mt-2"></div>
          </div>
          <h2 className="contact-title text-5xl md:text-7xl font-bold text-[#e6d5c0] leading-tight mb-4">
            LET'S{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c9a750] via-[#b2913c] to-[#8c6d3b] animate-gradient">
              CONNECT
            </span>
          </h2>
          <p className="contact-description text-[#e6d5c0]/70 text-lg md:text-xl max-w-2xl mx-auto">
            Ready to bring your project to life? Reach inOut and let's discuss how
            we can help.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info - Left Side */}
          <div className="lg:col-span-2 space-y-8"
          >
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div
                  key={info.title}
                  className="contact-info-card group relative p-6 bg-gradient-to-r from-[#3b3121]/50 to-[#5d492c]/30 rounded-xl border border-[#c9a750]/20 hover:border-[#c9a750]/60 transition-all duration-500 hover:scale-105"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#c9a750]/20 flex items-center justify-center text-[#c9a750] group-hover:bg-[#c9a750] group-hover:text-[#171410] transition-all duration-500">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-[#c9a750] text-sm font-semibold uppercase tracking-wider mb-1">
                        {info.title}
                      </h3>
                      <p className="text-[#e6d5c0] text-lg">{info.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative Quote */}
            <div className="contact-quote relative p-8 bg-gradient-to-br from-[#3b3121]/30 to-transparent rounded-xl border border-[#c9a750]/10">
              <div className="absolute top-4 left-4 text-6xl text-[#c9a750]/20">
                "
              </div>
              <p className="relative z-10 text-[#e6d5c0]/80 text-lg italic leading-relaxed pl-8">
                Quality is not an act, it is a habit. Let's build something
                exceptional together.
              </p>
            </div>
          </div>

          {/* Contact Form - Right Side */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="contact-form relative p-8 md:p-12 bg-gradient-to-br from-[#3b3121]/40 to-[#5d492c]/20 rounded-2xl border border-[#c9a750]/20 backdrop-blur-sm"
            >
              {/* Success Message */}
              {submitStatus === "success" && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
                  <p className="text-green-400 text-center font-semibold">
                    Message sent successfully! We'll get back to you soon.
                  </p>
                </div>
              )}

              <div className="space-y-6">
                {/* Name Field */}
                <div className="relative">
                  <label
                    htmlFor="name"
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                      focusedField === "name" || formData.name
                        ? "-top-6 text-[#c9a750]"
                        : "top-4 text-base text-[#e6d5c0]/50"
                    }`}
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 py-4 bg-[#171410]/50 border ${
                      errors.name ? "border-red-500" : "border-[#c9a750]/30"
                    } rounded-lg text-[#e6d5c0] focus:border-[#c9a750] focus:inOutline-none transition-all duration-300`}
                    suppressHydrationWarning
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                  )}
                </div>

                {/* Email and Phone Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Email Field */}
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        focusedField === "email" || formData.email
                        ? "-top-6 text-[#c9a750]"
                        : "top-4 text-base text-[#e6d5c0]/50"
                      }`}
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-4 py-4 bg-[#171410]/50 border ${
                        errors.email ? "border-red-500" : "border-[#c9a750]/30"
                      } rounded-lg text-[#e6d5c0] focus:border-[#c9a750] focus:inOutline-none transition-all duration-300`}
                      suppressHydrationWarning
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div className="relative">
                    <label
                      htmlFor="phone"
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        focusedField === "phone" || formData.phone
                        ? "-top-6 text-[#c9a750]"
                        : "top-4 text-base text-[#e6d5c0]/50"
                      }`}
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("phone")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-4 py-4 bg-[#171410]/50 border ${
                        errors.phone ? "border-red-500" : "border-[#c9a750]/30"
                      } rounded-lg text-[#e6d5c0] focus:border-[#c9a750] focus:inOutline-none transition-all duration-300`}
                      suppressHydrationWarning
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Message Field */}
                <div className="relative">
                  <label
                    htmlFor="message"
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                      focusedField === "message" || formData.message
                        ? "-top-6 text-[#c9a750]"
                        : "top-4 text-base text-[#e6d5c0]/50"
                    }`}
                  >
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    rows={6}
                    className={`w-full px-4 py-4 bg-[#171410]/50 border ${
                      errors.message ? "border-red-500" : "border-[#c9a750]/30"
                    } rounded-lg text-[#e6d5c0] focus:border-[#c9a750] focus:inOutline-none transition-all duration-300 resize-none`}
                    suppressHydrationWarning
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button - Made Thinner */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative cursor-pointer w-full px-8 py-3.5 bg-gradient-to-r from-[#c9a750] to-[#b2913c] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#c9a750]/30 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  suppressHydrationWarning
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#b2913c] to-[#c9a750] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center justify-center gap-3 text-[#171410] font-bold text-base tracking-wide">
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        SENDING...
                      </>
                    ) : (
                      <>
                        SEND MESSAGE
                      </>
                    )}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
}
