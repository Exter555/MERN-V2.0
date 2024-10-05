"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { BillboardColumnProps, columns } from "./column";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

interface BillboardsClientProps {
  data: BillboardColumnProps[];
}

export const BillboardClient: React.FC<BillboardsClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${data.length})`}
          description="Manage billboard for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeid}/billboards/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="label" data={data} columns={columns} />
      <Heading title="API" description="API call for billboards" />
      <Separator />
      <ApiList entityName="billboards" entityId="billboardId" />
    </>
  );
};
