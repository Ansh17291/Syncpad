"use client";

import { ReactNode, useState } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { FullScreenLoader } from "@/components/fullscreen-loader";

type User = {id: string, name : string, avatar : string}

export function Room({ children }: { children: ReactNode }) {
    const params = useParams();
    const [user, setUser] = useState<User[]>([]);
  return (
    <LiveblocksProvider 
      throttle={16}
      authEndpoint="/api/liveblocks-auth"  
      resolveUsers = {()=> []}  
      resolveMentionSuggestions = {()=> []}
      resolveRoomsInfo= {()=> []}
    >
      <RoomProvider id={params.documentId as string}>
        <ClientSideSuspense fallback={<FullScreenLoader label="Room Loading ..." />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}