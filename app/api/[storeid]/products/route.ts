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
    const {
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      images,
      isFeatures,
      isArchived,
    } = body;

    if (!name) {
      return new NextResponse("Name Is Required", { status: 400 });
    }
    if (!price) {
      return new NextResponse("price  Is Required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("category  Is Required", { status: 400 });
    }
    if (!colorId) {
      return new NextResponse("color  Is Required", { status: 400 });
    }

    if (!sizeId) {
      return new NextResponse("size Is Required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("images Is Required", { status: 400 });
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

    const store = await prismadb.product.create({
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        isFeatures,
        isArchived,
        storeId: params.storeid,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log("[PRODUCT_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
export async function GET(
  req: Request,
  { params }: { params: { storeid: string } }
) {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get("categoryId") || undefined;
  const colorId = searchParams.get("colorId") || undefined;
  const sizeId = searchParams.get("sizeId") || undefined;
  const isFeatures = searchParams.get("isFeatures");

  try {
    if (!params.storeid) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const store = await prismadb.product.findMany({
      where: {
        storeId: params.storeid,
        categoryId,
        colorId,
        sizeId,
        isFeatures: isFeatures ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log("[PRODUCT_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
