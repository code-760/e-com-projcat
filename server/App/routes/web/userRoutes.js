let express  =require("express")
const { sendOTP, createuser, loginuser, updateuser, userdetail, forgetpassword, resetpassword, changepassword } = require("../../controler/web/Authcontrolle")
const { fileuplode } = require("../../middlewera/fileupdole")


let uploads = fileuplode("uploads/users");
let userRoutes=express.Router()


userRoutes.post("/send-OTP",sendOTP)
userRoutes.post("/create-user",createuser)
userRoutes.post('/login',loginuser)
userRoutes.post('/change-password',changepassword)
userRoutes.post('/update-user',uploads.single("userprofile"),updateuser)
userRoutes.post('/user-detail',userdetail)
userRoutes.post('/forget-password',forgetpassword)
userRoutes.post('/reset-password',resetpassword)







module.exports={userRoutes}