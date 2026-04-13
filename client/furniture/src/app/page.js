

import Banner from "./component/home/banner";

import Collection from "./component/home/Collection-com";
import Featured_produte from "./component/home/Featured-produte";
import New_banner from "./component/home/New_banner";
import Bestselling_Products from "./component/home/Bestselling_Products";
import Over_sprort from "./component/home/Over_sprort";
import { bannerData, bastslerdata, produtitems } from "./api-servis/homeservis";

export default async function Home() {
  
  let produtedata = await produtitems();

  let banner = await bannerData();

  let bastsleling = await bastslerdata();

  let { data} = banner;
  
  let { productsata} = bastsleling;

  
  



  return (
    <div className=" bg-white">
      <Banner bannerdata={data}  />
      <Collection />
      <Featured_produte produtedata={produtedata} />
      <New_banner />
      <Bestselling_Products bdata={productsata} />
      <Over_sprort />
    </div>
  );
}
