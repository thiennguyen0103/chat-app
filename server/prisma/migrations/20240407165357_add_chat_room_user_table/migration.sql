-- CreateTable
CREATE TABLE "ChatRoomUsers" (
    "chatRoomId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChatRoomUsers_pkey" PRIMARY KEY ("chatRoomId","userId")
);

-- AddForeignKey
ALTER TABLE "ChatRoomUsers" ADD CONSTRAINT "ChatRoomUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatRoomUsers" ADD CONSTRAINT "ChatRoomUsers_chatRoomId_fkey" FOREIGN KEY ("chatRoomId") REFERENCES "ChatRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;
