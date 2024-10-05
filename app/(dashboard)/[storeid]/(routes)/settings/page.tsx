import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SettingForm from "./components/setting-form";

interface SettingsPageProps {
  params: {
    storeid: string;
  };
}

const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismadb.store.findFirst({
    where: {
      id: params.storeid,
      userId,
    },
  });

  if (!stores) {
    redirect("/");
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingForm initialData={stores} />
      </div>
    </div>
  );
};

export default SettingsPage;
