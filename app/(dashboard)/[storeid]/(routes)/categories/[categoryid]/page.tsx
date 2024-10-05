import prismadb from "@/lib/prismadb";
import CategoryForm from "./components/category-form";

const CategoryPage = async ({
  params,
}: {
  params: { categoryid: string; storeid: string };
}) => {
  const categories = await prismadb.category.findUnique({
    where: {
      id: params.categoryid,
    },
  });

  const billboard = await prismadb.billboards.findMany({
    where: {
      storeId: params.storeid,
    },
  });
  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <CategoryForm billboards={billboard} initialData={categories} />
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
