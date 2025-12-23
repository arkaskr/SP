"use client";

import React, { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { User, Shield } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { deleteImg } from "@/lib/img";
import {
  getResizedImage,
  uploadImg,
  deleteServerSide,
} from "@/app/actions/img";
import { ChangeEvent } from "react";

export default function ProfileAccount() {
  const { data: session } = useSession();
  const [image, setImage] = useState<string | null>(null);
  const [firstName, setFirstName] = useState(session?.user.name.split(" ")[0]);
  const [lastName, setLastName] = useState(session?.user.name.split(" ")[1]);
  const [email, setEmail] = useState(session?.user.email);
  const [phone, setPhone] = useState(session?.user.ph_no);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (session?.user) {
      setImage(session.user.image || null);
      const [first, ...last] = session.user.name.split(" ");
      setFirstName(first);
      setLastName(last.join(" "));
      setEmail(session.user.email);
      setPhone(session.user.ph_no);
    }
  }, [session]);

  const uploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | null | undefined = e.target.files?.[0];
    if (!file) return;
    removeImage();
    const reader = new FileReader();
    reader.onload = async (event) => {
      const fileData = event.target?.result;
      if (fileData) {
        const presignedURL = new URL(
          "/api/presigned-upload",
          window.location.href
        );
        presignedURL.searchParams.set("fileName", file.name);
        presignedURL.searchParams.set("contentType", file.type);
        const smallerPayload = await getResizedImage(fileData as ArrayBuffer);
        const check = await uploadImg(
          presignedURL.toString(),
          smallerPayload,
          file
        );

        if (check) {
          console.log("File uploaded successfully");
        } else {
          console.log("File upload failed");
        }
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleChangePhoto = () => {
    fileInputRef.current?.click();
  };

  const removeImage = async () => {
    if (!image) return

    try {
      const fileName = image.split("/").pop() as string;
      const presignedURL = new URL(
        "/api/presigned-delete",
        window.location.href
      );
      presignedURL.searchParams.set("fileName", fileName);
      // const check = await DeleteImg(presignedURL.toString());
      const serverSide = await deleteServerSide(
        presignedURL.toString(),
        window.location.origin
      );
      console.log(serverSide);
      if (serverSide) {
        console.log("File deleted successfully");
      } else {
        console.log("File delete failed");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general" className="gap-2">
            <User className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information and profile photo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={image || undefined} />
                    <AvatarFallback>{firstName}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button onClick={handleChangePhoto}>Change Photo</Button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }} // Hide the file input element
                      onChange={uploadFile} // Handle file change
                      accept="image/*" // Allow only image files
                    />
                    <Button variant="ghost" onClick={removeImage}>
                      Remove
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        defaultValue={firstName}
                        onChange={(e) => {
                          setFirstName(e.target.value);
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        defaultValue={lastName}
                        onChange={(e) => {
                          setLastName(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone No.</Label>
                    <Input
                      id="phone"
                      type="phone"
                      defaultValue={phone?.toString()}
                      onChange={(e) => {
                        setPhone(Number(e.target.value));
                      }}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>
                  Manage your app preferences and settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Language</Label>
                    <p className="text-sm text-muted-foreground">
                      Select your preferred language
                    </p>
                  </div>
                  <Button variant="outline">English</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your security preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Change Password</Label>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                      Confirm New Password
                    </Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                </div>
                <Button>Update Password</Button>
              </div>
              <Separator />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
