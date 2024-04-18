"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { ActionTooltip } from "./action-tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface SidebarItemProps {
  id: string;
  fullName: string;
  imageUrl: string;
}

export const SidebarItem: FC<SidebarItemProps> = (props) => {
  const { id, fullName, imageUrl } = props;
  const router = useRouter();

  const onClick = () => {
    router.push(`/messenger/${id}`);
  };

  return (
    <ActionTooltip side="right" align="center" label={fullName}>
      <button
        onClick={onClick}
        className="group relative flex w-full items-center rounded-sm px-3 hover:bg-accent"
      >
        <div
          className={cn(
            "group relative flex h-[48px] w-[48px] items-center overflow-hidden rounded-[24px] transition-all group-hover:rounded-[16px]",
          )}
        >
          <Avatar>
            <AvatarImage src={imageUrl} />
            <AvatarFallback>{fullName}</AvatarFallback>
          </Avatar>
        </div>
        <div className="text-muted-foreground">{fullName}</div>
      </button>
    </ActionTooltip>
  );
};
