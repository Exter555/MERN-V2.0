import prismadb from "@/lib/prismadb";
import { SizesClient } from "./components/client";
import { SizesColumn } from "./components/column";
import { format } from "date-fns";
const SizesPage = async ({ params }: { params: { storeid: string } }) => {
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeid,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formattedSizes: SizesColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createAt: format(item.createdAt, "MMMM do,yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizesClient data={formattedSizes} />
      </div>
    </div>
  );
};

export default SizesPage;
