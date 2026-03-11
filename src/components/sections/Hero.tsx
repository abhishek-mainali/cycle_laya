import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useContent } from "@/hooks/useContent";

const HERO_IMAGE = "https://images.unsplash.com/photo-1729455192378-a3347584fb71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGJpa2UlMjB0cmFpbCUyMGFlcmlhbCUyMG92ZXJoZWFkJTIwdmlld3xlbnwxfHx8fDE3NzMxMTI2OTR8MA&ixlib=rb-4.1.0&q=80&w=1920";

const PRAYER_FLAG_COLORS = ["#3B7DD8", "#E8E4DC", "#E84040", "#4CAF73", "#F5C842"];

export function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const { content, loading } = useContent("hero");
  const [imageLoaded, setImageLoaded] = useState(false);

  // Fallback values
  const eyebrow = content['eyebrow']?.text || "Nepal · Himalaya · Trail";
  const headline = content['headline']?.text || "Ride with Rhythm.";
  const headlineItalic = content['headline_italic']?.text || "Flow with the Mountain.";
  const tagline = content['tagline']?.text || "Elite mountain bike coaching in the heart of the Himalayas, guided by Nirav Shrestha & the spirit of Laya.";
  const heroImage = content['image']?.image || HERO_IMAGE;

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Preload image to ensure smooth transition
  useEffect(() => {
    if (heroImage) {
      const img = new Image();
      img.src = heroImage;
      img.onload = () => setImageLoaded(true);
    }
  }, [heroImage]);

  const scrollToPhilosophy = () => {
    document.querySelector("#philosophy")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToPrograms = () => {
    document.querySelector("#programs")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      style={{
        position: "relative",
        height: "100dvh",
        minHeight: "700px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#0A0906", // Solid background while loading
      }}
    >
      {/* Background image with parallax and smooth fade-in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: (imageLoaded && !loading) ? 1 : 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          position: "absolute",
          inset: 0,
          transform: `translateY(${scrollY * 0.3}px)`,
          willChange: "transform",
        }}
      >
        <img
          src={heroImage}
          alt="Mountain biker on Nepal trails"
          style={{
            width: "100%",
            height: "130%",
            objectFit: "cover",
            objectPosition: "center 30%",
          }}
        />
      </motion.div>

      {/* Gradient overlays */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            `linear-gradient(to bottom, rgba(10,9,6,${(content['overlay_opacity']?.text || 55) / 100}) 0%, rgba(10,9,6,0.2) 40%, rgba(10,9,6,0.65) 80%, rgba(10,9,6,0.95) 100%)`,
        }}
      />

      {/* Prayer flag color strip — top */}
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
          <div key={i} style={{ flex: 1, background: color, opacity: 0.85 }} />
        ))}
      </div>

      {/* Main content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          padding: "0 24px",
          maxWidth: "960px",
          margin: "0 auto",
        }}
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.3em" }}
          animate={{ opacity: 1, letterSpacing: "0.22em" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "11px",
            fontWeight: 400,
            color: "#C9A96E",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            marginBottom: "28px",
          }}
        >
          {eyebrow}
        </motion.p>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(48px, 10vw, 112px)",
            fontWeight: 600,
            color: "#F2EEE8",
            lineHeight: 1.0,
            letterSpacing: "-0.01em",
            marginBottom: "0",
          }}
        >
          {headline}
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(48px, 10vw, 112px)",
            fontWeight: 300,
            fontStyle: "italic",
            color: "#F2EEE8",
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            marginBottom: "32px",
          }}
        >
          {headlineItalic}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(15px, 1.8vw, 18px)",
            fontWeight: 300,
            color: "rgba(242, 238, 232, 0.75)",
            letterSpacing: "0.04em",
            lineHeight: 1.6,
            marginBottom: "48px",
            maxWidth: "560px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}
        >
          <button
            onClick={scrollToContact}
            style={{
              background: "#C9A96E",
              border: "none",
              borderRadius: "2px",
              color: "#0A0906",
              fontSize: "12px",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "16px 36px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#d4b57a";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#C9A96E";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Begin Your Journey
          </button>
          <button
            onClick={scrollToPrograms}
            style={{
              background: "transparent",
              border: "1px solid rgba(242, 238, 232, 0.4)",
              borderRadius: "2px",
              color: "#F2EEE8",
              fontSize: "12px",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "16px 36px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(242, 238, 232, 0.8)";
              e.currentTarget.style.background = "rgba(242, 238, 232, 0.06)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(242, 238, 232, 0.4)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            Explore Programs
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        onClick={scrollToPhilosophy}
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          color: "rgba(242, 238, 232, 0.5)",
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "10px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontWeight: 400,
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.button>

      {/* Prayer flag strip — bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "2px",
          display: "flex",
        }}
      >
        {PRAYER_FLAG_COLORS.map((color, i) => (
          <div key={i} style={{ flex: 1, background: color, opacity: 0.5 }} />
        ))}
      </div>
    </section>
  );
}
