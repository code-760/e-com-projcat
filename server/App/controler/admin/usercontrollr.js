const { UserModel } = require("../../models/User.model");

let userviwe = async (req, rec) => {
  const addCondition = [
    {
      deletdat: null,
    },
  ];

  const orCondition = [];

  if (req.query.UserName != undefined && req.query.UserName  != "") {
    orCondition.push({ UserName : new RegExp(req.query.UserName , "i") });
  }

  if (req.query.Order != undefined && req.query.Order != "") {
    orCondition.push({ Order: req.query.Order });
  }

  if (addCondition.length > 0) {
    var filter = { $and: addCondition };
  } else {
    var filter = {};
  }

  if (orCondition.length > 0) {
    filter.$or = orCondition;
  }

  let date = await UserModel.find(filter);

  let userdata = date.map((user) => {
    return {
      _id: user._id,
      UserName: user.UserName,
      useremail: user.useremail,
      Userstatus: user.Userstatus,
      userprofile: user.userprofile,
      country: user.country,
      userphone: user.userphone,
    };
  });

  rec.send({
    status: true,
    messages: "create api",
    path: process.env.PROFILEIMAGEPATH,
    data: userdata,
  });
};
// 1. Multi Delete API
let usermultidelete = async (req, res) => {
  // 'rec' ko 'res' kar diya standard ke liye
  try {
    let { ids } = req.body;

    let softdelRes = await UserModel.updateMany(
      { _id: { $in: ids } },
      {
        $set: {
          isdeleted: true,
          deletdat: Date.now(), // Make sure ye aapke schema mein bhi 'deletdat' hi ho (deletedAt zyada common hai)
        },
      },
    );

    res.send({
      status: true,
      message: "Users deleted successfully",
      softdelRes,
    });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).send({ status: false, message: "Internal Server Error" });
  }
};

// 2. Change Status API
let userchangeStatus = async (req, res) => {
  try {
    let { ids } = req.body;

    let updetdeta = await UserModel.updateMany(
      { _id: { $in: ids } }, // YAHAN FIX KIYA HAI: $in operator add kiya
      [
        {
          $set: {
            Userstatus: { $not: "$Userstatus" },
          },
        },
      ],
      { updatePipeline: true },
    );

    res.send({
      status: true, // YAHAN FIX KIYA HAI: underscore hata diya frontend se match karne ke liye
      message: "User status changed successfully",
      updetdeta,
    });
  } catch (error) {
    console.error("Status Update Error:", error);
    res.status(500).send({ status: false, message: "Internal Server Error" });
  }
};

module.exports = { userviwe, usermultidelete, userchangeStatus };
