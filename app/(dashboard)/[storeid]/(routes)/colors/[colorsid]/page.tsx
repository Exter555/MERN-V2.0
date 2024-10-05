import prismadb from "@/lib/prismadb";
import ColorForm from "./components/colors-form";

const ColorPage = async ({ params }: { params: { colorsid: string } }) => {
  const color = await prismadb.color.findUnique({
    where: {
      id: params.colorsid,
    },
  });
  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ColorForm initialData={color} />
        </div>
      </div>
    </>
  );
};

export default ColorPage;
