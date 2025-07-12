"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/use-user";
import { getInitial, getProfileImageUrl } from "@/lib/utils";
import React, { useRef, useState } from "react";
import { Camera } from "lucide-react";
import EditProfileForm from "../forms/edit-profile-form";
import Skeleton from "./skeleton";

const ProfileCard = () => {
  const { user, loading } = useUser();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmitSuccess = () => {
    setPreviewImage(null);
    setSelectedFile(null);
  };

  if (loading) {
    return <Skeleton />;
  }

  if (!user) {
    return (
      <div className="flex justify-center">
        <p className="text-center text-gray-500">No user data available</p>
      </div>
    );
  }

  const imageUrl = previewImage || getProfileImageUrl(user.profile_picture);

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full">
      <div className="flex flex-col items-center lg:w-[30%]">
        <div className="relative">
          <Avatar className="w-48 h-48">
            <AvatarImage
              src={imageUrl || undefined}
              alt={user.display_name}
            />
            <AvatarFallback className="text-4xl">
              {getInitial(user.display_name || "")}
            </AvatarFallback>
          </Avatar>
          <Button
            type="button"
            size="icon"
            variant="outline"
            className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full"
            onClick={triggerFileInput}
          >
            <Camera className="h-5 w-5" />
          </Button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      <div className="lg:w-[70%]">
        <EditProfileForm
          user={user}
          selectedImage={selectedFile}
          onSubmitSuccess={handleSubmitSuccess}
        />
      </div>
    </div>
  );
};

export default ProfileCard;
