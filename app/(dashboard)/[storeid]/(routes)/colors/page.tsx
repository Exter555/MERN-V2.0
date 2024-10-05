import prismadb from "@/lib/prismadb";
import { ColorsClient } from "./components/client";
import { ColorsColumn } from "./components/column";
import { format } from "date-fns";
const ColorsPage = async ({ params }: { params: { storeid: string } }) => {
  const Colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeid,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formattedColors: ColorsColumn[] = Colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createAt: format(item.createdAt, "MMMM do,yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorsClient data={formattedColors} />
      </div>
    </div>
  );
};

export default ColorsPage;
