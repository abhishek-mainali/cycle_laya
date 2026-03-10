import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Loader2, Lock, Mail, ArrowRight } from "lucide-react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if already logged in
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                navigate("/admin");
            }
        });
    }, [navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (authError) throw authError;
            navigate("/admin");
        } catch (err: any) {
            console.error("Login error:", err);
            setError(err.message || "Invalid credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: "100vh",
            background: "#0A0906",
            color: "#F2EEE8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px"
        }}>
            <div style={{
                width: "100%",
                maxWidth: "400px",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: "8px",
                padding: "48px 32px"
            }}>
                <div style={{ textAlign: "center", marginBottom: "40px" }}>
                    <div style={{
                        width: "48px",
                        height: "48px",
                        background: "rgba(201,169,110,0.1)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 16px"
                    }}>
                        <Lock size={20} color="#C9A96E" />
                    </div>
                    <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "32px", fontWeight: 600 }}>
                        Admin Access
                    </h1>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "rgba(242,238,232,0.5)", marginTop: "8px" }}>
                        Sign in to manage submissions.
                    </p>
                </div>

                <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div>
                        <label style={{ display: "block", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.4, marginBottom: "8px" }}>
                            Email Address
                        </label>
                        <div style={{ position: "relative" }}>
                            <Mail size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", opacity: 0.3 }} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                style={{
                                    width: "100%",
                                    background: "rgba(255,255,255,0.04)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    borderRadius: "4px",
                                    padding: "12px 12px 12px 38px",
                                    color: "#F2EEE8",
                                    fontSize: "14px",
                                    outline: "none",
                                    boxSizing: "border-box"
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: "block", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.4, marginBottom: "8px" }}>
                            Password
                        </label>
                        <div style={{ position: "relative" }}>
                            <Lock size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", opacity: 0.3 }} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                style={{
                                    width: "100%",
                                    background: "rgba(255,255,255,0.04)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    borderRadius: "4px",
                                    padding: "12px 12px 12px 38px",
                                    color: "#F2EEE8",
                                    fontSize: "14px",
                                    outline: "none",
                                    boxSizing: "border-box"
                                }}
                            />
                        </div>
                    </div>

                    {error && (
                        <p style={{ color: "#E84040", fontSize: "13px", textAlign: "center" }}>{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            background: "#C9A96E",
                            color: "#0A0906",
                            border: "none",
                            borderRadius: "4px",
                            padding: "14px",
                            fontSize: "12px",
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            cursor: loading ? "not-allowed" : "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            marginTop: "12px",
                            transition: "transform 0.2s ease, background 0.2s ease"
                        }}
                        onMouseEnter={(e) => !loading && (e.currentTarget.style.background = "#d4b57a")}
                        onMouseLeave={(e) => !loading && (e.currentTarget.style.background = "#C9A96E")}
                    >
                        {loading ? <Loader2 className="animate-spin" size={16} /> : <>Sign In <ArrowRight size={14} /></>}
                    </button>
                </form>
            </div>
        </div>
    );
}
