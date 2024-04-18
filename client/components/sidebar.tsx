import React from "react";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { UserResponse } from "@/graphql/__generated__/graphql";
import { SidebarItem } from "./sidebar-item";
import { ModeToggle } from "./mode-toggle";
import { UserButton } from "./user-button";
import Image from "next/image";

const users: UserResponse[] = [
  {
    email: "thien",
    fullName: "thiem",
    id: "1",
    avatarUrl: "",
  },
];

export const Sidebar = () => {
  return (
    <div className="flex h-full w-full flex-col items-center space-y-4 bg-[#E3E5E8] py-3 text-primary dark:bg-[#1E1F22]">
      <div className="flex cursor-pointer items-center gap-2 font-bold text-muted-foreground">
        <Image src="/logo.png" width={60} height={60} alt="Logo" />
        <h1>HiChat</h1>
      </div>
      <Separator className="mx-auto h-[2px] w-10 rounded-md bg-zinc-300 dark:bg-zinc-700" />
      <ScrollArea className="w-full flex-1">
        {users.map((user) => (
          <div key={user.id} className="mb-4">
            <SidebarItem
              id={user.id}
              fullName={user.fullName}
              imageUrl={user.avatarUrl || ""}
            />
          </div>
        ))}
      </ScrollArea>
      <div className="flex w-full flex-col gap-y-4 px-3">
        <ModeToggle />
        <UserButton />
      </div>
    </div>
  );
};
