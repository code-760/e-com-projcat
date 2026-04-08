const { teranspoter } = require("../../cofing/mailconfing");
const bcrypt = require("bcrypt");
const { UserModel } = require("../../models/User.model");
let jwt = require("jsonwebtoken");
const e = require("cors");
const crypto = require("crypto"); //
const { AdminModel } = require("../../models/admin.model");

const saltRounds = 10;
let mosntaotp = new Map();

// let sendOTP = async (req, res) => {
//   let obj = { ...req.body };
//   console.log(obj);

//   let usechack = await UserModel.findOne({ useremail: obj.useremail });

//   if (usechack) {
//     req.send({
//       _status: "failed",
//       message: "user already exists",
//     });
//   } else {
//     let opt = Math.floor(Math.random() * 999999)
//       .toString()
//       .slice(0, 6);

//     let userbackend = obj.useremail;

//     mosntaotp.set(userbackend, opt);

//     setTimeout(
//       () => {
//         mosntaotp.delete(userbackend); // 5 min baad OTP delete ho jayega
//       },
//       5 * 60 * 1000,
//     ); // 5 minutes in milliseconds

//     await teranspoter.sendMail({
//       from: '"MONSTA" <himanshu760kumawat@gmail.com>',
//       to: obj.useremail,
//       subject: "Hello ✔",
//       text: `Your OTP is ${opt}`, // Plain-text version of the message
//       html: `
//     <>
//     <div class="min-h-screen bg-gray-50 flex items-center justify-center p-6">
//   <div class="bg-white max-w-md w-full rounded-xl shadow-lg border border-gray-100 overflow-hidden font-sans">

//     <div class="bg-gray-900 p-6 text-center">
//       <h2 class="text-2xl font-bold text-white tracking-wide uppercase">
//         MONSTA
//       </h2>
//     </div>

//     <div class="p-8">
//       <div class="text-center mb-6">
//         <h2 class="text-2xl font-bold text-gray-800">Verify Your Email</h2>
//         <p class="text-gray-500 text-sm mt-2">
//           Use the code below to complete your registration.
//         </p>
//       </div>

//       <div class="flex justify-center my-8">
//         <div class="bg-indigo-50 border border-indigo-100 text-indigo-600 text-4xl font-bold tracking-[0.2em] px-8 py-4 rounded-lg shadow-sm">
//           ${opt}
//         </div>
//       </div>

//       <div class="text-center space-y-4">
//         <p class="text-gray-600 text-sm">
//           This code will expire in <span class="font-semibold text-gray-800">5 minutes</span>.<br/>
//           Please do not share this code with anyone.
//         </p>

//         <p class="text-gray-400 text-xs">
//           If you didn't create an account with MONSTA, you can safely ignore this email.
//         </p>
//       </div>

//       <div class="mt-8 pt-6 border-t border-gray-100 text-center">
//         <p class="text-gray-500 text-sm font-medium">The Monsta Team</p>
//         <p class="text-gray-400 text-xs mt-2">
//           &copy; ${new Date()} Monsta Inc. All rights reserved.
//         </p>
//       </div>

//     </div>
//   </div>
// </div>
// </>
// `, // HTML version of the message
//     });

//     res.send({
//       _status: "success",
//       message: "otp sent successfully",
//     });
//   }
// };

let loginuser = async (req, res) => {
  let { useremail, Password } = { ...req.body };
  let user = await UserModel.findOne({ useremail });

  if (user) {
    let bdpassswor = user.Password;
    let tokan = jwt.sign({ UserID: user._id }, process.env.TOKEN);

    if (bcrypt.compareSync(Password, bdpassswor)) {
      return res.send({
        _status: "success",
        message: "login successful",
        tokan,
      });
    } else {
      return res.send({
        _status: "failed",
        message: "invalid password",
      });
    }
  } else {
    return res.send({
      _status: "failed",
      message: "user not found",
    });
  }
};

let Admingooglelogin = async (req, res) => {
  try {
    let { Adminemail, AdminName, Adminphone, Adminprofile } = { ...req.body };

    // 🔴 SABSE ZAROORI STEP: Sirf apni email id yahan likhein
    const allowedAdmins = ["himanshu760kumawat@gmail.com"]; // Yahan apni personal email dalein

    if (!allowedAdmins.includes(Adminemail)) {
      return res.status(403).send({
        _status: "failed",
        message: "Aap admin nahi hain. Access Denied!",
      });
    }

    let user = await AdminModel.findOne({ Adminemail });

    if (user) {
      // Agar pehle se admin bana hua hai toh direct login
      let token = jwt.sign({ UserID: user._id }, process.env.TOKEN);
      return res.send({
        _status: "success",
        message: "Admin login successful",
        token,
      });
    } else {
      // Agar admin pehli baar login kar raha hai, tabhi create hoga
      let randomPassword = crypto.randomBytes(8).toString("hex");
      const salt = await bcrypt.genSalt(10);
      let encryptedPassword = await bcrypt.hash(randomPassword, salt);

      let userobj = {
        Adminemail,
        AdminName,
        Adminphone,
        Adminprofile,
        Password: encryptedPassword,
        role: "admin", // Ek role bhi set kar dena accha rehta hai
      };

      let newAdmin = new AdminModel(userobj);
      let userres = await newAdmin.save();
      let token = jwt.sign({ UserID: userres._id }, process.env.TOKEN);

      res.send({
        _status: "success",
        message: "Admin created and login successful",
        token,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ _status: "failed", message: "Server Error" });
  }
};

let changepassword = async (req, res) => {
  let { oldpassword, newpassword, ConfirmPassword } = req.body;
  let token = req.headers.authorization.split(" ")[1];
  let decoded = jwt.verify(token, process.env.TOKEN);
  let userid = decoded.UserID;
  let user = await UserModel.findOne({ _id: userid });
  let bdpassswor = user.Password;
  if (bcrypt.compareSync(oldpassword, bdpassswor)) {
    if (newpassword === ConfirmPassword) {
      const hash = bcrypt.hashSync(newpassword, saltRounds);
      await UserModel.updateOne({ _id: userid }, { Password: hash });
      return res.send({
        _status: "success",
        message: "password changed successfully",
      });
    } else {
      return res.send({
        _status: "failed",
        message: "new password and confirm password do not match",
      });
    }
  } else {
    return res.send({
      _status: "failed",
      message: "invalid old password",
    });
  }

  // Implementation for change password
};

let updateuser = async (req, res) => {
  let updateData = { ...req.body };

  let token = req.headers.authorization.split(" ")[1];
  let decoded = jwt.verify(token, process.env.TOKEN);
  let userid = decoded.UserID;

  if (req.file) {
    if (
      req.file.filename != "" &&
      req.file.filename != null &&
      req.file.filename != undefined
    ) {
      updateData["userprofile"] = req.file.filename;
    }
  }

  await UserModel.updateOne(
    { _id: userid },
    {
      $set: updateData,
    },
  );
  res.send({
    _status: "success",
    message: "user updated successfully",
    data: updateData,
  });
};

let admindetail = async (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  let decoded = jwt.verify(token,process.env.TOKEN);

  let userid = decoded.UserID;
  let data = await AdminModel.findOne({ _id: userid });

  res.send({
    _status: "success",
    message: "admin details fetched successfully",
    path: process.env.PROFILEIMAGEPATH,
    data,
  });
};

let forgetpassword = async (req, res) => {
  // Implementation for forget password

  let { useremail } = { ...req.body };
  let user = await UserModel.findOne({ useremail });

  if (user) {
    let userid = jwt.sign({ UserID: user._id }, process.env.TOKEN);
    let resetLink = `${process.env.FRONTENDURL}/forgate-passwode?token=${userid}`;
    await teranspoter.sendMail({
      from: '"MONSTA"  <himanshu760kumawat@gmail.com>',
      to: useremail,
      subject: "Password Reset Request",
      text: `Click the link to reset your password: ${resetLink}`, // Plain-text version of the message
      html: `
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}">Reset Password</a>
      `, // HTML version of the message
    });
    res.send({
      _status: "success",
      message: "Password reset link sent to your email",
    });
  } else {
    return res.send({
      _status: "failed",
      message: "user not found",
    });
  }
};

let resetpassword = async (req, res) => {
  let { ConfirmPassword, newpassword } = req.body;

  let token = req.headers.authorization.split(" ")[1];
  let decoded = jwt.verify(token, process.env.TOKEN);
  let userid = decoded.UserID;

  if (newpassword === ConfirmPassword) {
    const hash = bcrypt.hashSync(newpassword, saltRounds);
    await UserModel.updateOne({ _id: userid }, { Password: hash });
    res.send({
      _status: "success",
      message: "Password reset successfully",
    });
  } else {
    res.send({
      _status: "failed",
      message: "Passwords do not match",
    });
  }
};

let updateShipping = async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let decoded = jwt.verify(token, process.env.TOKEN);
    let userid = decoded.UserID;

    // Sirf shippingAddress field ko update karo
    await UserModel.findByIdAndUpdate(userid, {
      $set: { shippingAddress: req.body },
    });

    res.send({ _status: "success", message: "Shipping Address Updated" });
  } catch (error) {
    res.status(500).send({ _status: "error", message: error.message });
  }
};

module.exports = {
  loginuser,
  updateuser,
  admindetail,
  forgetpassword,
  resetpassword,
  changepassword,
  Admingooglelogin,
  updateShipping,
};
