"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import ExamCreator from "@/components/Admin/ExamCreator/ExamCreator";
import ExamCreator from "@/components/Admin/ExamCreator2/ExamCreator";
import OtherExamForms from "@/components/Admin/Other/OtherExamForms";
import Drafts from "@/components/Admin/Drafts/Drafts";

// Define the Section types
const SECTION_TYPES = [
  { label: "Single Choice", value: "singlecorrect" },
  { label: "Multi Choice", value: "multicorrect" },
  { label: "Integer", value: "integer" },
];

const Header = () => (
  <div className="w-full bg-muted border-b">
    <div className="max-w-4xl mx-auto p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Admin Dashboard</h1>
      <Button variant="ghost" className="flex items-center gap-2">
        <User className="h-4 w-4" />
        Admin Profile
      </Button>
    </div>
  </div>
);

const Page = () => {
  const [currentTab, setCurrentTab] = useState("examcreate");
  const [draftToResume, setDraftToResume] = useState<DraftExam | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="w-full mx-auto p-4">
        <Tabs
          value={currentTab}
          onValueChange={setCurrentTab}
          className="w-full"
        >
          <TabsList className="mb-4">
            <TabsTrigger value="examcreate">Exam Create</TabsTrigger>
            <TabsTrigger value="others">Others</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
          </TabsList>

          <TabsContent value="examcreate" className="w-full">
            <ExamCreator
              draft={draftToResume}
              onFinish={() => setDraftToResume(null)}
            />
          </TabsContent>
          <TabsContent value="others">
            <OtherExamForms />
          </TabsContent>
          <TabsContent value="drafts">
            <Drafts
              onResume={(draft) => {
                setDraftToResume(draft);
                setCurrentTab("examcreate"); // switch to ExamCreator tab
              }}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;
