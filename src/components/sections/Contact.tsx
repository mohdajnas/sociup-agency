"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Contact() {
    const [focused, setFocused] = useState<string | null>(null);
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await addDoc(collection(db, "contacts"), {
                ...formData,
                createdAt: serverTimestamp()
            });
            alert("Message sent successfully!");
            setFormData({ name: "", email: "", message: "" });
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Failed to send message.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="container mx-auto px-4 py-12 md:py-24 min-h-[600px] flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="w-full max-w-lg flex flex-col items-center md:block"
            >
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Let's work together</h2>
                    <p className="mt-2 text-muted-foreground">Tell us about your project.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative group">
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            className="peer block w-full border-b-2 border-muted bg-transparent py-3 px-0 text-lg font-medium text-foreground focus:border-primary focus:outline-none transition-colors"
                            onFocus={() => setFocused('name')}
                            onBlur={() => setFocused(null)}
                        />
                        <label
                            htmlFor="name"
                            className={`absolute left-0 top-3 text-lg text-muted-foreground transition-all duration-300 pointer-events-none 
                        transform peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-primary 
                        ${formData.name ? '-translate-y-6 text-sm' : ''} peer-valid:-translate-y-6 peer-valid:text-sm`}
                        >
                            Your Name
                        </label>
                    </div>

                    <div className="relative group">
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            className="peer block w-full border-b-2 border-muted bg-transparent py-3 px-0 text-lg font-medium text-foreground focus:border-primary focus:outline-none transition-colors"
                        />
                        <label
                            htmlFor="email"
                            className={`absolute left-0 top-3 text-lg text-muted-foreground transition-all duration-300 pointer-events-none transform peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-primary ${formData.email ? '-translate-y-6 text-sm' : ''} peer-valid:-translate-y-6 peer-valid:text-sm`}
                        >
                            Email Address
                        </label>
                    </div>

                    <div className="relative group">
                        <textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            required
                            rows={4}
                            className="peer block w-full resize-none border-b-2 border-muted bg-transparent py-3 px-0 text-lg font-medium text-foreground focus:border-primary focus:outline-none transition-colors"
                        />
                        <label
                            htmlFor="message"
                            className={`absolute left-0 top-3 text-lg text-muted-foreground transition-all duration-300 pointer-events-none transform peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-primary ${formData.message ? '-translate-y-6 text-sm' : ''} peer-valid:-translate-y-6 peer-valid:text-sm`}
                        >
                            Project Details
                        </label>
                    </div>

                    <Button type="submit" size="lg" className="w-full rounded-full h-14 text-lg mt-8" disabled={loading}>
                        {loading ? "Sending..." : "Send Message"}
                    </Button>
                </form>
            </motion.div>
        </section>
    );
}
