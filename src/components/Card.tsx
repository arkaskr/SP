"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type CardProps = {
  img: string;
  h: string;
  p: string;
  sectionId: string;
  className?: string;
};

export function Card({ img, h, p, sectionId, className = "" }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-md p-6 w-full max-w-xs text-center hover:shadow-lg transition-shadow duration-300 flex flex-col h-full",
        className
      )}
    >
      <div className="mb-4">
        <Image
          src={img}
          alt={h}
          width={400}
          height={256}
          className="mx-auto h-64 object-cover rounded-lg"
        />
      </div>
      <h1 className="text-xl font-semibold text-gray-800 mb-2">{h}</h1>
      <p className="text-gray-600 text-sm mb-4 flex-grow text-justify">{p}</p>

      {/* Button fixed at the bottom */}
      <div className="mt-auto">
        <Link href={`/about#${sectionId}`}>
          <button className="bg-blue-700 text-white px-4 py-2 rounded-xl hover:bg-blue-800 transition-colors">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Card;