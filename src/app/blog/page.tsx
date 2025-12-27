import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";

// Types for the API response
type DevToArticle = {
    id: number;
    title: string;
    description: string;
    published_at: string;
    slug: string;
    url: string;
    comments_count: number;
    public_reactions_count: number;
    cover_image: string | null;
    social_image: string | null;
    tag_list: string[];
    user: {
        name: string;
        profile_image: string;
        username: string;
    };
    readable_publish_date: string;
    reading_time_minutes: number;
};

// Revalidate every hour to keep content fresh "day by day"
export const revalidate = 3600;

async function getArticles() {
    try {
        const res = await fetch(
            "https://dev.to/api/articles?tag=digitalmarketing&per_page=9",
            { next: { revalidate: 3600 } }
        );

        if (!res.ok) {
            // Fallback or empty if fail
            return [];
        }

        return res.json() as Promise<DevToArticle[]>;
    } catch (error) {
        console.error("Failed to fetch articles", error);
        return [];
    }
}

export default async function BlogPage() {
    const articles = await getArticles();

    return (
        <div className="min-h-screen bg-background flex flex-col pt-24 pb-12">
            <section className="container px-4 mx-auto mb-16 text-center">
                <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in-up">
                    The Sociup Blog
                </span>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
                    Latest Digital Marketing <span className="text-primary">Insights</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Stay ahead of the curve with the latest trends, strategies, and news from the digital marketing world.
                </p>
            </section>

            <section className="container px-4 mx-auto">
                {articles.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map((article) => (
                            <article key={article.id} className="group flex flex-col bg-card border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:border-primary/20">
                                <div className="relative h-48 w-full bg-muted overflow-hidden">
                                    {article.cover_image || article.social_image ? (
                                        <Image
                                            src={article.cover_image || article.social_image || ""}
                                            alt={article.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-secondary text-muted-foreground">
                                            <span className="text-4xl font-bold opacity-20">SOCIUP</span>
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <span className="bg-background/90 backdrop-blur-sm shadow-sm px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {article.readable_publish_date}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex-1 p-6 flex flex-col">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {article.tag_list.slice(0, 3).map(tag => (
                                            <span key={tag} className="px-2 py-1 bg-primary/5 text-primary rounded-md text-[10px] uppercase font-bold tracking-wider">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <h2 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                        <Link href={article.url} target="_blank" rel="noopener noreferrer">
                                            {article.title}
                                        </Link>
                                    </h2>

                                    <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1">
                                        {article.description}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto pt-4 border-t">
                                        <div className="flex items-center gap-2">
                                            {article.user.profile_image && (
                                                <Image src={article.user.profile_image} alt={article.user.name} width={32} height={32} className="rounded-full border" />
                                            )}
                                            <div className="text-xs">
                                                <p className="font-medium text-foreground">{article.user.name}</p>
                                                <p className="text-muted-foreground">{article.reading_time_minutes} min read</p>
                                            </div>
                                        </div>

                                        <Link href={article.url} target="_blank" rel="noopener noreferrer">
                                            <Button variant="ghost" size="sm" className="gap-1 hover:text-primary">
                                                Read <ArrowRight className="w-3 h-3" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-muted-foreground">
                        <p>Unable to fetch latest news at the moment. Please check back later.</p>
                    </div>
                )}
            </section>
        </div>
    );
}
