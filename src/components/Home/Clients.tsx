"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const clients = [
  {
    name: "coderAssembly",
    href: "https://coderassembly.in",
  },
  {
    name: "magtech",
    href: "https://magellanium.com",
  },
  {
    name: "platformAcademy",
    href: "https://platformacademy.org",
  },
  {
    name: "platformEdu",
    href: "https://platformedu.org.in/",
  },
  {
    name: "redsoft",
    href: "https://redsoftagency.com",
  },
  {
    name: "souravchakrabarti",
    href: "https://www.souravchakrabarti.in",
  },
];

export default function Client() {
  const [showArrows, setShowArrows] = React.useState(true);

  React.useEffect(() => {
    const checkScreenSize = () => {
      setShowArrows(window.innerWidth > 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const plugin = React.useMemo(
    () =>
      Autoplay({
        delay: 4000,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
      }),
    []
  );

  return (
    <div className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center">Our Clients</h2>
        <p className="text-muted-foreground mb-12 text-center">
          Meet our Happy Clients
        </p>
        <div className="flex gap-8">
          <Carousel
            className="w-full max-w-6xl mx-auto"
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[plugin]}
          >
            <CarouselContent>
              {clients.map((client, idx) => (
                <CarouselItem
                  key={idx}
                  className="basis-1/2 lg:basis-1/4 pl-4 cursor-pointer"
                >
                  <Card
                    key={idx}
                    className="p-3 flex items-center justify-center"
                  >
                    <Image
                      src={`/assets/Clients/${client.name}.jpg`}
                      alt={`Client ${client}`}
                      width={128}
                      height={128}
                      className="w-32 h-20 object-contain border-none"
                    />
                    {/* <Link href={client.href} target="_blank">
                    </Link> */}
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            {showArrows && (
              <>
                <CarouselPrevious className="hidden md:flex -left-12 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700" />
                <CarouselNext className="hidden md:flex -right-12 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700" />
              </>
            )}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
