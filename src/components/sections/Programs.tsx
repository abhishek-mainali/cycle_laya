import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Check, ArrowRight } from "lucide-react";

const programs = [
  {
    tier: "01",
    name: "Trail Fundamentals",
    subtitle: "Foundation",
    duration: "3 Days",
    riders: "Up to 4 riders",
    tag: "For Newcomers",
    price: "USD 680",
    priceNote: "per rider",
    description:
      "A comprehensive introduction to Nepal's trails. Learn essential skills, bike setup, and trail reading in Shivapuri Forest's beginner-friendly singletrack.",
    features: [
      "Trail reading & line selection",
      "Body positioning & balance",
      "Braking & cornering technique",
      "Bike setup & maintenance basics",
      "Guided trail rides daily",
      "All meals included",
    ],
    highlight: false,
    accentColor: "rgba(242,238,232,0.1)",
  },
  {
    tier: "02",
    name: "Elite Trail Mastery",
    subtitle: "Signature Program",
    duration: "7 Days",
    riders: "Up to 3 riders",
    tag: "Most Popular",
    price: "USD 1,850",
    priceNote: "per rider",
    description:
      "The definitive CycleLaya experience. A week of intensive coaching across Kathmandu Valley's most legendary trails, blending technical skill with flow-state training.",
    features: [
      "Advanced cornering & jumps",
      "Flow-state riding methodology",
      "Shivapuri & Nagarjun trails",
      "Video analysis sessions",
      "Nutrition & recovery coaching",
      "Hotel accommodation included",
      "Post-program ride plan",
    ],
    highlight: true,
    accentColor: "#C9A96E",
  },
  {
    tier: "03",
    name: "Private Himalayan Expedition",
    subtitle: "Ultimate Experience",
    duration: "14 Days",
    riders: "Private (1–2 riders)",
    tag: "Elite Access",
    price: "USD 4,200",
    priceNote: "per rider",
    description:
      "An exclusive, fully bespoke two-week journey through Nepal's most remote and breathtaking mountain bike routes. Fully private, fully curated for the elite rider.",
    features: [
      "Fully private & customized",
      "Remote Himalayan trail access",
      "Annapurna & Mustang routes",
      "Luxury lodge accommodation",
      "Personal chef & support crew",
      "Drone & photo documentation",
      "Lifetime coaching follow-up",
    ],
    highlight: false,
    accentColor: "rgba(242,238,232,0.1)",
  },
];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Programs() {
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="programs"
      style={{
        background: "#080705",
        padding: "140px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top border */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: "1px",
          background: "linear-gradient(to right, transparent, rgba(201,169,110,0.3), transparent)",
        }}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: "96px" }}>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "11px",
                fontWeight: 400,
                color: "#C9A96E",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                marginBottom: "24px",
              }}
            >
              Training Programs
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(32px, 5vw, 64px)",
                fontWeight: 600,
                color: "#F2EEE8",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
                marginBottom: "20px",
              }}
            >
              Choose Your Path
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "15px",
                fontWeight: 300,
                color: "rgba(242,238,232,0.5)",
                maxWidth: "500px",
                margin: "0 auto",
                lineHeight: 1.7,
                letterSpacing: "0.01em",
                padding: "0 20px",
              }}
            >
              Each program is a complete immersion — built around your level, your goals, and the trails of Nepal.
            </p>
          </div>
        </FadeIn>

        {/* Program Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2px",
            background: "rgba(255,255,255,0.05)",
          }}
        >
          {programs.map((program, i) => (
            <FadeIn key={program.name} delay={0.1 * i}>
              <div
                style={{
                  position: "relative",
                  background: program.highlight ? "#131108" : "#0A0906",
                  padding: "40px 30px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "default",
                  transition: "background 0.3s ease",
                  borderTop: program.highlight ? `2px solid #C9A96E` : "2px solid transparent",
                }}
                onMouseEnter={(e) =>
                (e.currentTarget.style.background = program.highlight
                  ? "#171308"
                  : "#0E0C09")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = program.highlight ? "#131108" : "#0A0906")
                }
              >
                {/* Popular tag */}
                {program.highlight && (
                  <div
                    style={{
                      position: "absolute",
                      top: "24px",
                      right: "24px",
                      background: "#C9A96E",
                      color: "#0A0906",
                      fontSize: "10px",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "5px 12px",
                      borderRadius: "1px",
                    }}
                  >
                    {program.tag}
                  </div>
                )}

                {!program.highlight && (
                  <div
                    style={{
                      position: "absolute",
                      top: "24px",
                      right: "24px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(242,238,232,0.4)",
                      fontSize: "10px",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "5px 12px",
                      borderRadius: "1px",
                    }}
                  >
                    {program.tag}
                  </div>
                )}

                {/* Tier number */}
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "48px",
                    fontWeight: 300,
                    color: program.highlight
                      ? "rgba(201,169,110,0.25)"
                      : "rgba(242,238,232,0.08)",
                    lineHeight: 1,
                    marginBottom: "20px",
                  }}
                >
                  {program.tier}
                </p>

                {/* Program name */}
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(22px, 2.5vw, 30px)",
                    fontWeight: 600,
                    color: "#F2EEE8",
                    marginBottom: "8px",
                    letterSpacing: "0.01em",
                    lineHeight: 1.2,
                  }}
                >
                  {program.name}
                </h3>

                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "11px",
                    fontWeight: 400,
                    color: program.highlight ? "#C9A96E" : "rgba(242,238,232,0.35)",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    marginBottom: "24px",
                  }}
                >
                  {program.subtitle}
                </p>

                {/* Meta info */}
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    marginBottom: "24px",
                    paddingBottom: "24px",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "11px",
                        color: "rgba(242,238,232,0.35)",
                        letterSpacing: "0.08em",
                        marginBottom: "4px",
                        textTransform: "uppercase",
                      }}
                    >
                      Duration
                    </p>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "13px",
                        color: "rgba(242,238,232,0.75)",
                        fontWeight: 400,
                      }}
                    >
                      {program.duration}
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "11px",
                        color: "rgba(242,238,232,0.35)",
                        letterSpacing: "0.08em",
                        marginBottom: "4px",
                        textTransform: "uppercase",
                      }}
                    >
                      Group
                    </p>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "13px",
                        color: "rgba(242,238,232,0.75)",
                        fontWeight: 400,
                      }}
                    >
                      {program.riders}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "14px",
                    fontWeight: 300,
                    color: "rgba(242,238,232,0.5)",
                    lineHeight: 1.8,
                    marginBottom: "32px",
                    letterSpacing: "0.01em",
                    flexGrow: 1,
                  }}
                >
                  {program.description}
                </p>

                {/* Features */}
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  {program.features.map((feature) => (
                    <li
                      key={feature}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "13px",
                        fontWeight: 300,
                        color: "rgba(242,238,232,0.6)",
                        letterSpacing: "0.01em",
                      }}
                    >
                      <Check
                        size={13}
                        style={{ color: program.highlight ? "#C9A96E" : "rgba(242,238,232,0.3)", flexShrink: 0 }}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Price & CTA */}
                <div style={{ marginTop: "auto" }}>
                  <div style={{ marginBottom: "20px" }}>
                    <span
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "clamp(28px, 3vw, 38px)",
                        fontWeight: 600,
                        color: program.highlight ? "#C9A96E" : "#F2EEE8",
                      }}
                    >
                      {program.price}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "12px",
                        color: "rgba(242,238,232,0.35)",
                        marginLeft: "8px",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {program.priceNote}
                    </span>
                  </div>

                  <button
                    onClick={scrollToContact}
                    style={{
                      width: "100%",
                      background: program.highlight ? "#C9A96E" : "transparent",
                      border: `1px solid ${program.highlight ? "#C9A96E" : "rgba(255,255,255,0.15)"}`,
                      borderRadius: "2px",
                      color: program.highlight ? "#0A0906" : "rgba(242,238,232,0.7)",
                      fontSize: "12px",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: program.highlight ? 600 : 400,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "14px 20px",
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                    onMouseEnter={(e) => {
                      if (!program.highlight) {
                        e.currentTarget.style.borderColor = "#C9A96E";
                        e.currentTarget.style.color = "#C9A96E";
                      } else {
                        e.currentTarget.style.background = "#d4b57a";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!program.highlight) {
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                        e.currentTarget.style.color = "rgba(242,238,232,0.7)";
                      } else {
                        e.currentTarget.style.background = "#C9A96E";
                      }
                    }}
                  >
                    Apply for This Program
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Note */}
        <FadeIn delay={0.3}>
          <p
            style={{
              textAlign: "center",
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              fontWeight: 300,
              color: "rgba(242,238,232,0.3)",
              marginTop: "40px",
              letterSpacing: "0.02em",
            }}
          >
            All programs include equipment inspection, safety briefing, and post-session analysis. Bespoke itineraries available on request.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
