const { default: axios } = require("axios");
let basurl = process.env.NEXT_PUBLIC_BASEURL|| "https://e-com-projcat.onrender.com/web/";

let produtitems = async () => {
  return axios
    .get(`${basurl}home-items/prodecat-tebs`)
    .then((res) => res.data)
    .then((filedata) => {
      return filedata;
    });
};


let bannerData = () => {
  return axios
    .get(`${basurl}home-items/banner-data`)
    .then((res) => res.data)
    .then((filedata) => {
      return filedata;
    })
    .catch((err) => {
      console.log(err);
    });
};

let bastslerdata = () => {
  return axios
    .get(`${basurl}home-items/bestsellers`)
    .then((res) => res.data)
    .then((filedata) => {
      return filedata;
    });
};



export { produtitems, bannerData, bastslerdata };
