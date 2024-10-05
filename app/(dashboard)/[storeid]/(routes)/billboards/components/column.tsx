"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./call-action";

export type BillboardColumnProps = {
  id: string;
  label: string;
  createAt: string;
};

export const columns: ColumnDef<BillboardColumnProps>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
