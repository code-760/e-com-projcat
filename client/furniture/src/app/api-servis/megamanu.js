import axios from "axios";

let basurl = process.env.NEXT_PUBLIC_BASEURL;


let magamanu = async () => {

    let manu = await axios.get(`${basurl}home-items/mega-manu`)
    .then((res) =>res.data)
    .then((filedata)=>{
        
        return filedata.categoryData
        
    })
    .catch((err)=>{
        console.log(err);
    })
    return manu
  


}

export { magamanu };
  

