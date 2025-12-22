"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const About = () => {
    return (
        <section id="about" className="container mx-auto px-4 py-12 md:py-24 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                >
                    <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-tr from-zinc-800 to-zinc-900 flex items-center justify-center relative">
                        {/* Placeholder for About Image or Abstract Graphics */}
                        <div className="absolute inset-0 bg-[url('/start.jpeg')] bg-cover bg-center opacity-60 mix-blend-overlay"></div>
                        <div className="relative z-10 text-white font-bold text-6xl tracking-tighter mix-blend-difference">
                            EST.<br />2025
                        </div>
                    </div>
                    {/* Decorative Elements */}
                    <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-primary/20 rounded-full blur-3xl -z-10"></div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col items-center text-center md:items-start md:text-left"
                >
                    <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl mb-6">
                        We are the architects of the new digital reality.
                    </h2>
                    <p className="text-lg text-muted-foreground mb-6">
                        Sociup is not just an agency; it is a collective of visionaries, coders, and artists dedicated to pushing the boundaries of what is possible on the web.
                    </p>
                    <p className="text-lg text-muted-foreground mb-8">
                        We believe in the power of design to evoke emotion and the precision of code to deliver performance. Our mission is direct: to build brands that are impossible to ignore.
                    </p>

                    <div className="flex gap-8 justify-center md:justify-start">
                        <div>
                            <div className="text-3xl font-bold text-primary">50+</div>
                            <div className="text-sm text-muted-foreground">Projects Delivered</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-primary">100+</div>
                            <div className="text-sm text-muted-foreground">Happy Clients</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-primary">98%</div>
                            <div className="text-sm text-muted-foreground">Client Retention</div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default About;
