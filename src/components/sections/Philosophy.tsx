import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useContent } from "@/hooks/useContent";

const HIMALAYA_IMAGE = "https://images.unsplash.com/photo-1763480005793-501a0cbe1ac9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW1hbGF5YW4lMjB2YWxsZXklMjBmb2clMjBtaXN0JTIwbGFuZHNjYXBlfGVufDF8fHx8MTc3MzExMjY5NHww&ixlib=rb-4.1.0&q=80&w=1920";

const pillars = [
  {
    nepali: "लय",
    title: "Rhythm",
    description:
      "Every trail has a pulse. Learn to feel the cadence of the mountain beneath your wheels, finding the perfect tempo between effort and surrender.",
  },
  {
    nepali: "प्रवाह",
    title: "Flow",
    description:
      "Flow is the sacred state where rider and terrain become one. CycleLaya teaches you to dissolve resistance and move with effortless grace.",
  },
  {
    nepali: "निपुणता",
    title: "Mastery",
    description:
      "True mastery is never destination — it is the infinite refinement of presence. Each descent reveals something new, each climb builds something lasting.",
  },
];

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Philosophy() {
  const { content } = useContent("philosophy");
  const mainQuote = content['quote']?.text || '"In Nepali, Laya means rhythm — the sacred cadence between rider and mountain, between effort and surrender, between who you are and who you are becoming."';
  const himalayaQuote = content['himalaya_quote']?.text || '"The mountains have been here forever. Learn to move with them."';
  const breakImage = content['image']?.image || HIMALAYA_IMAGE;
  return (
    <>
      {/* Philosophy Section */}
      <section
        id="philosophy"
        style={{
          background: "#0A0906",
          padding: "140px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle background texture lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent, transparent 120px, rgba(201,169,110,0.025) 120px, rgba(201,169,110,0.025) 121px)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
          {/* Eyebrow */}
          <FadeIn>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "11px",
                fontWeight: 400,
                color: "#C9A96E",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                textAlign: "center",
                marginBottom: "32px",
              }}
            >
              The Laya Philosophy
            </p>
          </FadeIn>

          {/* Nepali word — large display */}
          <FadeIn delay={0.1}>
            <div style={{ textAlign: "center", marginBottom: "24px", position: "relative", overflow: "visible" }}>
              {/* Ghost background text */}
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(120px, 20vw, 260px)",
                  fontWeight: 700,
                  color: "rgba(242, 238, 232, 0.04)",
                  letterSpacing: "-0.02em",
                  display: "block",
                  lineHeight: 0.9,
                  userSelect: "none",
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  pointerEvents: "none",
                  whiteSpace: "nowrap",
                  zIndex: 0,
                }}
              >
                लय
              </span>
              {/* Foreground display text */}
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(48px, 7vw, 88px)",
                  fontWeight: 600,
                  color: "#F2EEE8",
                  letterSpacing: "-0.01em",
                  display: "block",
                  lineHeight: 1.1,
                  position: "relative",
                  padding: "40px 0 20px",
                  zIndex: 1,
                }}
              >
                लय &nbsp;·&nbsp; Laya
              </span>
            </div>
          </FadeIn>

          {/* Divider */}
          <FadeIn delay={0.2}>
            <div
              style={{
                width: "40px",
                height: "1px",
                background: "#C9A96E",
                margin: "40px auto",
                opacity: 0.6,
              }}
            />
          </FadeIn>

          {/* Main description */}
          <FadeIn delay={0.25}>
            <p
              style={{
                fontFamily: "'Cormorant Garant', serif",
                fontSize: "clamp(20px, 2.5vw, 28px)",
                fontWeight: 400,
                fontStyle: "italic",
                color: "rgba(242, 238, 232, 0.85)",
                lineHeight: 1.65,
                textAlign: "center",
                maxWidth: "720px",
                margin: "0 auto 24px",
                letterSpacing: "0.01em",
              }}
            >
              {mainQuote}
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(14px, 1.5vw, 16px)",
                fontWeight: 300,
                color: "rgba(242, 238, 232, 0.5)",
                lineHeight: 1.8,
                textAlign: "center",
                maxWidth: "580px",
                margin: "0 auto 96px",
                letterSpacing: "0.02em",
              }}
            >
              CycleLaya was born from a deep love of Nepal's mountains and a belief that the finest riding goes beyond
              technique — it is a philosophy of presence, connection, and flow.
            </p>
          </FadeIn>

          {/* Three Pillars */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "0",
              borderTop: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {pillars.map((pillar, i) => (
              <FadeIn key={pillar.title} delay={0.15 * i}>
                <div
                  style={{
                    padding: "56px 40px",
                    borderRight: i < pillars.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                    transition: "background 0.3s ease",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(201,169,110,0.04)")
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "40px",
                      fontWeight: 300,
                      color: "rgba(201,169,110,0.4)",
                      marginBottom: "16px",
                      lineHeight: 1,
                    }}
                  >
                    {pillar.nepali}
                  </p>
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(22px, 2.5vw, 28px)",
                      fontWeight: 600,
                      color: "#F2EEE8",
                      marginBottom: "20px",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {pillar.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "14px",
                      fontWeight: 300,
                      color: "rgba(242,238,232,0.55)",
                      lineHeight: 1.85,
                      letterSpacing: "0.01em",
                    }}
                  >
                    {pillar.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Himalayan silhouette */}
        <HimalayanSilhouette />
      </section>

      {/* Full-width Himalayan break image with quote */}
      <section
        style={{
          position: "relative",
          height: "clamp(400px, 55vh, 700px)",
          overflow: "hidden",
        }}
      >
        <img
          src={breakImage}
          alt="Himalayan valley in mist"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(10,9,6,0.5) 0%, rgba(10,9,6,0.3) 50%, rgba(10,9,6,0.7) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
        >
          <div style={{ textAlign: "center", maxWidth: "800px" }}>
            <p
              style={{
                fontFamily: "'Cormorant Garant', serif",
                fontSize: "clamp(26px, 4vw, 52px)",
                fontWeight: 400,
                fontStyle: "italic",
                color: "#F2EEE8",
                lineHeight: 1.4,
                letterSpacing: "0.01em",
              }}
            >
              {himalayaQuote}
            </p>
            <div
              style={{
                width: "32px",
                height: "1px",
                background: "#C9A96E",
                margin: "28px auto 0",
                opacity: 0.7,
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}

function HimalayanSilhouette() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        pointerEvents: "none",
        opacity: 0.18,
      }}
    >
      <svg
        viewBox="0 0 1440 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block", width: "100%" }}
        preserveAspectRatio="none"
      >
        <path
          d="M0,180 L0,140 L80,95 L150,115 L240,60 L320,100 L400,45 L480,85 L560,25 L640,75 L700,15 L760,65 L820,35 L880,70 L960,20 L1040,60 L1100,40 L1160,70 L1220,30 L1300,65 L1380,50 L1440,40 L1440,180 Z"
          fill="#C9A96E"
        />
      </svg>
    </div>
  );
}