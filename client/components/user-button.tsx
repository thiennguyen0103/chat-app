"use client";

import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { LogOut, LogOutIcon } from "lucide-react";
import Image from "next/image";

export const UserButton: FC = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="ml-2">
          <div className="font-bold">Thien Nguyen</div>
          <div className="text-muted-foreground">Active</div>
        </div>
      </div>
      <Button variant="outline" size="icon">
        <LogOutIcon className="h-4 w-4 text-muted-foreground" />
      </Button>
    </div>
  );
};
