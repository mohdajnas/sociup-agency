"use client";

import * as React from "react";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";

export function Navbar() {
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = React.useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50);
    });

    return (
        <motion.header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-4 py-4 transition-all duration-300",
                scrolled ? "py-4" : "py-6"
            )}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "circOut" }}
        >
            <div
                className={cn(
                    "flex w-full max-w-7xl items-center justify-between rounded-full px-6 py-3 transition-all duration-300",
                    scrolled
                        ? "bg-black/40 text-white backdrop-blur-xl border border-white/10 shadow-lg"
                        : "bg-transparent"
                )}
            >
                <Link href="/" className="text-2xl font-bold tracking-tighter">
                    Sociup<span className="text-primary">.</span>
                </Link>

                <nav className="hidden md:flex items-center gap-8 font-medium">
                    {[
                        { name: "Services", href: "/#services" },
                        { name: "Works", href: "/#works" },
                        { name: "Blog", href: "/blog" },
                        { name: "Process", href: "/#process" },
                        { name: "About", href: "/#about" },
                        { name: "Careers", href: "/careers" },
                    ].map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm transition-colors hover:text-primary"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <ModeToggle />
                    <Button className="rounded-full" size="sm" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                        Let&apos;s Talk
                    </Button>
                </div>
            </div>
        </motion.header>
    );
}
