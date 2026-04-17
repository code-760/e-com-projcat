import { produtesdata, allprodutes } from "@/app/api-servis/productapi"; // allprodutes bhi import karein
import Bestselling_Products from "@/app/component/home/Bestselling_Products";
import Singleproducte from "@/app/component/home/producte/Singleproducte";
import Link from "next/link";
import { Suspense } from "react";

// SEO ke liye Metadata (Zaroori hai professional site ke liye)
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await produtesdata(slug);

  // console.log("Product Metadata:", product); // Debugging ke liye 
  return {
    title: product?.data?.ProductName || "Product Details",
    description: "Premium Furniture at E-Furniture Web",
  };
}

export default async function ProductDetails({ params }) {
  const { slug } = await params;

  // Parallel Fetching: Dono APIs ko ek saath hit karein taaki time bache (CPU Optimization)
  const [productDetails] = await Promise.all([
    produtesdata(slug),
  ]);

  console.log("Product ",productDetails);
  



  if (!productDetails || !productDetails.data) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Product Not Found</h1>
        <Link href="/" className="text-[#C09578] font-semibold underline">Back to Home</Link>
      </div>
    );
  }
  



  return (
    <main className="w-full">
      {/* 1. Main Product Section */}
      <section className="bg-white">
        <Singleproducte data={productDetails.data} />
      </section>

      {/* 2. Best Selling Section (Responsive Wrapper) */}
      <section className="w-full py-10 bg-gray-50">
        <div className="max-w-[1370px] mx-auto px-4">
          {/* Suspense taaki agar slider load hone mein time le toh baki page na ruke */}
          <Suspense fallback={<div className="text-center p-10">Loading Suggestions...</div>}>
            <Bestselling_Products/>
          </Suspense>
        </div>
      </section>
    </main>
  );
}