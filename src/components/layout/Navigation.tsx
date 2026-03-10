import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: "background 0.4s ease, backdrop-filter 0.4s ease",
          background: scrolled ? "rgba(10, 9, 6, 0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
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
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <MountainLogo />
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "22px",
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
          <div style={{ display: "flex", alignItems: "center", gap: "40px" }} className="hidden md:flex">
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
              top: "72px",
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

function MountainLogo() {
  return (
    <img
      src={logoImg}
      alt="CycleLaya Logo"
      style={{ width: "32px", height: "32px", objectFit: "contain" }}
    />
  );
}
