const { default: axios } = require("axios");
let basurl = process.env.NEXT_PUBLIC_BASEURL;

let produtesdata = async (id) => {
  return axios
    .get(`${basurl}product/productsditled/${id}`)
    .then((res) => res.data)
    .then((filedata) => {
      return filedata;
    });
};

export { produtesdata };