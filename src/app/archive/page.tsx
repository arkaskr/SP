"use client";
import React, { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Search,
  Filter,
  List,
  Grid,
  FileArchive,
  HardDrive,
  Tag,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ArchivePDF {
  id: string;
  title: string;
  description: string;
  subjects: string[];
  exam: "NEET" | "JEE" | "WBJEE" | "Board" | "General";
  year: number;
  fileSize: string;
  pages: number;
  fileType: "PDF" | "DOC" | "PPT";
  downloadUrl: string;
  previewUrl?: string;
  category: "PYQ" | "Notes" | "Formula" | "Sample Paper" | "Reference";
}

const ArchivesPage: React.FC = () => {
  // Mock data for PDF archives
  const archivePDFs: ArchivePDF[] = [
    {
      id: "1",
      title: "NEET Physics Formula Sheet 2024",
      description:
        "Complete formula sheet covering all physics concepts for NEET preparation.",
      subjects: ["Physics"],
      exam: "NEET",
      year: 2024,
      fileSize: "2.4 MB",
      pages: 24,
      fileType: "PDF",
      downloadUrl: "/archives/neet-physics-formulas.pdf",
      category: "Formula",
    },
    {
      id: "2",
      title: "JEE Advanced Previous Year Questions (2020-2023)",
      description:
        "Collection of previous year questions with solutions for JEE Advanced.",
      subjects: ["Physics", "Chemistry", "Mathematics"],
      exam: "JEE",
      year: 2023,
      fileSize: "5.8 MB",
      pages: 156,
      fileType: "PDF",
      downloadUrl: "/archives/jee-advanced-pyp.pdf",
      category: "PYQ",
    },
    {
      id: "3",
      title: "WBJEE Mathematics Important Theorems",
      description:
        "Important theorems and proofs for WBJEE mathematics section.",
      subjects: ["Mathematics"],
      exam: "WBJEE",
      year: 2023,
      fileSize: "1.2 MB",
      pages: 18,
      fileType: "PDF",
      downloadUrl: "/archives/wbjee-maths-theorems.pdf",
      category: "Notes",
    },
    {
      id: "4",
      title: "Class 12 Chemistry Organic Reactions",
      description:
        "Complete guide to organic chemistry reactions with mechanisms.",
      subjects: ["Chemistry"],
      exam: "Board",
      year: 2024,
      fileSize: "3.1 MB",
      pages: 42,
      fileType: "PDF",
      downloadUrl: "/archives/class12-organic-chemistry.pdf",
      category: "Notes",
    },
    {
      id: "5",
      title: "NEET Biology Diagrams Collection",
      description:
        "Important biological diagrams with labeling for NEET preparation.",
      subjects: ["Biology"],
      exam: "NEET",
      year: 2024,
      fileSize: "4.5 MB",
      pages: 58,
      fileType: "PDF",
      downloadUrl: "/archives/neet-biology-diagrams.pdf",
      category: "Reference",
    },
    {
      id: "6",
      title: "JEE Mains Sample Papers Set",
      description: "Set of 10 sample papers with solutions for JEE Mains.",
      subjects: ["Physics", "Chemistry", "Mathematics"],
      exam: "JEE",
      year: 2024,
      fileSize: "8.2 MB",
      pages: 210,
      fileType: "PDF",
      downloadUrl: "/archives/jee-mains-sample-papers.pdf",
      category: "Sample Paper",
    },
    {
      id: "7",
      title: "Physics Derivations Handbook",
      description: "Important derivations for class 11 and 12 physics.",
      subjects: ["Physics"],
      exam: "General",
      year: 2024,
      fileSize: "2.8 MB",
      pages: 36,
      fileType: "PDF",
      downloadUrl: "/archives/physics-derivations.pdf",
      category: "Formula",
    },
    {
      id: "8",
      title: "Chemistry Periodic Table & Trends",
      description:
        "Modern periodic table with trends and important properties.",
      subjects: ["Chemistry"],
      exam: "General",
      year: 2024,
      fileSize: "1.5 MB",
      pages: 12,
      fileType: "PDF",
      downloadUrl: "/archives/chemistry-periodic-table.pdf",
      category: "Reference",
    },
  ];

  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Handle PDF download
  const handleDownload = (pdf: ArchivePDF) => {
    console.log(`Downloading: ${pdf.title}`);

    const link = document.createElement("a");
    link.href = pdf.downloadUrl;
    link.download = `${pdf.title.replace(/\s+/g, "-").toLowerCase()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Extract unique subjects
  const uniqueSubjects = useMemo(() => {
    const subjects = archivePDFs.flatMap((pdf) => pdf.subjects);
    return [...new Set(subjects)];
  }, []);

  // Get available exams
  const availableExams = useMemo(() => {
    return [...new Set(archivePDFs.map((pdf) => pdf.exam))];
  }, []);

  // Get available categories
  const availableCategories = useMemo(() => {
    return [...new Set(archivePDFs.map((pdf) => pdf.category))];
  }, []);

  // Filter PDFs based on selected filters
  const filteredPDFs = useMemo(() => {
    return archivePDFs.filter(
      (pdf) =>
        (!selectedExam || pdf.exam === selectedExam) &&
        (!selectedSubject || pdf.subjects.includes(selectedSubject)) &&
        (!selectedCategory || pdf.category === selectedCategory) &&
        (searchQuery === "" ||
          pdf.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pdf.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pdf.subjects.some((subject) =>
            subject.toLowerCase().includes(searchQuery.toLowerCase())
          ))
    );
  }, [selectedExam, selectedSubject, selectedCategory, searchQuery]);

  const resetFilters = () => {
    setSelectedExam(null);
    setSelectedSubject(null);
    setSelectedCategory(null);
    setSearchQuery("");
  };

  const renderArchiveCard = (pdf: ArchivePDF) => {
    return (
      <div key={pdf.id} className="h-full">
        <Card className="h-full hover:shadow-lg transition-all duration-300 border hover:border-green-200 bg-white flex flex-col">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg font-bold text-gray-900 line-clamp-2">
                {pdf.title}
              </CardTitle>
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200"
              >
                {pdf.exam}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mt-2 line-clamp-3">
              {pdf.description}
            </p>
          </CardHeader>

          <CardContent className="flex-grow">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-lg">
                  <HardDrive className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {pdf.fileSize}
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-lg">
                  <Tag className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">
                    {pdf.category}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="pt-2">
            <Button
              onClick={() => handleDownload(pdf)}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  };

  const renderArchiveRow = (pdf: ArchivePDF) => {
    return (
      <div key={pdf.id}>
        <Card className="hover:shadow-lg transition-all duration-300 border hover:border-green-200 bg-white mb-3">
          <div className="flex flex-col md:flex-row p-4">
            <div className="flex-grow md:pr-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {pdf.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {pdf.description}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200"
                >
                  {pdf.exam}
                </Badge>
              </div>

              <div className="flex items-center gap-4 my-3">
                <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-lg">
                  <HardDrive className="h-4 w-4 text-gray-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">
                    {pdf.fileSize}
                  </span>
                </div>
                <div className="flex items-center bg-blue-50 px-3 py-1.5 rounded-lg">
                  <Tag className="h-4 w-4 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-blue-700">
                    {pdf.category}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 md:mt-0 md:ml-4 md:flex md:items-center">
              <Button
                onClick={() => handleDownload(pdf)}
                className="bg-green-600 hover:bg-green-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-16">
        <div className="container mx-auto p-4 pt-8">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 py-12 text-center mb-8 rounded-lg shadow-sm">
            <div className="flex justify-center mb-4">
              <FileArchive className="h-16 w-16 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-900">
              Study Materials Archive
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Free downloadable PDFs, notes, formulas, and previous year questions
            </p>
            <p className="text-lg text-gray-500">
              All resources are completely free. No login required!
            </p>
          </div>

          <div className="shadow-sm rounded-lg p-6 bg-white border mb-8">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4 justify-between items-center">
                <div className="flex items-center w-full md:w-auto max-w-md">
                  <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search by title, description, or category"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-full"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Select
                    value={selectedExam || "all-exams"}
                    onValueChange={(value) => {
                      setSelectedExam(value === "all-exams" ? null : value);
                    }}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Exam" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Exams</SelectLabel>
                        <SelectItem value="all-exams">All Exams</SelectItem>
                        {availableExams.map((exam, idx) => (
                          <SelectItem key={idx} value={exam}>
                            {exam}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <Select
                    value={selectedCategory || "all-categories"}
                    onValueChange={(value) =>
                      setSelectedCategory(value === "all-categories" ? null : value)
                    }
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>
                        <SelectItem value="all-categories">
                          All Categories
                        </SelectItem>
                        {availableCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    onClick={resetFilters}
                    className="flex items-center border-gray-300"
                    size="icon"
                  >
                    <Filter className="h-4 w-4" />
                  </Button>

                  <div className="flex border border-gray-300 rounded-md">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="icon"
                      onClick={() => setViewMode("grid")}
                      className="rounded-r-none border-r"
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="icon"
                      onClick={() => setViewMode("list")}
                      className="rounded-l-none"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {selectedExam && (
                  <Badge
                    variant="secondary"
                    className="flex gap-1 items-center bg-green-100 text-green-700"
                  >
                    Exam: {selectedExam}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 ml-1 hover:bg-green-200"
                      onClick={() => setSelectedExam(null)}
                    >
                      <span className="sr-only">Remove</span>×
                    </Button>
                  </Badge>
                )}

                {selectedCategory && (
                  <Badge
                    variant="secondary"
                    className="flex gap-1 items-center bg-blue-100 text-blue-700"
                  >
                    Category: {selectedCategory}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 ml-1 hover:bg-blue-200"
                      onClick={() => setSelectedCategory(null)}
                    >
                      <span className="sr-only">Remove</span>×
                    </Button>
                  </Badge>
                )}

                {searchQuery && (
                  <Badge
                    variant="secondary"
                    className="flex gap-1 items-center bg-gray-100 text-gray-700"
                  >
                    Search: {searchQuery}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 ml-1 hover:bg-gray-200"
                      onClick={() => setSearchQuery("")}
                    >
                      <span className="sr-only">Remove</span>×
                    </Button>
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Study Materials ({filteredPDFs.length})
              </h2>
              <p className="text-gray-600">
                Click on any PDF to download or preview
              </p>
            </div>
            <div className="text-sm text-gray-500">
              All resources are free to download
            </div>
          </div>

          {viewMode === "grid" ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPDFs.map(renderArchiveCard)}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredPDFs.map(renderArchiveRow)}
            </div>
          )}

          {filteredPDFs.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-lg border">
              <FileArchive className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <p className="text-xl text-gray-600 mb-2">
                No study materials found matching your filters
              </p>
              <Button onClick={resetFilters} variant="outline">
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ArchivesPage;