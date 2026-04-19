const { oderModel } = require("../../models/oder.model");

let Oderviwe = async (req, rec) => {
  const addCondition = [
    {
      deletdat: null,
    },
  ];

  const orCondition = [];

  if (req.query.OderiD != undefined && req.query.OderiD!= "") {
    orCondition.push({ OderiD : new RegExp(req.query.OderiD , "i") });
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

  let data = await  oderModel.find(filter);

 

  rec.send({
    status: true,
    messages: "create api",
    path: process.env.PRODUCTIMAGEPATH,
    // data
  });
};

module.exports={Oderviwe}