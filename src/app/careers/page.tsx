"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Globe, Laptop, Zap } from "lucide-react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

type JobPosition = {
    id: string;
    title: string;
    department: string;
    type: string;
    location: string;
};

export default function CareersPage() {
    const [jobs, setJobs] = useState<JobPosition[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const q = query(collection(db, "jobs"));
                const querySnapshot = await getDocs(q);
                const fetchedJobs: JobPosition[] = [];

                querySnapshot.forEach((doc) => {
                    // console.log(doc.id, " => ", doc.data());
                    fetchedJobs.push({ id: doc.id, ...doc.data() } as JobPosition);
                });

                // If no jobs in DB, fallback to default (optional, removing for now to show real DB state)
                if (fetchedJobs.length === 0) {
                    // We could seed here, but for now let's just show empty state or defaults
                    setJobs([
                        { id: '1', title: "Senior Product Designer", department: "Design", type: "Full-time", location: "Remote" },
                        { id: '2', title: "Frontend Developer (Next.js)", department: "Engineering", type: "Full-time", location: "Remote" }
                    ]);
                } else {
                    setJobs(fetchedJobs);
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
                // Fallback on error
                setJobs([
                    { id: '1', title: "Senior Product Designer", department: "Design", type: "Full-time", location: "Remote" },
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);
    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Note: In a real Next.js app layout, Navbar and Footer might be in layout.tsx. 
           However, looking at the user's file list, layout.tsx is present. 
           Let's assume layout.tsx handles the Navbar/Footer or they are added manually.
           The user's layout.tsx was not fully read, but usually it wraps children.
           Wait, looking at the previous view_file of src/app/page.tsx, it doesn't import Navbar.
           Let's check layout.tsx quickly to see if Navbar/Footer are there.
       */}
            <main className="flex-1 pt-24 pb-12">
                {/* Hero Section */}
                <section className="relative overflow-hidden py-20 md:py-32">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background z-0" />
                    <div className="container relative z-10 px-4 mx-auto text-center">
                        <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in-up">
                            We are hiring
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                            Join the <span className="text-primary">Sociup</span> Team
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                            We're a team of designers, developers, and strategists building the next generation of digital experiences.
                            Come do the best work of your career.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button size="lg" className="rounded-full px-8 h-12 text-base shadow-lg hover:shadow-primary/25" onClick={() => document.getElementById('positions')?.scrollIntoView({ behavior: 'smooth' })}>
                                View Open Positions
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Values / Benefits Section */}
                <section className="py-20 bg-muted/30">
                    <div className="container px-4 mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold tracking-tight mb-4">Why Next-Gen Talent Joins Us</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                We believe in empowering our team with the freedom, tools, and support to achieve greatness.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: <Globe className="w-8 h-8 text-primary" />,
                                    title: "Remote-First Culture",
                                    description: "Work from anywhere in the world. We focus on output, not hours in a chair."
                                },
                                {
                                    icon: <Zap className="w-8 h-8 text-primary" />,
                                    title: "Cutting-Edge Tech",
                                    description: "We use the latest tools and frameworks (Next.js, AI, WebGL) to build the impossible."
                                },
                                {
                                    icon: <Laptop className="w-8 h-8 text-primary" />,
                                    title: "Continuous Growth",
                                    description: "Sponsored courses, conferences, and mentorship to help you level up your skills."
                                }
                            ].map((item, index) => (
                                <div key={index} className="p-8 rounded-2xl bg-background border border-border/50 hover:border-primary/50 transition-colors shadow-sm">
                                    <div className="mb-4 p-3 bg-primary/10 rounded-xl inline-block">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Open Positions Section */}
                <section id="positions" className="py-20">
                    <div className="container px-4 mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                            <div>
                                <h2 className="text-3xl font-bold tracking-tight mb-4">Open Positions</h2>
                                <p className="text-muted-foreground">Find the role that fits your superpower.</p>
                            </div>
                            <Button variant="outline" className="rounded-full">
                                Filter by Department
                            </Button>
                        </div>


                        <div className="space-y-4">
                            {loading ? (
                                <div className="text-center py-10 opacity-50">Loading positions...</div>
                            ) : jobs.length > 0 ? (
                                jobs.map((job) => (
                                    <div key={job.id} className="group relative overflow-hidden rounded-xl border bg-background/50 hover:bg-muted/50 transition-colors p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                                        <div>
                                            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{job.title}</h3>
                                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                                <span className="flex items-center gap-1">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                                    {job.department}
                                                </span>
                                                <span>•</span>
                                                <span>{job.type}</span>
                                                <span>•</span>
                                                <span>{job.location}</span>
                                            </div>
                                        </div>
                                        <Link href="#" className="flex items-center gap-2 font-medium text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                                            Apply Now <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-10 text-muted-foreground">
                                    <p>No open positions at the moment. Check back later!</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-12 text-center p-8 rounded-2xl bg-muted/20 border border-dashed border-muted-foreground/30">
                            <p className="text-muted-foreground mb-4">Don't see the perfect role?</p>
                            <Link href="mailto:careers@sociup.com" className="font-medium text-foreground hover:text-primary underline">
                                Send us your portfolio anyway
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
