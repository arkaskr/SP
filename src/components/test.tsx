"use client"

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Advisor {
  name: string;
  position: string[];
  expertise: string[];
  bio: string;
  achievements: string[];
  image: string;
}

interface AdvisoryProps {
  advisors: Advisor[];
}

export const AdvisoryPage: React.FC<AdvisoryProps> = ({ advisors }) => {
  const [expandedAdvisorId, setExpandedAdvisorId] = useState<number | null>(
    null
  );

  const toggleAdvisorDetails = (advisorId: number) => {
    setExpandedAdvisorId(expandedAdvisorId === advisorId ? null : advisorId);
  };

  return (
    <div className="container mx-auto px-4 py-12 space-y-8">
      <h1 className="text-4xl font-bold text-center mb-12">
        Our Advisory Board
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {advisors.map((advisor, idx) => (
          <Card
            key={idx}
            className="w-full hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader className="flex flex-col items-center space-y-4 pb-0">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary">
                <Image
                  src={advisor.image}
                  alt={advisor.name}
                  width={380}
                  height={380}
                  className="object-cover"
                />
              </div>
              <CardTitle className="text-center">
                <div>{advisor.name}</div>
                {/* <p className="text-sm text-muted-foreground font-normal">
                  {advisor.positions.join(" | ")}
                </p> */}
              </CardTitle>
            </CardHeader>

            <CardContent className="pt-4 space-y-4">
              <div className="flex flex-wrap justify-center gap-2">
                {advisor.expertise.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={() => toggleAdvisorDetails(idx)}
                >
                  {expandedAdvisorId === idx ? "Hide Details" : "View Details"}
                </Button>
              </div>

              {expandedAdvisorId === idx && (
                <div className="space-y-4 mt-4">
                  <div className="text-center text-muted-foreground italic">
                    &quot;{advisor.bio}&quot;
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-center">
                      Key Achievements
                    </h4>
                    <ul className="space-y-2 text-muted-foreground">
                      {advisor.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2 text-primary">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
