import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Phone, Heart, Mountain } from "lucide-react";
import { useContent } from "@/hooks/useContent";
import logoImg from "@/assets/images/logo/logo.png";

const navLinks = [
  { label: "Philosophy", href: "#philosophy" },
  { label: "Founder", href: "#founder" },
  { label: "Programs", href: "#programs" },
  { label: "Trails", href: "#trails" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { content: settings } = useContent("settings");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    
    handleScroll();
    handleResize();
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const bannerActive = settings["banner_active"]?.content === "true";
  const bannerText = settings["banner_text"]?.content || "Ride With Rhythm. Flow with the Mountain.";
  const siteLogo = settings["site_logo"]?.image_url;

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Top Banner */}
      <div 
        style={{ 
          height: bannerActive ? "32px" : "0px",
          overflow: "hidden",
          transition: "height 0.3s ease",
          background: "linear-gradient(to right, #C9A96E, #A68B56)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1001
        }}
      >
        <p style={{ color: "#0A0906", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>{bannerText}</p>
      </div>

      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          position: "fixed",
          top: bannerActive ? "32px" : "0",
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          background: scrolled ? "rgba(10, 9, 6, 0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          padding: scrolled ? "16px 0" : "28px 0",
          borderBottom: scrolled ? "1px solid rgba(255, 255, 255, 0.05)" : "1px solid transparent",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "72px",
          }}
        >
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "8px" : "10px" }}>
              <MountainLogo isMobile={isMobile} siteLogo={siteLogo} />
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: isMobile ? "18px" : "22px",
                  fontWeight: 600,
                  color: "#F2EEE8",
                  letterSpacing: "0.06em",
                }}
              >
                CycleLaya
              </span>
            </div>
          </button>

          {/* Desktop Links */}
          <div 
            style={{ 
              display: isMobile ? "none" : "flex", 
              alignItems: "center", 
              gap: "40px" 
            }} 
            className="hidden md:flex"
          >
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "rgba(242, 238, 232, 0.7)",
                  fontSize: "13px",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  transition: "color 0.2s ease",
                  padding: 0,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A96E")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(242, 238, 232, 0.7)")}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#contact")}
              style={{
                background: "transparent",
                border: "1px solid #C9A96E",
                borderRadius: "2px",
                color: "#C9A96E",
                fontSize: "12px",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "10px 22px",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#C9A96E";
                e.currentTarget.style.color = "#0A0906";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#C9A96E";
              }}
            >
              Begin Journey
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#F2EEE8",
              padding: "8px",
            }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              position: "fixed",
              top: bannerActive ? "104px" : "72px",
              left: 0,
              right: 0,
              zIndex: 99,
              background: "rgba(10, 9, 6, 0.98)",
              backdropFilter: "blur(40px)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              padding: "0 32px 40px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "32px",
                paddingTop: "32px"
              }}
            >
              {navLinks.map((link, i) => (
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  key={link.href}
                  onClick={() => {
                    setMobileOpen(false);
                    scrollTo(link.href);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#F2EEE8",
                    fontSize: "20px",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 500,
                    textAlign: "left",
                    padding: 0,
                    letterSpacing: "0.04em",
                  }}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => {
                  setMobileOpen(false);
                  scrollTo("#contact");
                }}
                style={{
                  background: "#C9A96E",
                  border: "none",
                  borderRadius: "2px",
                  color: "#0A0906",
                  fontSize: "12px",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "16px 24px",
                  cursor: "pointer",
                  marginTop: "8px",
                  textAlign: "center",
                }}
              >
                Begin Journey
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MountainLogo({ isMobile, siteLogo }: { isMobile?: boolean, siteLogo?: string }) {
  return (
    <img
      src={siteLogo || logoImg}
      alt="CycleLaya Logo"
      style={{ width: isMobile ? "24px" : "32px", height: isMobile ? "24px" : "32px", objectFit: "contain" }}
    />
  );
}
