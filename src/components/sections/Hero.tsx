"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React, { useRef } from "react";

const Hero = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    // Split text animation variants
    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            rotateX: -20,
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 100,
            },
        },
    };

    const text = "Crafting Digital Gravity".split(" ");

    return (
        <section
            ref={ref}
            className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 pt-20"
        >
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-[128px] mix-blend-screen" />
                <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-purple-500/20 blur-[128px] mix-blend-screen" />
            </div>

            <motion.div
                style={{ y, opacity }}
                className="container mx-auto flex flex-col items-center text-center"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-6 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary backdrop-blur-sm"
                >
                    <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                    Accepting New Clients for 2026
                </motion.div>

                <motion.h1
                    className="max-w-6xl text-5xl font-bold tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl flex flex-wrap justify-center"
                    variants={container}
                    initial="hidden"
                    animate="visible"
                >
                    {text.map((word, index) => (
                        <motion.span
                            key={index}
                            variants={child}
                            className="mr-2 inline-block bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent pb-4"
                        >
                            {word}
                        </motion.span>
                    ))}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
                >
                    We engineer the force that pulls brands upward.
                    Where aesthetic mastery meets merciless performance.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1 }}
                    className="mt-10 flex flex-wrap justify-center gap-4"
                >
                    <Button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} size="lg" className="rounded-full h-12 px-8 text-base overflow-hidden">
                        Start a Project <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button onClick={() => document.getElementById("works")?.scrollIntoView({ behavior: "smooth" })} size="lg" variant="outline" className="rounded-full h-12 px-8 text-base glass hover:bg-white/20">
                        View Our Work
                    </Button>
                </motion.div>
            </motion.div>

            {/* 3D Floating Element Placeholder - CSS Abstract Shape */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, -5, 0],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute -right-20 top-1/3 -z-10 h-64 w-64 rounded-[3rem] bg-gradient-to-br from-primary to-purple-600 opacity-20 blur-3xl md:h-96 md:w-96 md:opacity-30"
            />
        </section>
    );
};

export default Hero;
