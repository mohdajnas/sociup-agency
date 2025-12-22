"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring, motion } from "framer-motion";

export function BackgroundEffect() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smoother, floatier spring animation to reduce jitter/stutter
    const springConfig = { damping: 30, stiffness: 150, mass: 0.8 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Center the 600px orb (radius 300px)
            mouseX.set(e.clientX - 300);
            mouseY.set(e.clientY - 300);
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [mouseX, mouseY]);

    return (
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
            {/* Primary Mouse Follower Orb */}
            <motion.div
                className="absolute left-0 top-0 h-[600px] w-[600px] rounded-full bg-primary/20 blur-[100px] will-change-transform"
                style={{
                    x: springX,
                    y: springY,
                }}
            />

            {/* Secondary Ambient Orbs (Static) */}
            <div className="absolute top-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-primary/10 blur-[120px]" />
            <div className="absolute bottom-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[120px]" />
        </div>
    );
}
