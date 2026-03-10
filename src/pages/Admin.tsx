import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Loader2, Mail, MapPin, Calendar, User, MessageSquare, Tag, LogOut } from "lucide-react";

interface Application {
    id: string;
    created_at: string;
    name: string;
    email: string;
    country: string;
    program: string;
    message: string;
}

export default function Admin() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                navigate("/login");
            } else {
                fetchApplications();
            }
        };

        checkAuth();
    }, [navigate]);

    async function fetchApplications() {
        try {
            setLoading(true);
            const { data, error: fetchError } = await supabase
                .from("applications")
                .select("*")
                .order("created_at", { ascending: false });

            if (fetchError) throw fetchError;
            setApplications(data || []);
        } catch (err: any) {
            console.error("Error fetching applications:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/login");
    };

    return (
        <div style={{ minHeight: "100vh", background: "#0A0906", color: "#F2EEE8", padding: "60px 24px" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "48px" }}>
                    <div>
                        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "42px", fontWeight: 600, marginBottom: "8px" }}>
                            Submissions Dashboard
                        </h1>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "rgba(242,238,232,0.5)", letterSpacing: "0.02em" }}>
                            Review applications from riders around the world.
                        </p>
                    </div>
                    <div style={{ display: "flex", gap: "12px" }}>
                        <button
                            onClick={fetchApplications}
                            style={{
                                background: "rgba(201,169,110,0.1)",
                                border: "1px solid rgba(201,169,110,0.2)",
                                color: "#C9A96E",
                                padding: "10px 20px",
                                borderRadius: "4px",
                                fontSize: "12px",
                                textTransform: "uppercase",
                                letterSpacing: "0.1em",
                                cursor: "pointer"
                            }}
                        >
                            Refresh
                        </button>
                        <button
                            onClick={handleLogout}
                            style={{
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                color: "rgba(255,255,255,0.6)",
                                padding: "10px 20px",
                                borderRadius: "4px",
                                fontSize: "12px",
                                textTransform: "uppercase",
                                letterSpacing: "0.1em",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px"
                            }}
                        >
                            <LogOut size={14} /> Log Out
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div style={{ display: "flex", justifyContent: "center", padding: "100px 0" }}>
                        <Loader2 className="animate-spin" size={32} color="#C9A96E" />
                    </div>
                ) : error ? (
                    <div style={{ padding: "40px", background: "rgba(232,64,64,0.05)", border: "1px solid rgba(232,64,64,0.2)", borderRadius: "4px", textAlign: "center" }}>
                        <p style={{ color: "#E84040" }}>Error: {error}</p>
                    </div>
                ) : applications.length === 0 ? (
                    <div style={{ padding: "100px 0", textAlign: "center", opacity: 0.5 }}>
                        <p>No applications received yet.</p>
                    </div>
                ) : (
                    <div style={{ display: "grid", gap: "24px" }}>
                        {applications.map((app) => (
                            <div
                                key={app.id}
                                style={{
                                    background: "rgba(255,255,255,0.02)",
                                    border: "1px solid rgba(255,255,255,0.05)",
                                    borderRadius: "8px",
                                    padding: "32px",
                                    transition: "border-color 0.3s ease",
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(201,169,110,0.3)"}
                                onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"}
                            >
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "24px", marginBottom: "24px" }}>
                                    <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                                        <User size={16} style={{ color: "#C9A96E", marginTop: "2px" }} />
                                        <div>
                                            <p style={{ fontSize: "11px", textTransform: "uppercase", opacity: 0.4, letterSpacing: "0.1em", marginBottom: "4px" }}>Name</p>
                                            <p style={{ fontSize: "16px", fontWeight: 500 }}>{app.name}</p>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                                        <Mail size={16} style={{ color: "#C9A96E", marginTop: "2px" }} />
                                        <div>
                                            <p style={{ fontSize: "11px", textTransform: "uppercase", opacity: 0.4, letterSpacing: "0.1em", marginBottom: "4px" }}>Email</p>
                                            <p style={{ fontSize: "16px", fontWeight: 300 }}>{app.email}</p>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                                        <Tag size={16} style={{ color: "#C9A96E", marginTop: "2px" }} />
                                        <div>
                                            <p style={{ fontSize: "11px", textTransform: "uppercase", opacity: 0.4, letterSpacing: "0.1em", marginBottom: "4px" }}>Program</p>
                                            <p style={{ fontSize: "16px", fontWeight: 400, color: "#F2EEE8" }}>{app.program || "General Inquiry"}</p>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                                        <MapPin size={16} style={{ color: "#C9A96E", marginTop: "2px" }} />
                                        <div>
                                            <p style={{ fontSize: "11px", textTransform: "uppercase", opacity: 0.4, letterSpacing: "0.1em", marginBottom: "4px" }}>Country</p>
                                            <p style={{ fontSize: "16px", fontWeight: 300 }}>{app.country || "N/A"}</p>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "24px" }}>
                                    <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                                        <MessageSquare size={16} style={{ color: "#C9A96E", marginTop: "2px" }} />
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontSize: "11px", textTransform: "uppercase", opacity: 0.4, letterSpacing: "0.1em", marginBottom: "8px" }}>Message / Story</p>
                                            <p style={{ fontSize: "14px", lineHeight: "1.6", fontWeight: 300, color: "rgba(242,238,232,0.8)" }}>{app.message}</p>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginTop: "24px", textAlign: "right" }}>
                                    <span style={{ fontSize: "11px", opacity: 0.3, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "6px" }}>
                                        <Calendar size={12} />
                                        {new Date(app.created_at).toLocaleDateString()} at {new Date(app.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
