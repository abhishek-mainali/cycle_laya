import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { useContent } from "@/hooks/useContent";

export default function Terms() {
    const { content: settings, loading } = useContent("settings");

    if (loading) return null;

    return (
        <div style={{ background: "#0A0906", color: "#F2EEE8", fontFamily: "'Inter', sans-serif", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Navigation />
            <main style={{ flex: 1, paddingTop: "120px", paddingBottom: "80px", paddingLeft: "24px", paddingRight: "24px" }}>
                <div style={{ maxWidth: "800px", margin: "0 auto", paddingTop: "120px" }}>
                    <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "48px", fontWeight: 600, color: "#C9A96E", marginBottom: "40px" }}>
                        Terms & Conditions
                    </h1>
                    <div style={{ 
                        fontSize: "16px", 
                        lineHeight: "1.8", 
                        color: "rgba(242,238,232,0.8)", 
                        whiteSpace: "pre-wrap" 
                    }}>
                        {settings["terms_conditions"]?.text || "Terms & Conditions content is coming soon."}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
