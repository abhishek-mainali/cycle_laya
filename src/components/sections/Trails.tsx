import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { MapPin, ArrowRight } from "lucide-react";

const TRAIL_1 = "https://images.unsplash.com/photo-1729455192378-a3347584fb71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGJpa2UlMjB0cmFpbCUyMGFlcmlhbCUyMG92ZXJoZWFkJTIwdmlld3xlbnwxfHx8fDE3NzMxMTI2OTR8MA&ixlib=rb-4.1.0&q=80&w=1080";
const TRAIL_2 = "https://images.unsplash.com/photo-1764140608148-80e010804af8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW1hbGF5YSUyMG1vdW50YWlucyUyMG5lcGFsJTIwbGFuZHNjYXBlJTIwZHJhbWF0aWN8ZW58MXx8fHwxNzczMTEyNjg4fDA&ixlib=rb-4.1.0&q=80&w=1080";
const TRAIL_3 = "https://images.unsplash.com/photo-1755062164198-27393d5a26e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXBhbCUyMG1vdW50YWluJTIwdHJhaWwlMjBzY2VuaWMlMjBuYXR1cmV8ZW58MXx8fHwxNzczMTEyNjg4fDA&ixlib=rb-4.1.0&q=80&w=1080";

const trails = [
  {
    image: TRAIL_1,
    name: "Shivapuri Ridge",
    location: "Kathmandu Valley",
    elevation: "2,732m",
    difficulty: "Intermediate — Advanced",
    distance: "28 km",
    description:
      "The jewel of Nepal's mountain biking. Dense rhododendron forests, dramatic ridge views, and flowy singletrack that defines the CycleLaya experience.",
    tag: "Most Ridden",
  },
  {
    image: TRAIL_2,
    name: "Annapurna Circuit",
    location: "Annapurna Range",
    elevation: "5,416m",
    difficulty: "Expert",
    distance: "160+ km",
    description:
      "One of the world's great mountain bike routes. Glacial rivers, ancient villages, and high-altitude passes that test body, mind, and spirit.",
    tag: "Expedition Route",
  },
  {
    image: TRAIL_3,
    name: "Nagarjun Forest",
    location: "Kathmandu Valley",
    elevation: "2,100m",
    difficulty: "Beginner — Intermediate",
    distance: "18 km",
    description:
      "Lush, green, and accessible. The perfect trail for mastering fundamentals within a peaceful, forested landscape just outside Kathmandu.",
    tag: "Foundation Trail",
  },
];

function FadeIn({ children, delay = 0, direction = "up" }: { children: React.ReactNode; delay?: number; direction?: "up" | "left" | "right" }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const initial =
    direction === "left" ? { opacity: 0, x: -30 } : direction === "right" ? { opacity: 0, x: 30 } : { opacity: 0, y: 28 };
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

export function Trails() {
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="trails"
      style={{
        background: "#0C0B08",
        padding: "140px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle top border */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: "1px",
          background: "linear-gradient(to right, transparent, rgba(201,169,110,0.2), transparent)",
        }}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "24px",
            marginBottom: "80px",
          }}
        >
          <FadeIn>
            <div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "11px",
                  fontWeight: 400,
                  color: "#C9A96E",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  marginBottom: "20px",
                }}
              >
                Trail Experiences
              </p>
              <h2
                style={{
                  fontFamily: "'Cormorant Garant', serif",
                  fontSize: "clamp(36px, 5vw, 64px)",
                  fontWeight: 600,
                  color: "#F2EEE8",
                  lineHeight: 1.1,
                  letterSpacing: "-0.01em",
                }}
              >
                The Trails of Nepal
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "15px",
                fontWeight: 300,
                color: "rgba(242,238,232,0.45)",
                maxWidth: "340px",
                lineHeight: 1.7,
                letterSpacing: "0.01em",
              }}
            >
              Nepal is home to some of the world's most diverse and spectacular mountain bike terrain. From dense
              Kathmandu valley forests to high-altitude Himalayan routes.
            </p>
          </FadeIn>
        </div>

        {/* Trails grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "20px",
          }}
        >
          {trails.map((trail, i) => (
            <FadeIn key={trail.name} delay={0.12 * i}>
              <div
                style={{
                  position: "relative",
                  borderRadius: "2px",
                  overflow: "hidden",
                  aspectRatio: "3/4",
                  cursor: "default",
                  background: "#111",
                }}
              >
                {/* Trail image */}
                <img
                  src={trail.image}
                  alt={trail.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.7s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />

                {/* Gradient */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to bottom, rgba(10,9,6,0.1) 0%, rgba(10,9,6,0.2) 40%, rgba(10,9,6,0.85) 80%, rgba(10,9,6,0.97) 100%)",
                  }}
                />

                {/* Tag */}
                <div
                  style={{
                    position: "absolute",
                    top: "20px",
                    left: "20px",
                    background: "rgba(10,9,6,0.7)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(201,169,110,0.2)",
                    color: "#C9A96E",
                    fontSize: "10px",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "5px 12px",
                    borderRadius: "1px",
                  }}
                >
                  {trail.tag}
                </div>

                {/* Content */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "32px",
                  }}
                >
                  {/* Location */}
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px" }}>
                    <MapPin size={11} style={{ color: "#C9A96E", flexShrink: 0 }} />
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "11px",
                        fontWeight: 300,
                        color: "rgba(242,238,232,0.5)",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {trail.location}
                    </span>
                  </div>

                  {/* Name */}
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garant', serif",
                      fontSize: "clamp(24px, 2.5vw, 30px)",
                      fontWeight: 600,
                      color: "#F2EEE8",
                      marginBottom: "12px",
                      letterSpacing: "0.01em",
                      lineHeight: 1.2,
                    }}
                  >
                    {trail.name}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px",
                      fontWeight: 300,
                      color: "rgba(242,238,232,0.5)",
                      lineHeight: 1.75,
                      marginBottom: "20px",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {trail.description}
                  </p>

                  {/* Trail stats */}
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      paddingTop: "16px",
                      borderTop: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div>
                      <p style={{ fontFamily: "'Inter'", fontSize: "10px", color: "rgba(242,238,232,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "3px" }}>Distance</p>
                      <p style={{ fontFamily: "'Inter'", fontSize: "13px", color: "rgba(242,238,232,0.75)", fontWeight: 400 }}>{trail.distance}</p>
                    </div>
                    <div>
                      <p style={{ fontFamily: "'Inter'", fontSize: "10px", color: "rgba(242,238,232,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "3px" }}>Elevation</p>
                      <p style={{ fontFamily: "'Inter'", fontSize: "13px", color: "rgba(242,238,232,0.75)", fontWeight: 400 }}>{trail.elevation}</p>
                    </div>
                    <div style={{ marginLeft: "auto" }}>
                      <p style={{ fontFamily: "'Inter'", fontSize: "10px", color: "rgba(242,238,232,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "3px" }}>Level</p>
                      <p style={{ fontFamily: "'Inter'", fontSize: "13px", color: "rgba(242,238,232,0.75)", fontWeight: 400 }}>{trail.difficulty}</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* More trails note */}
        <FadeIn delay={0.3}>
          <div style={{ textAlign: "center", marginTop: "56px" }}>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                fontWeight: 300,
                color: "rgba(242,238,232,0.35)",
                marginBottom: "24px",
                letterSpacing: "0.02em",
              }}
            >
              And 50+ more trails across Nepal's diverse terrain.
            </p>
            <button
              onClick={scrollToContact}
              style={{
                background: "transparent",
                border: "1px solid rgba(201,169,110,0.3)",
                borderRadius: "2px",
                color: "#C9A96E",
                fontSize: "12px",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "12px 28px",
                cursor: "pointer",
                transition: "all 0.25s ease",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(201,169,110,0.08)";
                e.currentTarget.style.borderColor = "#C9A96E";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(201,169,110,0.3)";
              }}
            >
              Request a Trail Map
              <ArrowRight size={13} />
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
