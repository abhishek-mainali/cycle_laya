import { useRef } from "react";
import { motion, useInView } from "motion/react";

const FOUNDER_IMAGE = "https://images.unsplash.com/photo-1754546994955-446c632b0351?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGJpa2luZyUyMGNvYWNoaW5nJTIwdHJhaW5pbmclMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzczMTEyNjkwfDA&ixlib=rb-4.1.0&q=80&w=1080";
const FOREST_IMAGE = "https://images.unsplash.com/photo-1760233470659-5151016f3453?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGJpa2UlMjByaWRlciUyMGZvcmVzdCUyMHRyYWlsJTIwZXBpY3xlbnwxfHx8fDE3NzMxMTI2ODh8MA&ixlib=rb-4.1.0&q=80&w=1080";

const stats = [
  { value: "15+", label: "Years on Nepali Trails" },
  { value: "300+", label: "Riders Coached" },
  { value: "60+", label: "Trails Mapped" },
  { value: "8", label: "Countries Represented" },
];

function FadeIn({ children, delay = 0, direction = "up" }: { children: React.ReactNode; delay?: number; direction?: "up" | "left" | "right" }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const initial = direction === "left" ? { opacity: 0, x: -40 } : direction === "right" ? { opacity: 0, x: 40 } : { opacity: 0, y: 32 };
  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Founder() {
  return (
    <section
      id="founder"
      style={{
        background: "#0E0D0A",
        padding: "140px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "40%",
          height: "100%",
          background: "radial-gradient(ellipse at 80% 50%, rgba(201,169,110,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Section eyebrow */}
        <FadeIn>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "11px",
              fontWeight: 400,
              color: "#C9A96E",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginBottom: "80px",
              textAlign: "center",
            }}
          >
            The Founder
          </p>
        </FadeIn>

        {/* Main content grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "80px",
            alignItems: "center",
          }}
        >
          {/* Left: Images */}
          <FadeIn delay={0.1} direction="left">
            <div style={{ position: "relative" }}>
              {/* Main image */}
              <div
                style={{
                  position: "relative",
                  borderRadius: "2px",
                  overflow: "hidden",
                  aspectRatio: "4/5",
                }}
              >
                <img
                  src={FOUNDER_IMAGE}
                  alt="Nirav Shrestha coaching mountain biking"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    display: "block",
                    transition: "transform 0.7s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
                {/* Image gradient overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to bottom, transparent 60%, rgba(10,9,6,0.7) 100%)",
                  }}
                />
                {/* Name overlay */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "28px",
                    left: "28px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Cormorant Garant', serif",
                      fontSize: "22px",
                      fontWeight: 600,
                      color: "#F2EEE8",
                      letterSpacing: "0.04em",
                    }}
                  >
                    Nirav Shrestha
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "11px",
                      fontWeight: 400,
                      color: "#C9A96E",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      marginTop: "4px",
                    }}
                  >
                    Founder · Lead Coach
                  </p>
                </div>
              </div>

              {/* Secondary image — floated */}
              <div
                style={{
                  position: "absolute",
                  bottom: "-40px",
                  right: "-30px",
                  width: "48%",
                  aspectRatio: "3/4",
                  borderRadius: "2px",
                  overflow: "hidden",
                  border: "3px solid #0E0D0A",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                }}
                className="hidden lg:block"
              >
                <img
                  src={FOREST_IMAGE}
                  alt="Mountain biking forest trail"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    display: "block",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(10,9,6,0.3)",
                  }}
                />
              </div>

              {/* Gold accent line */}
              <div
                style={{
                  position: "absolute",
                  top: "24px",
                  left: "-16px",
                  width: "3px",
                  height: "80px",
                  background: "linear-gradient(to bottom, #C9A96E, transparent)",
                  borderRadius: "2px",
                }}
                className="hidden lg:block"
              />
            </div>
          </FadeIn>

          {/* Right: Story */}
          <FadeIn delay={0.2} direction="right">
            <div style={{ paddingLeft: "0" }} className="lg:pl-8">
              <h2
                style={{
                  fontFamily: "'Cormorant Garant', serif",
                  fontSize: "clamp(36px, 4.5vw, 56px)",
                  fontWeight: 600,
                  color: "#F2EEE8",
                  lineHeight: 1.15,
                  letterSpacing: "-0.01em",
                  marginBottom: "32px",
                }}
              >
                Born on the trails,
                <br />
                <span style={{ fontStyle: "italic", fontWeight: 300 }}>
                  forged by the mountains.
                </span>
              </h2>

              <div
                style={{
                  width: "40px",
                  height: "1px",
                  background: "#C9A96E",
                  marginBottom: "32px",
                  opacity: 0.7,
                }}
              />

              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "15px",
                  fontWeight: 300,
                  color: "rgba(242,238,232,0.65)",
                  lineHeight: 1.9,
                  marginBottom: "24px",
                  letterSpacing: "0.01em",
                }}
              >
                Nirav Shrestha grew up navigating the rugged singletrack of the Kathmandu Valley, where the ancient
                forests of Shivapuri and Nagarjun became his first classroom. From a young age, he understood that
                riding wasn't just a sport — it was a language spoken between body and earth.
              </p>

              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "15px",
                  fontWeight: 300,
                  color: "rgba(242,238,232,0.65)",
                  lineHeight: 1.9,
                  marginBottom: "48px",
                  letterSpacing: "0.01em",
                }}
              >
                After competing internationally and training under some of the world's elite coaches, Nirav returned
                to Nepal with a mission: to share the extraordinary trails of the Himalayas with riders from every
                corner of the globe, and to guide them into their own Laya.
              </p>

              {/* Quote */}
              <div
                style={{
                  borderLeft: "2px solid rgba(201,169,110,0.4)",
                  paddingLeft: "24px",
                  marginBottom: "56px",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Cormorant Garant', serif",
                    fontSize: "20px",
                    fontStyle: "italic",
                    fontWeight: 400,
                    color: "rgba(242,238,232,0.75)",
                    lineHeight: 1.6,
                    letterSpacing: "0.01em",
                  }}
                >
                  "Every rider I work with is searching for the same thing — that moment when the thinking stops and
                  the riding begins. I'm here to help them find it."
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "11px",
                    fontWeight: 400,
                    color: "#C9A96E",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginTop: "12px",
                  }}
                >
                  — Nirav Shrestha
                </p>
              </div>

              {/* Stats */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "0",
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                  borderLeft: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    style={{
                      padding: "28px 24px",
                      borderRight: "1px solid rgba(255,255,255,0.07)",
                      borderBottom: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'Cormorant Garant', serif",
                        fontSize: "clamp(30px, 3.5vw, 40px)",
                        fontWeight: 600,
                        color: "#C9A96E",
                        lineHeight: 1,
                        marginBottom: "8px",
                      }}
                    >
                      {stat.value}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "12px",
                        fontWeight: 300,
                        color: "rgba(242,238,232,0.45)",
                        letterSpacing: "0.06em",
                        lineHeight: 1.4,
                      }}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
