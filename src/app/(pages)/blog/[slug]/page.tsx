import React from "react";
import Image from "next/image";
import { Calendar, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Params = {
  params: { slug: string };
};

const blogs = [
  {
    id: 1,
    title: "Advanced Machine Learning in Manufacturing",
    excerpt: "Exploring how AI and ML are revolutionizing production processes...",
    date: "January 25, 2024",
    comments: 12,
    image: "/assets/images/advanceml.webp",
    category: "Technology",
    slug: "advanced-machine-learning-manufacturing",
    content:
      "Full article content for Advanced Machine Learning in Manufacturing. Replace this with your real content or fetch from CMS.",
  },
  {
    id: 2,
    title: "Sustainable Energy Solutions",
    excerpt: "Latest innovations in renewable energy technology and implementation...",
    date: "January 23, 2024",
    comments: 8,
    image: "https://placehold.co/1200x800.png",
    category: "Sustainability",
    slug: "sustainable-energy-solutions",
    content:
      "Full article content for Sustainable Energy Solutions. Replace this with your real content or fetch from CMS.",
  },
  {
    id: 3,
    title: "Future of Industrial Automation",
    excerpt: "How robotics and IoT are shaping modern manufacturing...",
    date: "January 20, 2024",
    comments: 15,
    image: "https://placehold.co/1200x800.png",
    category: "Innovation",
    slug: "future-industrial-automation",
    content:
      "Full article content for Future of Industrial Automation. Replace this with your real content or fetch from CMS.",
  },
];

export default function BlogPost({ params }: Params) {
  const post = blogs.find((b) => b.slug === params.slug);

  if (!post) {
    return (
      <div className="container mx-auto py-12">
        <h1 className="text-2xl font-bold">Blog post not found</h1>
        <p className="text-muted-foreground mt-2">The requested blog post does not exist.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {post.date}
          </div>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            {post.comments} comments
          </div>
          <Badge className="ml-2">{post.category}</Badge>
        </div>
      </div>

      <div className="prose dark:prose-invert max-w-full">
        <div className="w-full h-80 relative mb-6 rounded-lg overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            style={{ objectFit: "cover" }}
            sizes="100vw"
            unoptimized
          />
        </div>
        <p>{post.content}</p>
      </div>
    </div>
  );
}
