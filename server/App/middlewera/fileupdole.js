
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// 1. Cloudinary ko apne account ki keys do (Render/Laptop ke .env se lega)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// 2. Tumhara Reusable Function
const fileuplode = (folderName) => {
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: folderName, // Cloudinary ke andar is naam ka folder ban jayega
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp'], // Sirf image aane dega
    },
  });

  return multer({ storage: storage });
};

module.exports = { fileuplode };


// let fileuplode=(path)=>{
//     let storage = multer.diskStorage({
//   destination: (req, file, cd) => {
//     cd(null,path );
//   },
//   path(req, file, cd) {
//     cd(null, Date.now() + file.originalname);
//   },
// });

// return multer({ storage: storage });

// }

// module.exports={fileuplode}