"use client";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useEffect } from "react";
const SetupPage = () => {
  const onOpen = useStoreModal((state) => state.onOpen);
  useEffect(() => {
    onOpen();
  }, [onOpen]);
  return null;
  // return <div className="p-4">Root Page</div>
};

export default SetupPage;
