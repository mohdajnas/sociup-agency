"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Globe, Users, TrendingUp, BarChart3, ArrowUpRight, Zap, Loader2, Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { RegisterFreelancerDialog } from "@/components/RegisterFreelancerDialog";

const DomainCard = () => {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{ available: boolean; price: number; domain: string } | null>(null);

    const checkDomain = async () => {
        if (!query) return;
        setLoading(true);
        setResult(null);
        try {
            const res = await fetch(`/api/domain?q=${query}`);
            const data = await res.json();
            setResult(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="h-full glass-card hover:border-primary/50 transition-colors duration-500 flex flex-col">
            <CardHeader>
                <div className="mb-2 h-10 w-10 text-blue-500">
                    <Globe className="h-full w-full" />
                </div>
                <CardTitle>Domain Purchase</CardTitle>
                <CardDescription>Secure your identity.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between">
                <div className="flex items-center space-x-2 rounded-lg border bg-background/50 p-1 mb-4">
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && checkDomain()}
                        placeholder="brand.com"
                        className="flex-1 bg-transparent px-3 py-1 text-sm outline-none placeholder:text-muted-foreground w-full min-w-0"
                    />
                    <Button
                        size="icon"
                        className="h-8 w-8 rounded-md shrink-0"
                        onClick={checkDomain}
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                    </Button>
                </div>

                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`rounded-lg p-3 text-sm ${result.available ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20"}`}
                    >
                        <div className="flex items-center justify-between font-medium">
                            <span className="flex items-center gap-2">
                                {result.available ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                                {result.domain}
                            </span>
                            {result.available && (
                                <span className="font-bold text-lg">₹{result.price?.toLocaleString('en-IN')}</span>
                            )}
                        </div>
                        <div className="mt-1 text-xs opacity-80">
                            {result.available
                                ? "Available now. Includes standard processing fees."
                                : "This domain is already taken."}
                        </div>
                    </motion.div>
                )}
            </CardContent>
        </Card>
    );
};

const Services = () => {
    return (
        <section id="services" className="container mx-auto px-4 py-24">
            <div className="mb-16 flex flex-col items-center text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold tracking-tighter sm:text-5xl"
                >
                    Our Expertise
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="mt-4 max-w-2xl text-muted-foreground"
                >
                    Comprehensive solutions to scale your brand in the digital age.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2 h-auto md:h-[800px]">
                {/* Item 1: Strategy - Large */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="group relative md:col-span-2 md:row-span-1 overflow-hidden"
                >
                    <Card className="h-full glass-card hover:border-primary/50 transition-colors duration-500">
                        <CardHeader>
                            <div className="mb-2 h-10 w-10 text-primary">
                                <TrendingUp className="h-full w-full" />
                            </div>
                            <CardTitle className="text-2xl">Digital Marketing & Strategy</CardTitle>
                            <CardDescription>Data-driven campaigns that deliver ROI.</CardDescription>
                        </CardHeader>
                        <CardContent className="relative h-64 overflow-hidden">
                            {/* Abstract Chart visualization */}
                            <div className="absolute inset-0 flex items-end justify-center gap-2 px-8 pb-8 opacity-50 group-hover:opacity-100 transition-opacity">
                                {[40, 70, 50, 90, 60, 80, 100].map((h, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 0 }}
                                        whileInView={{ height: `${h}%` }}
                                        transition={{ delay: i * 0.1, duration: 1, type: "spring" }}
                                        className="w-full rounded-t bg-gradient-to-t from-primary/20 to-primary"
                                    />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Item 2: Social Media Ads - Vertical */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="group md:col-span-1 md:row-span-2 h-full"
                >
                    <Card className="h-full glass-card hover:border-primary/50 transition-colors duration-500 flex flex-col overflow-hidden rounded-2xl">
                        <CardHeader>
                            <div className="mb-2 h-10 w-10 text-pink-500">
                                <Zap className="h-full w-full" />
                            </div>
                            <CardTitle>Social Media Ads</CardTitle>
                            <CardDescription>Viral content creation.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 relative overflow-hidden flex items-center justify-center p-0 bg-background">
                            <video
                                src="/instagram-ad.mp4"
                                className="absolute inset-0 w-full h-full object-cover"
                                autoPlay
                                loop
                                muted
                                playsInline
                            />
                            <div className="absolute inset-0 bg-black/10 transition-colors hover:bg-black/20" />
                            <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between">
                                <Button
                                    size="sm"
                                    variant="secondary"
                                    className="w-full h-8 text-xs font-medium bg-white/90 hover:bg-white text-black backdrop-blur-sm shadow-lg"
                                    onClick={() => window.open("https://www.instagram.com/p/DMX1qFMyjQY/", "_blank")}
                                >
                                    View on Instagram
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Item 3: Domain Purchase */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="group md:col-span-1 md:row-span-1"
                >
                    <DomainCard />
                </motion.div>

                {/* Item 4: Marketplace */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="group md:col-span-1 md:row-span-1"
                >
                    <Card className="h-full glass-card hover:border-primary/50 transition-colors duration-500">
                        <CardHeader>
                            <div className="mb-2 h-10 w-10 text-green-500">
                                <Users className="h-full w-full" />
                            </div>
                            <CardTitle>Freelance Hub</CardTitle>
                            <CardDescription>Connect with top 1% talent.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center space-y-4">
                            <div className="flex -space-x-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="h-10 w-10 rounded-full border-2 border-background bg-zinc-200 dark:bg-zinc-800" />
                                ))}
                                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-primary text-xs font-bold text-primary-foreground">
                                    +50
                                </div>
                            </div>
                            <RegisterFreelancerDialog>
                                <Button size="sm" variant="secondary" className="w-full">
                                    Register as Freelancer
                                </Button>
                            </RegisterFreelancerDialog>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
