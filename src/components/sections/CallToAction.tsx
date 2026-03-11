import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight, Mail, MapPin, Instagram, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useContent } from "@/hooks/useContent";

const PRAYER_FLAG_COLORS = ["#3B7DD8", "#E8E4DC", "#E84040", "#4CAF73", "#F5C842"];

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

export function CallToAction() {
  const { content } = useContent("cta");
  const headline = content['headline']?.text || "Your Laya Awaits.";
  const subtext = content['subtext']?.text || "Tell us about your riding. We'll craft an experience\nthat transforms the way you move.";
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    country: "",
    program: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { error: submitError } = await supabase
        .from('applications')
        .insert([
          {
            name: formState.name,
            email: formState.email,
            country: formState.country,
            program: formState.program,
            message: formState.message,
          },
        ]);

      if (submitError) throw submitError;

      setSubmitted(true);
    } catch (err: any) {
      console.error('Submission error:', err);
      setError('Something went wrong. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "2px",
    color: "#F2EEE8",
    fontFamily: "'Inter', sans-serif",
    fontSize: "14px",
    fontWeight: 300,
    padding: "14px 18px",
    outline: "none",
    transition: "border-color 0.25s ease",
    letterSpacing: "0.01em",
    boxSizing: "border-box",
  };

  return (
    <section
      id="contact"
      style={{
        background: "#080705",
        padding: "140px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top border glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(to right, transparent 0%, rgba(201,169,110,0.5) 50%, transparent 100%)",
        }}
      />

      {/* Background radial accent */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "800px",
          background: "radial-gradient(ellipse at center, rgba(201,169,110,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Himalayan silhouette */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          opacity: 0.08,
          pointerEvents: "none",
        }}
      >
        <svg viewBox="0 0 1440 220" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%" }} preserveAspectRatio="none">
          <path d="M0,220 L0,170 L90,110 L170,145 L260,75 L350,125 L440,55 L520,105 L600,30 L680,85 L740,18 L800,68 L860,35 L920,72 L1000,22 L1080,62 L1150,42 L1220,75 L1280,32 L1360,68 L1440,45 L1440,220 Z" fill="#C9A96E" />
        </svg>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Header */}
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: "96px" }}>
            <p
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
              Start Your Journey
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(48px, 7vw, 96px)",
                fontWeight: 600,
                color: "#F2EEE8",
                lineHeight: 1.0,
                letterSpacing: "-0.02em",
                marginBottom: "16px",
              }}
            >
              {headline}
            </h2>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(18px, 2.2vw, 24px)",
                fontStyle: "italic",
                fontWeight: 300,
                color: "rgba(242,238,232,0.55)",
                lineHeight: 1.5,
                letterSpacing: "0.01em",
                marginBottom: "0",
                maxWidth: "540px",
                margin: "0 auto",
              }}
            >
              {subtext.split('\n').map((line: string, i: number) => (
                <span key={i}>
                  {line}
                  {i === 0 && <br className="hidden md:block" />}
                </span>
              ))}
            </p>
          </div>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "80px",
            alignItems: "start",
          }}
        >
          {/* Contact info */}
          <FadeIn delay={0.1}>
            <div>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(24px, 2.5vw, 32px)",
                  fontWeight: 600,
                  color: "#F2EEE8",
                  marginBottom: "24px",
                  letterSpacing: "0.01em",
                }}
              >
                Let's Ride Together
              </h3>
              <div
                style={{
                  width: "32px",
                  height: "1px",
                  background: "#C9A96E",
                  marginBottom: "28px",
                  opacity: 0.7,
                }}
              />
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                  fontWeight: 300,
                  color: "rgba(242,238,232,0.5)",
                  lineHeight: 1.85,
                  marginBottom: "40px",
                  letterSpacing: "0.01em",
                }}
              >
                Every CycleLaya journey begins with a conversation. Share your vision, your goals, your experience
                level — and Nirav will personally reach out to design your perfect Nepal riding experience.
              </p>

              {/* Contact details */}
              <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "48px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      border: "1px solid rgba(201,169,110,0.2)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Mail size={14} style={{ color: "#C9A96E" }} />
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Inter'", fontSize: "11px", color: "rgba(242,238,232,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "2px" }}>Email</p>
                    <p style={{ fontFamily: "'Inter'", fontSize: "14px", color: "rgba(242,238,232,0.7)", fontWeight: 300 }}>nirav@cyclelaya.com</p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      border: "1px solid rgba(201,169,110,0.2)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <MapPin size={14} style={{ color: "#C9A96E" }} />
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Inter'", fontSize: "11px", color: "rgba(242,238,232,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "2px" }}>Location</p>
                    <p style={{ fontFamily: "'Inter'", fontSize: "14px", color: "rgba(242,238,232,0.7)", fontWeight: 300 }}>Kathmandu, Nepal</p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      border: "1px solid rgba(201,169,110,0.2)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Instagram size={14} style={{ color: "#C9A96E" }} />
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Inter'", fontSize: "11px", color: "rgba(242,238,232,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "2px" }}>Instagram</p>
                    <p style={{ fontFamily: "'Inter'", fontSize: "14px", color: "rgba(242,238,232,0.7)", fontWeight: 300 }}>@cyclelaya</p>
                  </div>
                </div>
              </div>

              {/* Prayer flag colors strip */}
              <div style={{ display: "flex", height: "3px", borderRadius: "2px", overflow: "hidden", opacity: 0.6 }}>
                {PRAYER_FLAG_COLORS.map((color, i) => (
                  <div key={i} style={{ flex: 1, background: color }} />
                ))}
              </div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "11px",
                  fontWeight: 300,
                  color: "rgba(242,238,232,0.25)",
                  marginTop: "10px",
                  letterSpacing: "0.06em",
                }}
              >
                The five colors of Tibetan prayer flags — air, water, fire, earth, space.
              </p>
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn delay={0.2}>
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "11px",
                          fontWeight: 400,
                          color: "rgba(242,238,232,0.4)",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          marginBottom: "8px",
                        }}
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="First & Last"
                        style={inputStyle}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(201,169,110,0.5)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "11px",
                          fontWeight: 400,
                          color: "rgba(242,238,232,0.4)",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          marginBottom: "8px",
                        }}
                      >
                        Country
                      </label>
                      <input
                        type="text"
                        value={formState.country}
                        onChange={(e) => setFormState({ ...formState, country: e.target.value })}
                        placeholder="Where are you from?"
                        style={inputStyle}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(201,169,110,0.5)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "11px",
                        fontWeight: 400,
                        color: "rgba(242,238,232,0.4)",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginBottom: "8px",
                      }}
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="your@email.com"
                      style={inputStyle}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(201,169,110,0.5)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "11px",
                        fontWeight: 400,
                        color: "rgba(242,238,232,0.4)",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginBottom: "8px",
                      }}
                    >
                      Program of Interest
                    </label>
                    <select
                      value={formState.program}
                      onChange={(e) => setFormState({ ...formState, program: e.target.value })}
                      style={{
                        ...inputStyle,
                        cursor: "pointer",
                        appearance: "none",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23C9A96E' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 16px center",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(201,169,110,0.5)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                    >
                      <option value="" style={{ background: "#1a1814" }}>Select a program...</option>
                      <option value="fundamentals" style={{ background: "#1a1814" }}>Trail Fundamentals — 3 Days</option>
                      <option value="mastery" style={{ background: "#1a1814" }}>Elite Trail Mastery — 7 Days</option>
                      <option value="expedition" style={{ background: "#1a1814" }}>Private Himalayan Expedition — 14 Days</option>
                      <option value="custom" style={{ background: "#1a1814" }}>Custom / Bespoke Program</option>
                    </select>
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "11px",
                        fontWeight: 400,
                        color: "rgba(242,238,232,0.4)",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginBottom: "8px",
                      }}
                    >
                      Your Story
                    </label>
                    <textarea
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Tell us about your riding experience, goals, and what brings you to Nepal..."
                      rows={5}
                      style={{
                        ...inputStyle,
                        resize: "vertical",
                        minHeight: "120px",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(201,169,110,0.5)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>

                  {error && (
                    <p style={{ color: "#E84040", fontSize: "13px", textAlign: "center", fontFamily: "'Inter', sans-serif" }}>
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      background: isSubmitting ? "rgba(201,169,110,0.5)" : "#C9A96E",
                      border: "none",
                      borderRadius: "2px",
                      color: "#0A0906",
                      fontSize: "12px",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      padding: "16px 32px",
                      cursor: isSubmitting ? "not-allowed" : "pointer",
                      transition: "all 0.25s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      width: "100%",
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.background = "#d4b57a";
                        e.currentTarget.style.transform = "translateY(-1px)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.background = "#C9A96E";
                        e.currentTarget.style.transform = "translateY(0)";
                      }
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        Processing <Loader2 size={14} className="animate-spin" />
                      </>
                    ) : (
                      <>
                        Send My Application
                        <ArrowRight size={14} />
                      </>
                    )}
                  </button>

                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "12px",
                      fontWeight: 300,
                      color: "rgba(242,238,232,0.25)",
                      textAlign: "center",
                      letterSpacing: "0.02em",
                    }}
                  >
                    Nirav personally responds within 48 hours.
                  </p>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                style={{
                  background: "rgba(201,169,110,0.06)",
                  border: "1px solid rgba(201,169,110,0.2)",
                  borderRadius: "2px",
                  padding: "56px 40px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    border: "1px solid rgba(201,169,110,0.3)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 28px",
                  }}
                >
                  <span style={{ color: "#C9A96E", fontSize: "22px" }}>✓</span>
                </div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "28px",
                    fontWeight: 600,
                    color: "#F2EEE8",
                    marginBottom: "16px",
                    letterSpacing: "0.01em",
                  }}
                >
                  Application Received
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "14px",
                    fontWeight: 300,
                    color: "rgba(242,238,232,0.5)",
                    lineHeight: 1.8,
                    letterSpacing: "0.01em",
                  }}
                >
                  Thank you, {formState.name || "rider"}. Nirav will review your application and respond personally within 48 hours. Your Laya journey begins now.
                </p>
              </motion.div>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
