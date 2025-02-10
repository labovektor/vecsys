"use client";

import { useAuthContext } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { baseURL } from "@/lib/axios";
import { getInitial } from "@/lib/utils";
import { Menu, Search, LogOut } from "lucide-react";
import Image from "next/image";
import React from "react";

const TopBar = ({ onClick }: { onClick: () => void }) => {
  const auth = useAuthContext();
  return (
    <header className=" border-b px-5 py-3 bg-vblue-900 flex gap-4 items-center justify-between ">
      <div className=" flex gap-4 items-center">
        <Button
          onClick={onClick}
          className=" bg-vblue-800 text-white"
          variant="outline"
        >
          <Menu className=" h-4 w-4" />
        </Button>
        <Image src="img/logo_notitle.svg" width={48} height={48} alt="logo" />
      </div>

      <div className=" flex gap-2">
        <Input />
        <Button>
          <Search />
        </Button>
      </div>

      <div className=" flex gap-2 items-center space-x-4 rounded-md border border-slate-800 bg-vblue-800 text-white p-2">
        <Avatar>
          <AvatarImage
            src={`${baseURL}${auth.state.admin?.profile_picture}`}
            alt={auth.state.admin?.display_name}
          />
          <AvatarFallback>
            {getInitial(
              auth.state.admin?.display_name ?? "Vektorial Labophase"
            )}
          </AvatarFallback>
        </Avatar>
        {auth.state.admin?.display_name}
        <Button variant="destructive" className=" gap-2">
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
};

export default TopBar;
