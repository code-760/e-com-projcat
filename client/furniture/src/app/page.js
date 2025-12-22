""
import Image from "next/image";
import Banner from "./component/home/banner";
import Collection from "./component/home/Collection-com";
import Featured_produte from "./component/home/Featured-produte";
import New_banner from "./component/home/New_banner";
import Bestselling_Products from "./component/home/Bestselling_Products";
import Over_sprort from "./component/home/Over_sprort";

export default function Home() {
  return (
   <div className=" bg-white">
    <Banner   />
    <Collection/>
    <Featured_produte/>
    <New_banner/>
    <Bestselling_Products/>
    <Over_sprort/>
   
    
   </div>
  );
}
