import { Instagram, Youtube, Facebook, Mail } from "lucide-react";
import { useContent } from "@/hooks/useContent";
import logoImg from "@/assets/images/logo/logo.png";

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
  const { content: settings } = useContent("settings");
  
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
              <img 
                src={settings["site_logo"]?.image_url || logoImg} 
                alt="CycleLaya Logo" 
                style={{ width: "28px", height: "20px", objectFit: "contain" }} 
              />
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
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
                { icon: <Instagram size={16} />, label: "Instagram", url: settings["instagram"]?.content },
                { icon: <Youtube size={16} />, label: "YouTube", url: settings["youtube"]?.content },
                { icon: <Facebook size={16} />, label: "Facebook", url: settings["facebook"]?.content },
                { icon: <Mail size={16} />, label: "Email", url: settings["contact_email"]?.content ? `mailto:${settings["contact_email"].content}` : null },
              ].map((social) => (
                <a
                  key={social.label}
                  title={social.label}
                  href={social.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
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
                    textDecoration: "none"
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
                </a>
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
            <a
              href="/privacy"
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
                textDecoration: "none"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(242,238,232,0.5)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(242,238,232,0.2)")}
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
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
                textDecoration: "none"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(242,238,232,0.5)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(242,238,232,0.2)")}
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
