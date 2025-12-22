import Link from "next/link";
import { Github, Twitter, Linkedin, Instagram } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t bg-background/50 backdrop-blur-xl">
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-5 text-sm">
                    <div className="col-span-2 lg:col-span-2 flex flex-col items-center text-center md:items-start md:text-left">
                        <Link href="/" className="text-2xl font-bold tracking-tighter">
                            Sociup<span className="text-primary">.</span>
                        </Link>
                        <p className="mt-4 max-w-xs text-muted-foreground">
                            Building digital products, brands, and experiences that connect with the world.
                        </p>
                    </div>

                    <div className="flex flex-col items-center text-center md:items-start md:text-left">
                        <h3 className="mb-4 font-semibold">Services</h3>
                        <ul className="space-y-3 text-muted-foreground">
                            <li><Link href="#" className="hover:text-foreground">Marketing Strategy</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Web Development</Link></li>
                            <li><Link href="#" className="hover:text-foreground">SEO Optimization</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Social Media</Link></li>
                        </ul>
                    </div>

                    <div className="flex flex-col items-center text-center md:items-start md:text-left">
                        <h3 className="mb-4 font-semibold">Company</h3>
                        <ul className="space-y-3 text-muted-foreground">
                            <li><Link href="#" className="hover:text-foreground">About Us</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Carrers</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Blog</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Contact</Link></li>
                        </ul>
                    </div>

                    <div className="flex flex-col items-center text-center md:items-start md:text-left">
                        <h3 className="mb-4 font-semibold">Connect</h3>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-5 w-5" /></Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary"><Github className="h-5 w-5" /></Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary"><Linkedin className="h-5 w-5" /></Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram className="h-5 w-5" /></Link>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center justify-between border-t pt-8 md:flex-row text-xs text-muted-foreground">
                    <p>&copy; 2025 Sociup Inc. All rights reserved.</p>
                    <div className="mt-4 flex space-x-6 md:mt-0">
                        <Link href="#" className="hover:text-foreground">Privacy Policy</Link>
                        <Link href="#" className="hover:text-foreground">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
