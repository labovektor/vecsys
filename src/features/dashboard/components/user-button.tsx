"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/AuthContext";
import { baseURL } from "@/lib/axios";
import { getInitial } from "@/lib/utils";
import { LogOut } from "lucide-react";
import React from "react";

const UserButton = () => {
  const auth = useAuthContext();
  return (
    <div className=" flex gap-2 items-center space-x-4 rounded-md ">
      <Avatar>
        <AvatarImage
          src={`${baseURL}${auth.state.admin?.profile_picture}`}
          alt={auth.state.admin?.display_name}
        />
        <AvatarFallback>
          {getInitial(auth.state.admin?.display_name ?? "")}
        </AvatarFallback>
      </Avatar>
      {auth.state.admin?.display_name}
      <Button variant="destructive" className=" gap-2">
        <LogOut />
        Logout
      </Button>
    </div>
  );
};

export default UserButton;
