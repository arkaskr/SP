"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Search, MoreHorizontal, Trash2, Copy, ImageIcon, VideoIcon, File, Upload, Download, Eye } from "lucide-react"

// Mock media items
const mockMediaItems = [
  {
    id: "1",
    name: "course-thumbnail-1.jpg",
    type: "image",
    url: "/placeholder.svg?height=200&width=300",
    size: "245 KB",
    dimensions: "1280x720",
    uploadedBy: "John Doe",
    uploadedAt: "2023-05-15",
    courseId: "1",
    courseName: "Introduction to Data Science",
  },
  {
    id: "2",
    name: "intro-video.mp4",
    type: "video",
    url: "https://example.com/videos/intro-video.mp4",
    size: "15.4 MB",
    duration: "2:45",
    uploadedBy: "Jane Smith",
    uploadedAt: "2023-05-10",
    courseId: "1",
    courseName: "Introduction to Data Science",
  },
  {
    id: "3",
    name: "python-basics.pdf",
    type: "document",
    url: "https://example.com/documents/python-basics.pdf",
    size: "1.2 MB",
    uploadedBy: "Robert Johnson",
    uploadedAt: "2023-05-08",
    courseId: "1",
    courseName: "Introduction to Data Science",
  },
  {
    id: "4",
    name: "javascript-course-banner.jpg",
    type: "image",
    url: "/placeholder.svg?height=200&width=300",
    size: "320 KB",
    dimensions: "1920x1080",
    uploadedBy: "Emily Davis",
    uploadedAt: "2023-05-05",
    courseId: "2",
    courseName: "Advanced JavaScript Masterclass",
  },
  {
    id: "5",
    name: "machine-learning-intro.mp4",
    type: "video",
    url: "https://example.com/videos/machine-learning-intro.mp4",
    size: "25.7 MB",
    duration: "5:30",
    uploadedBy: "Michael Wilson",
    uploadedAt: "2023-05-01",
    courseId: "3",
    courseName: "Machine Learning Fundamentals",
  },
]

export default function MediaLibrary() {
  const [mediaItems, setMediaItems] = useState<
    {
      id: string;
      name: string;
      type: string;
      url: string;
      size: string;
      dimensions?: string;
      duration?: string;
      uploadedBy: string;
      uploadedAt: string;
      courseId: string;
      courseName: string;
    }[]
  >([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedMedia, setSelectedMedia] = useState<{
    id: string;
    name: string;
    type: string;
    url: string;
    size: string;
    dimensions?: string;
    duration?: string;
    uploadedBy: string;
    uploadedAt: string;
    courseId: string;
    courseName: string;
  } | null>(null)
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [newMedia, setNewMedia] = useState<{
    name: string;
    file: File | null;
    courseId: string;
    description: string;
  }>({
    name: "",
    file: null,
    courseId: "",
    description: "",
  })

  useEffect(() => {
    // Simulate API call to fetch media items
    const fetchMediaItems = async () => {
      try {
        setIsLoading(true)
        // In a real app, you would fetch from your API
        // const response = await fetch('/api/media');
        // const data = await response.json();

        // Using mock data for demonstration
        setTimeout(() => {
          setMediaItems(mockMediaItems)
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching media items:", error)
        setIsLoading(false)
      }
    }

    fetchMediaItems()
  }, [])

  // Filter media items based on search query and filters
  const filteredMediaItems = mediaItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.courseName.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = typeFilter === "all" || item.type === typeFilter

    return matchesSearch && matchesType
  })

  const handleUploadMedia = () => {
    // Validate form
    if (!newMedia.name || !newMedia.file) {
      alert("Please fill in all required fields")
      return
    }

    // In a real app, you would call your API to upload the media
    // const formData = new FormData();
    // formData.append('name', newMedia.name);
    // formData.append('file', newMedia.file);
    // formData.append('courseId', newMedia.courseId);
    // formData.append('description', newMedia.description);

    // const response = await fetch('/api/media', {
    //   method: 'POST',
    //   body: formData
    // });

    // Simulate uploading a new media item
    const uploadedMedia = {
      id: (mediaItems.length + 1).toString(),
      name: newMedia.name,
      type: newMedia.file.type.startsWith("image/")
        ? "image"
        : newMedia.file.type.startsWith("video/")
          ? "video"
          : "document",
      url: URL.createObjectURL(newMedia.file),
      size: `${(newMedia.file.size / 1024).toFixed(1)} KB`,
      dimensions: newMedia.file.type.startsWith("image/") ? "1280x720" : undefined,
      duration: newMedia.file.type.startsWith("video/") ? "0:00" : undefined,
      uploadedBy: "Current User",
      uploadedAt: new Date().toISOString().split("T")[0],
      courseId: newMedia.courseId,
      courseName: "Course Name", // In a real app, you would get this from the selected course
    }

    setMediaItems([...mediaItems, uploadedMedia])
    setIsUploadDialogOpen(false)
    setNewMedia({
      name: "",
      file: null,
      courseId: "",
      description: "",
    })
  }

  const handleDeleteMedia = (mediaId: string) => {
    // In a real app, you would call your API to delete the media
    // const response = await fetch(`/api/media/${mediaId}`, {
    //   method: 'DELETE'
    // });

    // Remove media from the state
    setMediaItems(mediaItems.filter((item) => item.id !== mediaId))
    setIsDeleteDialogOpen(false)
  }

  const getMediaIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-10 w-10 text-blue-500" />
      case "video":
        return <VideoIcon className="h-10 w-10 text-red-500" />
      case "document":
      default:
        return <File className="h-10 w-10 text-green-500" />
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("URL copied to clipboard!")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Media Library</h2>
          <p className="text-muted-foreground">Manage images, videos, and documents for your courses.</p>
        </div>
        <Button onClick={() => setIsUploadDialogOpen(true)}>
          <Upload className="mr-2 h-4 w-4" />
          Upload Media
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search media..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="image">Images</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
                <SelectItem value="document">Documents</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Media Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <div className="col-span-full text-center py-8">Loading media items...</div>
        ) : filteredMediaItems.length === 0 ? (
          <div className="col-span-full text-center py-8">
            No media items found. Try adjusting your filters or upload new media.
          </div>
        ) : (
          filteredMediaItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="aspect-video relative bg-muted flex items-center justify-center">
                {item.type === "image" ? (
                  <img src={item.url || "/placeholder.svg"} alt={item.name} className="object-cover w-full h-full" />
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    {getMediaIcon(item.type)}
                    <span className="mt-2 text-sm">{item.name}</span>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium truncate" title={item.name}>
                      {item.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{item.size}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedMedia(item)
                          setIsViewDialogOpen(true)
                        }}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => copyToClipboard(item.url)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy URL
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => {
                          setSelectedMedia(item)
                          setIsDeleteDialogOpen(true)
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">{item.courseName}</div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Upload Media Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Upload Media</DialogTitle>
            <DialogDescription>Upload images, videos, or documents for your courses.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newMedia.name}
                onChange={(e) => setNewMedia({ ...newMedia, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file" className="text-right">
                File
              </Label>
              <Input
                id="file"
                type="file"
                onChange={(e) => {
                  if (e.target.files) {
                    setNewMedia({ ...newMedia, file: e.target.files[0] });
                  }
                }}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="course" className="text-right">
                Course
              </Label>
              <Select
                value={newMedia.courseId}
                onValueChange={(value) => setNewMedia({ ...newMedia, courseId: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Introduction to Data Science</SelectItem>
                  <SelectItem value="2">Advanced JavaScript Masterclass</SelectItem>
                  <SelectItem value="3">Machine Learning Fundamentals</SelectItem>
                  <SelectItem value="4">Complete React Developer Course</SelectItem>
                  <SelectItem value="5">Python for Data Analysis</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={newMedia.description}
                onChange={(e) => setNewMedia({ ...newMedia, description: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUploadMedia}>Upload</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Media Dialog */}
      {selectedMedia && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Media Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="aspect-video relative bg-muted flex items-center justify-center rounded-md overflow-hidden">
                {selectedMedia.type === "image" ? (
                  <img
                    src={selectedMedia.url || "/placeholder.svg"}
                    alt={selectedMedia.name}
                    className="object-contain max-w-full max-h-full"
                  />
                ) : selectedMedia.type === "video" ? (
                  <div className="flex flex-col items-center justify-center">
                    <VideoIcon className="h-16 w-16 text-red-500" />
                    <span className="mt-2">Video Preview Not Available</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <File className="h-16 w-16 text-green-500" />
                    <span className="mt-2">Document Preview Not Available</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
                  <p className="font-medium">{selectedMedia.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Type</h3>
                  <p className="font-medium capitalize">{selectedMedia.type}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Size</h3>
                  <p className="font-medium">{selectedMedia.size}</p>
                </div>
                {selectedMedia.dimensions && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Dimensions</h3>
                    <p className="font-medium">{selectedMedia.dimensions}</p>
                  </div>
                )}
                {selectedMedia.duration && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Duration</h3>
                    <p className="font-medium">{selectedMedia.duration}</p>
                  </div>
                )}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Uploaded By</h3>
                  <p className="font-medium">{selectedMedia.uploadedBy}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Uploaded At</h3>
                  <p className="font-medium">{selectedMedia.uploadedAt}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Course</h3>
                  <p className="font-medium">{selectedMedia.courseName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">URL</h3>
                  <div className="flex items-center gap-2">
                    <Input value={selectedMedia.url} readOnly className="text-xs" />
                    <Button variant="outline" size="icon" onClick={() => copyToClipboard(selectedMedia.url)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                Close
              </Button>
              <Button onClick={() => window.open(selectedMedia.url, "_blank")}>
                <Eye className="mr-2 h-4 w-4" />
                Open
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Media Dialog */}
      {selectedMedia && (
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the media file &quot;{selectedMedia.name}&quot;. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700"
                onClick={() => handleDeleteMedia(selectedMedia.id)}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  )
}

