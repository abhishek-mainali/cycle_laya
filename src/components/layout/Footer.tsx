import { Instagram, Youtube, Facebook, Mail } from "lucide-react";

const PRAYER_FLAG_COLORS = ["#3B7DD8", "#E8E4DC", "#E84040", "#4CAF73", "#F5C842"];

const footerLinks = {
  Experience: [
    { label: "Philosophy", href: "#philosophy" },
    { label: "Programs", href: "#programs" },
    { label: "Trail Experiences", href: "#trails" },
    { label: "Testimonials", href: "#testimonials" },
  ],
  Company: [
    { label: "About Nirav", href: "#founder" },
    { label: "Contact", href: "#contact" },
    { label: "FAQs", href: "#" },
    { label: "Blog", href: "#" },
  ],
  Programs: [
    { label: "Trail Fundamentals", href: "#programs" },
    { label: "Elite Trail Mastery", href: "#programs" },
    { label: "Private Expedition", href: "#programs" },
    { label: "Custom Programs", href: "#contact" },
  ],
};

export function Footer() {
  const scrollTo = (href: string) => {
    if (href === "#") return;
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      style={{
        background: "#050503",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        position: "relative",
      }}
    >
      {/* Prayer flag strip */}
      <div style={{ display: "flex", height: "2px" }}>
        {PRAYER_FLAG_COLORS.map((color, i) => (
          <div key={i} style={{ flex: 1, background: color, opacity: 0.5 }} />
        ))}
      </div>

      {/* Main footer */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "80px 24px 48px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "56px",
            marginBottom: "72px",
          }}
        >
          {/* Brand column */}
          <div style={{ gridColumn: "span 1" }}>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2 18 L9 6 L13 12 L16 8 L22 2 L26 18 Z"
                  stroke="#C9A96E"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
              <span
                style={{
                  fontFamily: "'Cormorant Garant', serif",
                  fontSize: "20px",
                  fontWeight: 600,
                  color: "#F2EEE8",
                  letterSpacing: "0.06em",
                }}
              >
                CycleLaya
              </span>
            </div>

            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                fontWeight: 300,
                color: "rgba(242,238,232,0.35)",
                lineHeight: 1.8,
                letterSpacing: "0.01em",
                marginBottom: "24px",
                maxWidth: "220px",
              }}
            >
              Elite mountain bike coaching in the heart of Nepal's Himalayas. Ride with rhythm. Flow with the mountain.
            </p>

            {/* Nepali tagline */}
            <p
              style={{
                fontFamily: "'Cormorant Garant', serif",
                fontSize: "16px",
                fontStyle: "italic",
                fontWeight: 400,
                color: "rgba(201,169,110,0.5)",
                letterSpacing: "0.04em",
                marginBottom: "24px",
              }}
            >
              लय — Ride with Laya
            </p>

            {/* Social icons */}
            <div style={{ display: "flex", gap: "12px" }}>
              {[
                { icon: <Instagram size={16} />, label: "Instagram" },
                { icon: <Youtube size={16} />, label: "YouTube" },
                { icon: <Facebook size={16} />, label: "Facebook" },
                { icon: <Mail size={16} />, label: "Email" },
              ].map((social) => (
                <button
                  key={social.label}
                  title={social.label}
                  style={{
                    width: "36px",
                    height: "36px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "50%",
                    background: "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "rgba(242,238,232,0.35)",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(201,169,110,0.4)";
                    e.currentTarget.style.color = "#C9A96E";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.color = "rgba(242,238,232,0.35)";
                  }}
                >
                  {social.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "11px",
                  fontWeight: 500,
                  color: "rgba(242,238,232,0.3)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: "20px",
                }}
              >
                {category}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {links.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => scrollTo(link.href)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "rgba(242,238,232,0.4)",
                      fontSize: "13px",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 300,
                      letterSpacing: "0.02em",
                      textAlign: "left",
                      padding: 0,
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A96E")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(242,238,232,0.4)")}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            paddingTop: "32px",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              fontWeight: 300,
              color: "rgba(242,238,232,0.2)",
              letterSpacing: "0.04em",
            }}
          >
            © 2026 CycleLaya. All rights reserved. Crafted in the Heart of Nepal.
          </p>
          <div style={{ display: "flex", gap: "24px" }}>
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <button
                key={item}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "rgba(242,238,232,0.2)",
                  fontSize: "12px",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 300,
                  letterSpacing: "0.04em",
                  padding: 0,
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(242,238,232,0.5)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(242,238,232,0.2)")}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
