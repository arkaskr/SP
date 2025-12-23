import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const LOCAL_STORAGE_KEY = "examDetails";

const Drafts = ({ onResume }: { onResume: (draft: DraftExam) => void }) => {
  const [drafts, setDrafts] = useState<DraftExam[]>([]);

  useEffect(() => {
    const storedDrafts = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedDrafts) {
      setDrafts(JSON.parse(storedDrafts));
    }
  }, []);

  if (drafts.length === 0) {
    return <p className="text-muted-foreground">No draft exams found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {drafts &&
        drafts.map((draft) => (
          <Card key={draft.id} className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {draft.examDetails.title || "Untitled Exam"}
              </CardTitle>
            </CardHeader>

            <CardContent className="text-sm space-y-2">
              <p>
                <strong>Category:</strong>{" "}
                {draft.examDetails.examCategory || "N/A"}
              </p>
              <p>
                <strong>Type:</strong> {draft.examDetails.examType || "N/A"}
              </p>
              <p>
                <strong>Sections:</strong> {draft.examSections.length}
              </p>
              <p>
                <strong>Saved At:</strong>{" "}
                {new Date(draft.savedAt).toLocaleString()}
              </p>
            </CardContent>

            <CardFooter>
              <Button className="w-full" onClick={() => onResume(draft)}>
                Continue Editing
              </Button>
            </CardFooter>
          </Card>
        ))}
    </div>
  );
};

export default Drafts;
