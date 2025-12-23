import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Edit2, ChevronUp } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface Chapter {
  id: string;
  name: string;
  description: string;
}

interface Subject {
  id: string;
  name: string;
  description: string;
  chapters?: Chapter[];
}

const SubjectManagement: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [newSubject, setNewSubject] = useState({ name: "", description: "" });
  const [editingSubject, setEditingSubject] = useState<{
    id: string;
    name: string;
    description: string;
  } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newChapter, setNewChapter] = useState({
    name: "",
    description: "",
    subjectId: "",
  });
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(null);
  const [openSubjectId, setOpenSubjectId] = useState<string | null>(null);
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [loadingChapters, setLoadingChapters] = useState(false);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setLoadingSubjects(true);
        const response = await fetch("/api/v1/subjects");
        const result = await response.json();
        if (Array.isArray(result.data)) {
          setSubjects(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch subjects:", error);
        setSubjects([]);
      } finally { 
        setLoadingSubjects(false);
      }
    };
    fetchSubjects();
  }, []);

  const fetchChapters = async (subjectId: string) => {
    try {
      setLoadingChapters(true);
      const response = await fetch(`/api/v1/subjects/${subjectId}/chapters`);
      const result = await response.json();
      setSubjects((prev) =>
        prev.map((subject) =>
          subject.id === subjectId
            ? { ...subject, chapters: result.data }
            : subject
        )
      );
    } catch (error) {
      console.error("Failed to fetch chapters:", error);
    } finally {
      setLoadingChapters(false);
    }
  };

  const handleAddChapter = async (subjectId: string) => {
    setNewChapter({
      ...newChapter,
      subjectId: subjectId,
    });
    try {
      const response = await fetch(`/api/v1/chapters`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newChapter),
      });
      const result = await response.json();
      if (result.data) {
        setSubjects((prev) =>
          prev.map((subject) =>
            subject.id === subjectId
              ? {
                  ...subject,
                  chapters: [...(subject.chapters || []), result.data],
                }
              : subject
          )
        );
        setNewChapter({ name: "", description: "", subjectId: "" });
      }
    } catch (error) {
      console.error("Failed to add chapter:", error);
    }
  };

  const handleEditChapter = async (subjectId: string) => {
    if (!editingChapter) return;
    try {
      const response = await fetch(`/api/v1//chapters/${editingChapter.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editingChapter.name,
          description: editingChapter.description,
          subjectId: subjectId,
        }),
      });
      const result = await response.json();
      if (result.data) {
        setSubjects((prev) =>
          prev.map((subject) =>
            subject.id === subjectId
              ? {
                  ...subject,
                  chapters: subject.chapters?.map((chapter) =>
                    chapter.id === editingChapter.id ? result.data : chapter
                  ),
                }
              : subject
          )
        );
        setEditingChapter(null);
      }
    } catch (error) {
      console.error("Failed to edit chapter:", error);
    }
  };

  const handleDeleteChapter = async (subjectId: string, chapterId: string) => {
    try {
      await fetch(`/api/v1/chapters/${chapterId}`, {
        method: "DELETE",
      });
      setSubjects((prev) =>
        prev.map((subject) =>
          subject.id === subjectId
            ? {
                ...subject,
                chapters: subject.chapters?.filter(
                  (chapter) => chapter.id !== chapterId
                ),
              }
            : subject
        )
      );
    } catch (error) {
      console.error("Failed to delete chapter:", error);
    }
  };

  const handleAddSubject = async () => {
    if (!newSubject.name.trim()) return;

    try {
      const response = await fetch("/api/v1/subjects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSubject),
      });
      const result = await response.json();

      if (result.data && result.data.id) {
        setSubjects((prevSubjects) => [...prevSubjects, result.data]);
        setNewSubject({ name: "", description: "" });
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error("Failed to add subject:", error);
    }
  };

  const handleDeleteSubject = async (id: string) => {
    try {
      await fetch(`/api/v1/subjects/${id}`, { method: "DELETE" });
      setSubjects(subjects.filter((subject) => subject.id !== id));
    } catch (error) {
      console.error("Failed to delete subject:", error);
    }
  };

  const handleEditSubject = async () => {
    console.log(editingSubject);

    if (!editingSubject?.id) return;

    try {
      const response = await fetch(`/api/v1/subjects/${editingSubject.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editingSubject.name, description: editingSubject.description }),
      });
      const result = await response.json();

      if (result.data && result.data.id) {
        setSubjects((prevSubjects) =>
          prevSubjects.map((subject) =>
            subject.id === editingSubject.id ? result.data : subject
          )
        );
        setEditingSubject(null);
        setIsEditDialogOpen(false);
      }
    } catch (error) {
      console.error("Failed to edit subject:", error);
    }
  };

  return (
    <div className="w-full">
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Exam Categories</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mb-4">Add Subject</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Subject</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newSubject.name}
                  onChange={(e) =>
                    setNewSubject({ ...newSubject, name: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  value={newSubject.description}
                  onChange={(e) =>
                    setNewSubject({
                      ...newSubject,
                      description: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={handleAddSubject}>Save</Button>
          </DialogContent>
        </Dialog>
      </div>
      <div className="p-4">
        <div className="space-y-2">
          {loadingSubjects && <p>Loading subjects...</p>}
          {subjects.map((subject: Subject) => (
            <Collapsible
              key={subject.id}
              open={openSubjectId === subject.id}
              onOpenChange={() => {
                if (openSubjectId !== subject.id) {
                  setOpenSubjectId(subject.id);
                  fetchChapters(subject.id);
                } else {
                  setOpenSubjectId(null);
                }
              }}
            >
              <Card className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{subject.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {subject.description}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Dialog
                      open={isEditDialogOpen}
                      onOpenChange={setIsEditDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="edit"
                          size="icon"
                          onClick={() => setEditingSubject(subject)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Subject</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-name" className="text-right">
                              Name
                            </Label>
                            <Input
                              id="edit-name"
                              value={editingSubject?.name || ""}
                              onChange={(e) =>
                                setEditingSubject((prev) =>
                                  prev
                                    ? {
                                        ...prev,
                                        name: e.target.value,
                                      }
                                    : null
                                )
                              }
                              className="col-span-3"
                            />
                            <Label
                              htmlFor="edit-description"
                              className="text-right"
                            >
                              Description
                            </Label>
                            <Input
                              id="edit-description"
                              value={editingSubject?.description || ""}
                              onChange={(e) =>
                                setEditingSubject((prev) =>
                                  prev
                                    ? {
                                        ...prev,
                                        description: e.target.value,
                                      }
                                    : null
                                )
                              }
                              className="col-span-3"
                            />
                          </div>
                        </div>
                        <Button onClick={handleEditSubject}>
                          Save Changes
                        </Button>
                      </DialogContent>
                    </Dialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete the subject.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteSubject(subject.id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <CollapsibleTrigger asChild>
                      <Button variant="drop" size="icon">
                        <ChevronUp
                          className={`h-4 w-4 transition-transform duration-300 ease-in-out ${
                            openSubjectId === subject.id ? "rotate-180" : ""
                          }`}
                        />
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                </div>
                <CollapsibleContent>
                  <div className="mt-4 space-y-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm">Add Chapter</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New Chapter</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="chapter-name">Name</Label>
                            <Input
                              id="chapter-name"
                              value={newChapter.name}
                              onChange={(e) =>
                                setNewChapter({
                                  ...newChapter,
                                  name: e.target.value,
                                })
                              }
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="chapter-description">
                              Description
                            </Label>
                            <Input
                              id="chapter-description"
                              value={newChapter.description}
                              onChange={(e) =>
                                setNewChapter({
                                  ...newChapter,
                                  description: e.target.value,
                                })
                              }
                              className="col-span-3"
                            />
                          </div>
                        </div>
                        <Button onClick={() => handleAddChapter(subject.id)}>
                          Save Chapter
                        </Button>
                      </DialogContent>
                    </Dialog>

                    {loadingChapters && <p>Loading chapters...</p>}
                    {subject.chapters?.length === 0 && <p>No chapters</p>}

                    {subject.chapters?.map((chapter) => (
                      <Card key={chapter.id} className="p-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">{chapter.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {chapter.description}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="edit"
                                  size="icon"
                                  onClick={() => setEditingChapter(chapter)}
                                >
                                  <Edit2 className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit Chapter</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-chapter-name">
                                      Name
                                    </Label>
                                    <Input
                                      id="edit-chapter-name"
                                      value={editingChapter?.name || ""}
                                      onChange={(e) =>
                                        setEditingChapter((prev) =>
                                          prev
                                            ? { ...prev, name: e.target.value }
                                            : null
                                        )
                                      }
                                      className="col-span-3"
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-chapter-description">
                                      Description
                                    </Label>
                                    <Input
                                      id="edit-chapter-description"
                                      value={editingChapter?.description || ""}
                                      onChange={(e) =>
                                        setEditingChapter((prev) =>
                                          prev
                                            ? {
                                                ...prev,
                                                description: e.target.value,
                                              }
                                            : null
                                        )
                                      }
                                      className="col-span-3"
                                    />
                                  </div>
                                </div>
                                <Button
                                  onClick={() => handleEditChapter(subject.id)}
                                >
                                  Save Changes
                                </Button>
                              </DialogContent>
                            </Dialog>

                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="icon">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Delete Chapter?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      handleDeleteChapter(
                                        subject.id,
                                        chapter.id
                                      )
                                    }
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubjectManagement;
