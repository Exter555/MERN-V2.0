import prismadb from "@/lib/prismadb";
import { ProductClient } from "./components/client";
import { ProductColumnProps } from "./components/column";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";
const ProductsPage = async ({ params }: { params: { storeid: string } }) => {
  const Products = await prismadb.product.findMany({
    where: {
      storeId: params.storeid,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formattedProducts: ProductColumnProps[] = Products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatures: item.isFeatures,
    isArchived: item.isArchived,
    price: formatter.format(item.price.toNumber()),
    category: item.category.name,
    size: item.size.name,
    color: item.color.value,
    createAt: format(item.createdAt, "MMMM do,yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
