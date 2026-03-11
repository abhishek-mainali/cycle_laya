import { useEffect } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { Hero } from "@/components/sections/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { Founder } from "@/components/sections/Founder";
import { Programs } from "@/components/sections/Programs";
import { Testimonials } from "@/components/sections/Testimonials";
import { Trails } from "@/components/sections/Trails";
import { CallToAction } from "@/components/sections/CallToAction";
import { Footer } from "@/components/layout/Footer";
import { useContent } from "@/hooks/useContent";
import { Mountain } from "lucide-react";

export default function Landing() {
    const { content: settings, loading } = useContent("settings");

    useEffect(() => {
        // Update Metadata
        const siteTitle = settings["site_title"]?.content || "CycleLaya | Elite Himalayan MTB";
        const metaDesc = settings["meta_description"]?.content || "Elite mountain bike coaching in the heart of Nepal's Himalayas.";
        
        document.title = siteTitle;
        const metaDescTag = document.querySelector('meta[name="description"]');
        if (metaDescTag) metaDescTag.setAttribute("content", metaDesc);

        // Social Metadata (Open Graph)
        const updateMeta = (property: string, content: string) => {
            if (!content) return;
            let tag = document.querySelector(`meta[property="${property}"]`);
            if (!tag) {
                tag = document.createElement('meta');
                tag.setAttribute('property', property);
                document.head.appendChild(tag);
            }
            tag.setAttribute('content', content);
        };

        updateMeta("og:title", siteTitle);
        updateMeta("og:description", metaDesc);
        if (settings["social_image"]?.image_url) {
            updateMeta("og:image", settings["social_image"].image_url);
        }

        // Analytics Script Injection
        const analyticsScript = settings["analytics_script"]?.content;
        if (analyticsScript) {
            // Remove existing injected script if any
            const existingScript = document.getElementById('injected-analytics');
            if (existingScript) existingScript.remove();

            const scriptContainer = document.createElement('div');
            scriptContainer.id = 'injected-analytics';
            scriptContainer.innerHTML = analyticsScript;
            
            // Execute scripts inside the container
            const scripts = scriptContainer.querySelectorAll('script');
            scripts.forEach(oldScript => {
                const newScript = document.createElement('script');
                Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
                newScript.appendChild(document.createTextNode(oldScript.innerHTML));
                oldScript.parentNode?.replaceChild(newScript, oldScript);
            });

            document.head.appendChild(scriptContainer);
        }

        // Smooth scroll behavior
        document.documentElement.style.scrollBehavior = "smooth";
        document.documentElement.style.background = "#0A0906";
        document.body.style.background = "#0A0906";
        return () => {
            document.documentElement.style.scrollBehavior = "";
        };
    }, [settings]);

    if (loading) return null;

    if (settings["maintenance_mode"]?.content === "true") {
        return <MaintenanceView settings={settings} />;
    }

    return (
        <div
            style={{
                background: "#0A0906",
                color: "#F2EEE8",
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                overflowX: "hidden",
                minHeight: "100vh",
            }}
        >
            <Navigation />
            <Hero />
            <Philosophy />
            <Founder />
            <Programs />
            <Testimonials />
            <Trails />
            <CallToAction />
            <Footer />
        </div>
    );
}

function MaintenanceView({ settings }: any) {
    return (
        <div style={{ height: "100vh", background: "#0A0906", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "24px" }}>
            <div style={{ marginBottom: "40px", color: "#C9A96E" }}>
                <Mountain size={64} strokeWidth={1} />
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "42px", fontWeight: 600, color: "#F2EEE8", marginBottom: "16px" }}>Experience is Being Crafted</h1>
            <p style={{ fontSize: "16px", color: "rgba(242,238,232,0.5)", maxWidth: "500px", lineHeight: "1.6", marginBottom: "40px" }}>
                CycleLaya is currently under maintenance. We're refining the flow and sharpening the lines for an even better Himalayan journey. 
            </p>
            <div style={{ padding: "12px 24px", background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.2)", borderRadius: "2px" }}>
                <p style={{ fontSize: "12px", color: "#C9A96E", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>Returning Soon</p>
            </div>
            <div style={{ position: "fixed", bottom: "40px", width: "100%", textAlign: "center" }}>
                <p style={{ fontSize: "11px", opacity: 0.2 }}>© 2026 CycleLaya. Ride with Laya.</p>
            </div>
        </div>
    );
}
