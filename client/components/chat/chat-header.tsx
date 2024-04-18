import { UserAvatar } from "@/components/user-avatar";

interface ChatHeaderProps {
  name: string;
  imageUrl?: string;
}

export const ChatHeader = ({ name, imageUrl }: ChatHeaderProps) => {
  return (
    <div className="text-md flex h-12 items-center border-b-2 border-neutral-200 px-3 font-semibold dark:border-neutral-800">
      {/* <MobileToggle serverId={serverId} /> */}
      <UserAvatar
        src={imageUrl}
        name={name}
        className="mr-2 h-8 w-8 md:h-8 md:w-8"
      />
      <p className="text-md font-semibold text-black dark:text-white">{name}</p>
      <div className="ml-auto flex items-center"></div>
    </div>
  );
};
