"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";

export function Room({ children }: { children: ReactNode }) {
    const params = useParams();
  return (
    <LiveblocksProvider publicApiKey={"pk_dev_SxgiXN2SMmevjgSUCluqDFNZxlduHe1rgaWXR7_WEl2xk96U5LyZaWlbsr57tO6x"}>
      <RoomProvider id={params.documentId as string}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}