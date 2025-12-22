let multer = require("multer");

let fileuplode=(filename)=>{
    let storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null,filename );
  },
  filename(req, file, cd) {
    cd(null, Date.now() + file.originalname);
  },
});

return multer({ storage: storage });

}

module.exports={fileuplode}