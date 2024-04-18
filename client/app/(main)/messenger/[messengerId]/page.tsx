import { ChatBody } from "@/components/chat/chat-body";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";

interface MessengerIdPageProps {
  params: {
    messageId: string;
  };
}

const MessengerIdPage = async ({ params }: MessengerIdPageProps) => {
  return (
    <div className="flex h-full flex-col bg-white dark:bg-[#313338]">
      <ChatHeader name="Thien" />
      <ChatBody name="Thien" />
      <ChatInput name={"Thien"} />
    </div>
  );
};

export default MessengerIdPage;
