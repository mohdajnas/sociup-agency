"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { RegisterFreelancerDialog } from "@/components/RegisterFreelancerDialog";

export default function Hiring() {
    const [role, setRole] = useState<"client" | "freelancer">("client");

    const content = {
        client: {
            title: "Hire Top Talent",
            description: "Access a curated network of elite digital professionals ready to scale your business.",
            features: ["Vetted Experts", "Secure Payments", "Fast Turnaround"],
            cta: "Find Talent",
        },
        freelancer: {
            title: "Find Premium Work",
            description: "Join an exclusive network working with global brands on high-impact projects.",
            features: ["High-Ticket Projects", "Guaranteed Payment", "Global Clients"],
            cta: "Join as Freelancer",
        },
    };

    return (
        <section className="py-12 md:py-24 px-4 bg-muted/30">
            <div className="container mx-auto flex flex-col items-center">

                {/* Cleaner Toggle Implementation */}
                <div className="relative mb-12 inline-flex h-12 w-64 items-center justify-center rounded-full bg-muted p-1 text-muted-foreground">
                    <div
                        className="absolute inset-y-1 w-1/2 rounded-full bg-background shadow-md transition-all duration-300 ease-spring"
                        style={{ left: role === "client" ? "4px" : "calc(50% - 4px)", transform: role === "freelancer" ? "translateX(6px)" : "" }}
                    />
                    <motion.div
                        className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-background shadow-sm"
                        animate={{ x: role === "client" ? 0 : "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />

                    <button
                        onClick={() => setRole("client")}
                        className={`relative z-10 w-1/2 text-sm font-medium transition-colors ${role === "client" ? "text-foreground" : "text-muted-foreground"}`}
                    >
                        I&apos;m a Client
                    </button>
                    <button
                        onClick={() => setRole("freelancer")}
                        className={`relative z-10 w-1/2 text-sm font-medium transition-colors ${role === "freelancer" ? "text-foreground" : "text-muted-foreground"}`}
                    >
                        I&apos;m a Freelancer
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={role}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col items-center text-center max-w-2xl"
                    >
                        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
                            {content[role].title}
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            {content[role].description}
                        </p>

                        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 w-full">
                            {content[role].features.map((feature) => (
                                <li key={feature} className="flex items-center justify-center gap-2 p-4 rounded-xl border bg-background/50">
                                    <CheckCircle2 className="h-5 w-5 text-primary" />
                                    <span className="font-medium">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        {role === "client" ? (
                            <Button
                                size="lg"
                                className="rounded-full px-12 h-14 text-lg shadow-lg hover:shadow-primary/25 transition-all"
                                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                            >
                                {content[role].cta}
                            </Button>
                        ) : (
                            <RegisterFreelancerDialog>
                                <Button
                                    size="lg"
                                    className="rounded-full px-12 h-14 text-lg shadow-lg hover:shadow-primary/25 transition-all"
                                >
                                    {content[role].cta}
                                </Button>
                            </RegisterFreelancerDialog>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
