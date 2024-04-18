"use client";

import { ElementRef, useRef } from "react";

import { ChatWelcome } from "./chat-welcome";

const DATE_FORMAT = "d MMM yyyy, HH:mm";

interface ChatBodyProps {
  name: string;
}

export const ChatBody = ({ name }: ChatBodyProps) => {
  const chatRef = useRef<ElementRef<"div">>(null);
  const bottomRef = useRef<ElementRef<"div">>(null);

  // const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
  //   useChatQuery({
  //     queryKey,
  //     apiUrl,
  //     paramKey,
  //     paramValue,
  //   });
  // useChatSocket({ queryKey, addKey, updateKey });
  // useChatScroll({
  //   chatRef,
  //   bottomRef,
  //   loadMore: fetchNextPage,
  //   shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
  //   count: data?.pages?.[0]?.items?.length ?? 0,
  // });

  // if (status === "pending") {
  //   return (
  //     <div className="flex flex-col flex-1 justify-center items-center">
  //       <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
  //       <p className="text-xs text-zinc-500 dark:text-zinc-400">
  //         Loading messages...
  //       </p>
  //     </div>
  //   );
  // }

  // if (status === "error") {
  //   return (
  //     <div className="flex flex-col flex-1 justify-center items-center">
  //       <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
  //       <p className="text-xs text-zinc-500 dark:text-zinc-400">
  //         Something went wrong!
  //       </p>
  //     </div>
  //   );
  // }

  return (
    <div ref={chatRef} className="flex flex-1 flex-col overflow-y-auto py-4">
      <div className="flex-1" />
      <ChatWelcome name={name} />

      {/* <div className="mt-auto flex flex-col-reverse">
        <ChatItem
          key={message.id}
          id={message.id}
          currentMember={member}
          member={message.member}
          content={message.content}
          fileUrl={message.fileUrl}
          deleted={message.deleted}
          timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
          isUpdated={message.updatedAt !== message.createdAt}
          socketUrl={socketUrl}
          socketQuery={socketQuery}
        />
      </div> */}
      <div ref={bottomRef} />
    </div>
  );
};
