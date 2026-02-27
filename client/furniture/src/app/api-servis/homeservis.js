const { default: axios } = require("axios");
let basurl = process.env.NEXT_PUBLIC_BASEURL;

let produtitems = async () => {
  return axios
    .get(`${basurl}home-items/prodecat-tebs`)
    .then((res) => res.data)
    .then((filedata) => {
      return filedata;
    });
};

export { produtitems };
 