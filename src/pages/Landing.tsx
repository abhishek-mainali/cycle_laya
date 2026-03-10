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

export default function Landing() {
    useEffect(() => {
        // Smooth scroll behavior
        document.documentElement.style.scrollBehavior = "smooth";
        // Dark background
        document.documentElement.style.background = "#0A0906";
        document.body.style.background = "#0A0906";
        return () => {
            document.documentElement.style.scrollBehavior = "";
        };
    }, []);

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
