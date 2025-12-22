"use client";

import { motion } from "framer-motion";
import { Lightbulb, PenTool, Code, Rocket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
    {
        order: "01",
        title: "Discovery",
        description: "We dive deep into your brand, audience, and goals.",
        icon: Lightbulb,
    },
    {
        order: "02",
        title: "Strategy",
        description: "Crafting a roadmap to ensure maximum impact.",
        icon: PenTool,
    },
    {
        order: "03",
        title: "Development",
        description: "Building robust, scalable, and pixel-perfect solutions.",
        icon: Code,
    },
    {
        order: "04",
        title: "Launch",
        description: "Deploying to the world with ongoing optimization.",
        icon: Rocket,
    },
];

const Process = () => {
    return (
        <section id="process" className="container mx-auto px-4 py-24 bg-muted/30">
            <div className="mb-16 flex flex-col items-center text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold tracking-tighter sm:text-5xl"
                >
                    Our Process
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="mt-4 max-w-2xl text-muted-foreground"
                >
                    From concept to execution, we follow a proven path to success.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="h-full glass border-none shadow-none bg-background/50 relative overflow-hidden group hover:bg-background/80 transition-colors">
                            <div className="absolute top-0 right-0 p-8 opacity-10 font-black text-9xl group-hover:opacity-20 transition-opacity select-none">
                                {step.order}
                            </div>
                            <CardContent className="p-8 flex flex-col items-start h-full">
                                <div className="mb-6 rounded-full bg-primary/10 p-3 text-primary group-hover:scale-110 transition-transform">
                                    <step.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                <p className="text-muted-foreground">{step.description}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Process;
