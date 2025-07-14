"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import React from "react";
import { useParticipant } from "@/hooks/use-participant";

const UserButton = () => {
  const { user, logout } = useParticipant();
  return (
    <div className=" flex gap-2 items-center space-x-4 rounded-md bg-white text-black px-3 py-1">
      <span className=" line-clamp-1">{user?.participant.name}</span>
      <Button variant="destructive" className=" gap-2" onClick={logout}>
        <LogOut />
        Logout
      </Button>
    </div>
  );
};

export default UserButton;
