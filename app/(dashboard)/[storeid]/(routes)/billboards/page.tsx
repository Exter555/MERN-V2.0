import prismadb from "@/lib/prismadb";
import { BillboardClient } from "./components/client";
import { BillboardColumnProps } from "./components/column";
import { format } from "date-fns";
const BillboardsPage = async ({ params }: { params: { storeid: string } }) => {
  const billboard = await prismadb.billboards.findMany({
    where: {
      storeId: params.storeid,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formattedBillboard: BillboardColumnProps[] = billboard.map((item) => ({
    id: item.id,
    label: item.label,
    createAt: format(item.createdAt, "MMMM do,yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboard} />
      </div>
    </div>
  );
};

export default BillboardsPage;
