"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getInitial, getProfileImageUrl } from "@/lib/utils";
import { LogOut } from "lucide-react";
import React from "react";
import { useUser } from "@/hooks/use-user";

const UserButton = () => {
  const { user } = useUser();
  return (
    <div className=" flex gap-2 items-center space-x-4 rounded-md ">
      <Avatar>
        <AvatarImage
          src={getProfileImageUrl(user?.profile_picture)}
          alt={user?.display_name}
        />
        <AvatarFallback>{getInitial(user?.display_name ?? "")}</AvatarFallback>
      </Avatar>
      {user?.display_name}
      <Button variant="destructive" className=" gap-2">
        <LogOut />
        Logout
      </Button>
    </div>
  );
};

export default UserButton;
