import { produtesdata } from "@/app/api-servis/productapi";
import Bestselling_Products from "@/app/component/home/Bestselling_Products";
import Singleproducte from "@/app/component/home/producte/Singleproducte";

export default async function productditles({ params }) {
  let productadata = await params;

  let id = productadata.slug;

  let ditles = await produtesdata(id);

  return (
    <>
      {ditles ? (
        <Singleproducte data={ditles.data} />
      ) : (
        <h1 className="text-center text-3xl font-bold mt-20">Loading...</h1>
      )}

      <Bestselling_Products />
    </>
  );
}
