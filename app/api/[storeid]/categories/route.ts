import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeid: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    const body = await req.json();
    const { name, billboardId } = body;

    if (!name) {
      return new NextResponse("Name Is Required", { status: 400 });
    }
    if (!billboardId) {
      return new NextResponse("billboard Id Is Required", { status: 400 });
    }

    if (!params.storeid) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeid,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const store = await prismadb.category.create({
      data: {
        name,
        billboardId,
        storeId: params.storeid,
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log("[CATEGORY_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
export async function GET(
  req: Request,
  { params }: { params: { storeid: string } }
) {
  try {
    if (!params.storeid) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const store = await prismadb.category.findMany({
      where: {
        storeId: params.storeid,
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log("[CATEGORY_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
