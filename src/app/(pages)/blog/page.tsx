
"use client";

import React from "react";
import Link from "next/link";
import {
  Calendar,
  MessageSquare,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { motion } from "framer-motion";

const BlogComponent = () => {
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
    },
    {
      id: 2,
      title: "Sustainable Energy Solutions",
      excerpt: "Latest innovations in renewable energy technology and implementation...",
      date: "January 23, 2024",
      comments: 8,
      image: "https://placehold.co/600x400.png",
      category: "Sustainability",
      slug: "sustainable-energy-solutions",
    },
    {
      id: 3,
      title: "Future of Industrial Automation",
      excerpt: "How robotics and IoT are shaping modern manufacturing...",
      date: "January 20, 2024",
      comments: 15,
      image: "https://placehold.co/600x400.png",
      category: "Innovation",
      slug: "future-industrial-automation",
    },
  ];

  return (
    <div className="min-h-screen relative pt-10">
      {/* Background with Gradient and Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-gradient-to-b from-[#0f3bfe] via-blue-400 dark:via-blue-900 to-blue-200"
        style={{ filter: "blur(3px)" }}
      />
      <div className="absolute inset-0 bg-black/20" />

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative h-64 flex flex-col justify-center items-center text-white z-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
        <p className="text-lg md:text-xl">Discover the latest insights and trends</p>
      </motion.div>

      {/* Main Content */}
      <div className="relative container mx-auto px-4 py-12 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">Latest Insights</h2>
          <div className="relative w-full md:w-64">
            <Input
              placeholder="Search blogs..."
              className="pl-10 bg-white/30 text-white placeholder:text-gray-100 border-none"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: blog.id * 0.1 }}
            >
              <Card className="bg-white/10 backdrop-blur-sm border-none text-white hover:bg-white/20 transition-all h-[500px] flex flex-col">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    width={720}
                    height={480}
                    objectFit="cover"
                    className="transition-transform hover:scale-110 duration-300"
                  />
                  <Badge className="absolute top-4 right-4 bg-blue-600 hover:bg-blue-700">
                    {blog.category}
                  </Badge>
                </div>
                <CardHeader>
                  <Link href={`/blog/${blog.slug}`}>
                    <CardTitle className="text-xl text-white hover:text-blue-300 cursor-pointer transition-colors">
                      {blog.title}
                    </CardTitle>
                  </Link>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-500 mb-4">{blog.excerpt}</p>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {blog.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      {blog.comments} Comments
                    </div>
                  </div>
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="mt-4 flex items-center gap-2 text-blue-700 hover:text-blue-800 transition-colors"
                  >
                    Read More <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex justify-center gap-2"
        >
          <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors">
            <ChevronLeft className="h-5 w-5" />
          </button>
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className={`w-10 h-10 rounded-lg ${
                page === 1
                  ? "bg-blue-600 text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
              } transition-colors`}
            >
              {page}
            </button>
          ))}
          <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors">
            <ChevronRight className="h-5 w-5" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogComponent;
