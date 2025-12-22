"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const projects = [
    {
        title: "E-Invoicing",
        category: "Web Application",
        image: "/work1.png",
        color: "from-blue-500 to-cyan-500",
    },
    {
        title: "Survey Manager",
        category: "Public Marketing",
        image: "/work2.png",
        color: "from-purple-500 to-pink-500",
    },
    {
        title: "Yabuku",
        category: "Branding",
        image: "/work5.png",
        color: "from-orange-500 to-red-500",
    },
    {
        title: "Polimarket",
        category: "Digital Advertising",
        image: "/work4.png",
        color: "from-green-500 to-emerald-500",
    },
];

const Work = () => {
    return (
        <section id="works" className="container mx-auto px-4 py-24">
            <div className="mb-16 flex flex-col items-center text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold tracking-tighter sm:text-5xl"
                >
                    Selected Works
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="mt-4 max-w-2xl text-muted-foreground"
                >
                    A showcase of our most impactful digital creations.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
                    >
                        {/* Background: Image or Gradient */}
                        {project.image ? (
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        ) : (
                            <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-80 transition-transform duration-700 group-hover:scale-110`} />
                        )}

                        {/* Glass Overlay */}
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />

                        <div className="absolute inset-0 p-8 flex flex-col justify-end">
                            <div className="transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                <span className="text-white/80 text-sm font-medium">{project.category}</span>
                                <div className="flex items-center justify-between mt-2">
                                    <h3 className="text-3xl font-bold text-white">{project.title}</h3>
                                    <Button size="icon" className="rounded-full bg-white text-black hover:bg-white/90">
                                        <ArrowUpRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Work;
