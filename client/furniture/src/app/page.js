import Banner from "./component/home/banner";
import Collection from "./component/home/Collection-com";
import Featured_produte from "./component/home/Featured-produte";
import New_banner from "./component/home/New_banner";
import Bestselling_Products from "./component/home/Bestselling_Products";
import Over_sprort from "./component/home/Over_sprort";

import { Suspense } from "react";
import { bannerData, bastslerdata, produtitems } from "./api-servis/homeservis";

export default async function Home() {
  
  // CPU & Speed Optimization: Promise.all se teeno API ek saath fetch hongi (Fast Loading)
  // Isse server par load kam padega aur page jaldi render hoga
  const [produtedata, banner, bastsleling] = await Promise.all([
    produtitems(),
    bannerData(),
    bastslerdata()
  ]);

  // Safe data extraction
  const bannerList = banner?.data || [];
  const bestsellingList = bastsleling?.productsata || [];

  return (
    <div className="bg-white overflow-x-hidden"> {/* Horizontal scroll mobile par rokne ke liye */}
      
      {/* 1. Main Banner - Isme priority images honi chahiye */}
      <section className="w-full">
        <Banner bannerdata={bannerList} />
      </section>

      {/* 2. Collections (Responsive Wrapper) */}
      <div className="w-full max-w-[1370px] mx-auto px-4">
        <Collection />
      </div>

      {/* 3. Featured Products - useMemo optimized component */}
      <div className="w-full">
        <Featured_produte produtedata={produtedata} />
      </div>

      {/* 4. Promotional Banner */}
      <New_banner />

      {/* 5. Best Selling Products - Lazy loaded fallback ke saath */}
      <Suspense fallback={<div className="h-96 flex items-center justify-center font-bold">Loading Bestsellers...</div>}>
        <div className="w-full">
          <Bestselling_Products bdata={bestsellingList} />
        </div>
      </Suspense>

      {/* 6. Support/Services Section */}
      <Over_sprort />

    </div>
  );
}