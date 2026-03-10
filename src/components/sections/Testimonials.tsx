import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const PRAYER_FLAGS_IMAGE = "https://images.unsplash.com/photo-1767182752583-bfa4bc1f0727?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXBhbCUyMHByYXllciUyMGZsYWdzJTIwbW91bnRhaW4lMjBzcGlyaXR1YWx8ZW58MXx8fHwxNzczMTEyNjkxfDA&ixlib=rb-4.1.0&q=80&w=1920";

const PRAYER_FLAG_COLORS = ["#3B7DD8", "#E8E4DC", "#E84040", "#4CAF73", "#F5C842"];

const testimonials = [
  {
    name: "Markus Bauer",
    country: "Germany 🇩🇪",
    role: "Enduro Racer",
    rating: 5,
    quote:
      "I've trained with coaches across Europe and the United States, but nothing came close to what Nirav taught me in Nepal. He doesn't just teach technique — he teaches you to think like the mountain. Coming back next year for the Expedition program.",
    program: "Elite Trail Mastery",
    initials: "MB",
  },
  {
    name: "Sarah Chen",
    country: "United States 🇺🇸",
    role: "Adventure Cyclist",
    rating: 5,
    quote:
      "The Trail Mastery program completely changed my relationship with riding. I arrived as a decent rider and left as a confident one. The trails of Shivapuri are unlike anything I'd experienced — raw, beautiful, and perfectly matched to the coaching Nirav provides.",
    program: "Elite Trail Mastery",
    initials: "SC",
  },
  {
    name: "James Whitfield",
    country: "United Kingdom 🇬🇧",
    role: "Professional Rider",
    rating: 5,
    quote:
      "The Himalayan Expedition was the most extraordinary two weeks of my life. Nirav's knowledge of the terrain is unmatched — he knows every corner, every line, every flow section. We rode trails that most people will never see. Absolutely life-changing.",
    program: "Private Himalayan Expedition",
    initials: "JW",
  },
  {
    name: "Anya Morozova",
    country: "Russia 🇷🇺",
    role: "Bikepacker",
    rating: 5,
    quote:
      "I was skeptical about a coaching program in Nepal, thinking it might be more tourism than training. I couldn't have been more wrong. This was the most focused, progressive, and transformative riding experience I've ever had. Nirav is extraordinary.",
    program: "Trail Fundamentals",
    initials: "AM",
  },
  {
    name: "Tomás Navarro",
    country: "Spain 🇪🇸",
    role: "Amateur Racer",
    rating: 5,
    quote:
      "There's something about riding in Nepal with a guide who truly understands the mountain culture. Nirav weaves together technique, philosophy, and adventure in a way that's completely unique. I left not just a better rider, but a changed person.",
    program: "Elite Trail Mastery",
    initials: "TN",
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
      transition={{ duration: 0.9, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  };

  const next = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % testimonials.length);
  };

  const t = testimonials[current];

  return (
    <section
      style={{
        position: "relative",
        background: "#0A0906",
        overflow: "hidden",
      }}
    >
      {/* Prayer flags background image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
        }}
      >
        <img
          src={PRAYER_FLAGS_IMAGE}
          alt="Nepal prayer flags"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 60%" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(10,9,6,0.92) 0%, rgba(10,9,6,0.85) 50%, rgba(10,9,6,0.95) 100%)",
          }}
        />
      </div>

      {/* Prayer flag color strip */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          display: "flex",
        }}
      >
        {PRAYER_FLAG_COLORS.map((color, i) => (
          <div key={i} style={{ flex: 1, background: color, opacity: 0.7 }} />
        ))}
      </div>

      <div style={{ position: "relative", zIndex: 2, padding: "140px 24px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          {/* Header */}
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "80px" }}>
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
                Rider Testimonials
              </p>
              <h2
                style={{
                  fontFamily: "'Cormorant Garant', serif",
                  fontSize: "clamp(34px, 4.5vw, 56px)",
                  fontWeight: 600,
                  color: "#F2EEE8",
                  lineHeight: 1.1,
                  letterSpacing: "-0.01em",
                }}
              >
                Voices from the Trail
              </h2>
            </div>
          </FadeIn>

          {/* Testimonial Slider */}
          <FadeIn delay={0.1}>
            <div style={{ position: "relative" }}>
              {/* Main testimonial */}
              <div
                style={{
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "2px",
                  padding: "clamp(40px, 5vw, 64px)",
                  minHeight: "300px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Quote mark */}
                <div
                  style={{
                    position: "absolute",
                    top: "24px",
                    left: "32px",
                    fontFamily: "'Cormorant Garant', serif",
                    fontSize: "120px",
                    fontWeight: 700,
                    color: "rgba(201,169,110,0.1)",
                    lineHeight: 1,
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                >
                  "
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ opacity: 0, x: direction * 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -30 }}
                    transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    {/* Stars */}
                    <div style={{ display: "flex", gap: "4px", marginBottom: "28px" }}>
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          style={{ color: "#C9A96E", fill: "#C9A96E" }}
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <p
                      style={{
                        fontFamily: "'Cormorant Garant', serif",
                        fontSize: "clamp(18px, 2.2vw, 24px)",
                        fontStyle: "italic",
                        fontWeight: 400,
                        color: "rgba(242,238,232,0.85)",
                        lineHeight: 1.7,
                        letterSpacing: "0.01em",
                        marginBottom: "40px",
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      {t.quote}
                    </p>

                    {/* Rider info */}
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      {/* Avatar initials */}
                      <div
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "50%",
                          background: "rgba(201,169,110,0.15)",
                          border: "1px solid rgba(201,169,110,0.25)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "'Cormorant Garant', serif",
                          fontSize: "16px",
                          fontWeight: 600,
                          color: "#C9A96E",
                          flexShrink: 0,
                        }}
                      >
                        {t.initials}
                      </div>
                      <div>
                        <p
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "14px",
                            fontWeight: 500,
                            color: "#F2EEE8",
                            marginBottom: "3px",
                          }}
                        >
                          {t.name}
                        </p>
                        <p
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "12px",
                            fontWeight: 300,
                            color: "rgba(242,238,232,0.45)",
                            letterSpacing: "0.04em",
                          }}
                        >
                          {t.role} · {t.country}
                        </p>
                      </div>
                      <div style={{ marginLeft: "auto" }}>
                        <span
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "10px",
                            fontWeight: 400,
                            color: "rgba(201,169,110,0.6)",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            border: "1px solid rgba(201,169,110,0.2)",
                            padding: "4px 10px",
                            borderRadius: "1px",
                          }}
                        >
                          {t.program}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "32px",
                }}
              >
                {/* Dots */}
                <div style={{ display: "flex", gap: "8px" }}>
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setDirection(i > current ? 1 : -1);
                        setCurrent(i);
                      }}
                      style={{
                        width: i === current ? "24px" : "6px",
                        height: "6px",
                        borderRadius: "3px",
                        background: i === current ? "#C9A96E" : "rgba(255,255,255,0.2)",
                        border: "none",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        padding: 0,
                      }}
                    />
                  ))}
                </div>

                {/* Arrows */}
                <div style={{ display: "flex", gap: "12px" }}>
                  <button
                    onClick={prev}
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      background: "transparent",
                      border: "1px solid rgba(255,255,255,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      color: "rgba(242,238,232,0.6)",
                      transition: "all 0.25s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#C9A96E";
                      e.currentTarget.style.color = "#C9A96E";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                      e.currentTarget.style.color = "rgba(242,238,232,0.6)";
                    }}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={next}
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      background: "transparent",
                      border: "1px solid rgba(255,255,255,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      color: "rgba(242,238,232,0.6)",
                      transition: "all 0.25s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#C9A96E";
                      e.currentTarget.style.color = "#C9A96E";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                      e.currentTarget.style.color = "rgba(242,238,232,0.6)";
                    }}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Trust indicators */}
          <FadeIn delay={0.2}>
            <div
              style={{
                display: "flex",
                gap: "40px",
                justifyContent: "center",
                flexWrap: "wrap",
                marginTop: "72px",
                paddingTop: "48px",
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {[
                { value: "5.0", label: "Average Rating" },
                { value: "300+", label: "International Riders" },
                { value: "98%", label: "Would Recommend" },
                { value: "8", label: "Countries" },
              ].map((item) => (
                <div key={item.label} style={{ textAlign: "center", minWidth: "100px" }}>
                  <p
                    style={{
                      fontFamily: "'Cormorant Garant', serif",
                      fontSize: "clamp(28px, 3vw, 40px)",
                      fontWeight: 600,
                      color: "#C9A96E",
                      lineHeight: 1,
                      marginBottom: "8px",
                    }}
                  >
                    {item.value}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "12px",
                      fontWeight: 300,
                      color: "rgba(242,238,232,0.35)",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
