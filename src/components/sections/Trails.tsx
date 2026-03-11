import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { MapPin, ArrowRight } from "lucide-react";
import { useListContent } from "@/hooks/useContent";

const TRAIL_1 = "https://images.unsplash.com/photo-1729455192378-a3347584fb71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGJpa2UlMjB0cmFpbCUyMGFlcmlhbCUyMG92ZXJoZWFkJTIwdmlld3xlbnwxfHx8fDE3NzMxMTI2OTR8MA&ixlib=rb-4.1.0&q=80&w=1080";
const TRAIL_2 = "https://images.unsplash.com/photo-1764140608148-80e010804af8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW1hbGF5YSUyMG1vdW50YWlucyUyMG5lcGFsJTIwbGFuZHNjYXBlJTIwZHJhbWF0aWN8ZW58MXx8fHwxNzczMTEyNjg4fDA&ixlib=rb-4.1.0&q=80&w=1080";
const TRAIL_3 = "https://images.unsplash.com/photo-1755062164198-27393d5a26e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXBhbCUyMG1vdW50YWluJTIwdHJhaWwlMjBzY2VuaWMlMjBuYXR1cmV8ZW58MXx8fHwxNzczMTEyNjg4fDA&ixlib=rb-4.1.0&q=80&w=1080";

interface Trail {
  id?: string;
  image: string;
  name: string;
  location: string;
  elevation: string;
  difficulty: string;
  distance: string;
  description: string;
  tag: string;
}

const DEFAULT_TRAILS: Trail[] = [
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
  const { items: dbTrails } = useListContent<Trail>("trails");
  const trails = dbTrails.length > 0 ? dbTrails : DEFAULT_TRAILS;

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="trails"
      style={{
        background: "#080705",
        padding: "120px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
          <header style={{ maxWidth: "600px" }}>
            <FadeIn>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "11px",
                  fontWeight: 400,
                  color: "#C9A96E",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                The Terrain
              </p>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(40px, 5vw, 64px)",
                  fontWeight: 600,
                  color: "#F2EEE8",
                  lineHeight: 1.1,
                  letterSpacing: "-0.01em",
                }}
              >
                Where the Spirit <br />{" "}
                <span style={{ fontStyle: "italic", fontWeight: 300 }}>Meets the Singletrack.</span>
              </h2>
            </FadeIn>
          </header>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "32px",
            }}
          >
            {trails.map((trail: Trail, i: number) => (
              <FadeIn key={trail.id || `trail-${i}`} delay={i * 0.1}>
                <div
                  style={{
                    position: "relative",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: "4px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
                    <img
                      src={trail.image}
                      alt={trail.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.8s cubic-bezier(0.2, 0, 0.2, 1)",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "16px",
                        left: "16px",
                        background: "#C9A96E",
                        color: "#0A0906",
                        padding: "4px 12px",
                        fontSize: "10px",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        borderRadius: "2px",
                      }}
                    >
                      {trail.tag}
                    </div>
                  </div>

                  <div style={{ padding: "32px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "start",
                        marginBottom: "16px",
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "28px",
                          fontWeight: 500,
                          color: "#F2EEE8",
                        }}
                      >
                        {trail.name}
                      </h3>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          color: "rgba(242,238,232,0.4)",
                          fontSize: "12px",
                        }}
                      >
                        <MapPin size={12} color="#C9A96E" />
                        {trail.location}
                      </div>
                    </div>

                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "14px",
                        lineHeight: 1.7,
                        color: "rgba(242,238,232,0.6)",
                        marginBottom: "32px",
                        flex: 1,
                      }}
                    >
                      {trail.description}
                    </p>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "16px",
                        paddingTop: "24px",
                        borderTop: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <div>
                        <p
                          style={{
                            fontSize: "10px",
                            textTransform: "uppercase",
                            color: "rgba(242,238,232,0.3)",
                            marginBottom: "4px",
                          }}
                        >
                          Apex
                        </p>
                        <p style={{ fontSize: "14px", color: "#F2EEE8" }}>{trail.elevation}</p>
                      </div>
                      <div>
                        <p
                          style={{
                            fontSize: "10px",
                            textTransform: "uppercase",
                            color: "rgba(242,238,232,0.3)",
                            marginBottom: "4px",
                          }}
                        >
                          Difficulty
                        </p>
                        <p style={{ fontSize: "14px", color: "#F2EEE8" }}>{trail.difficulty}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "40px",
              }}
            >
              <button
                onClick={scrollToContact}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  background: "transparent",
                  border: "none",
                  color: "#C9A96E",
                  fontSize: "14px",
                  fontWeight: 500,
                  cursor: "pointer",
                  padding: "16px 32px",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                }}
              >
                Inquire About Custom Expeditions
                <ArrowRight size={18} />
              </button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
