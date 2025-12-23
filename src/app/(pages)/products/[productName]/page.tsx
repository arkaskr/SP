"use client";
import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Page = () => {
  const { productName } = useParams();

  return (
    <div className="flex h-[80vh] items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-800">
          Product Not Found
        </h1>
        <p className="mb-6 text-xl text-gray-600">
          Sorry, we couldn&apos;t find the product &quot;{productName}&quot;.
        </p>
        <div className="space-y-4">
          <p className="text-gray-700">
            The product you&apos;re looking for might have been removed, had its
            name changed, or is temporarily unavailable.
          </p>
          <Link
            href="/"
            className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-foreground transition duration-300 ease-out border-2 border-foreground rounded-2xl shadow-md group"
          >
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-background duration-300 -translate-x-full bg-foreground group-hover:translate-x-0 ease rounded-xl">
              <ArrowRight size={24} />
            </span>
            <span className="absolute flex items-center justify-center w-full h-full transition-all duration-300 transform group-hover:translate-x-full ease">
              Return to home
            </span>
            <span className="relative invisible">Return to home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
