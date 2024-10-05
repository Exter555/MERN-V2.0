import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { MainNav } from "@/components/main-nav";
import StoreSwitcher from "@/components/store-switcher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import React from "react";
import { ModeToggle } from "./dark-mode";

const Navbar = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect(`/sign-in`);
  }
  const store = await prismadb.store.findMany({
    where: {
      userId,
    },
  });
  return (
    <>
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <StoreSwitcher items={store} />
          <MainNav className="p-4" />
          <div className="ml-auto flex items-center space-x-4">
            <ModeToggle />
            <UserButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
