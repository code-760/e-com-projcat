const { TastimonialModel } = require("../../models/Tastimonial.Model");

// TastimonialModel.syncIndexes();

let Tastimonialcreate = async (req, rec) => {
  console.log(req.body);

  let insertobj = { ...req.body };

  console.log();

  if (req.file) {
    if (
      req.file.filename != "" &&
      req.file.filename != null &&
      req.file.filename != undefined
    ) {
      // console.log(req.file.filename);

      insertobj["Tastimonialimg"] = req.file.filename;
    }
  }

  // console.log(insertobj);

  try {
    let Tastimonial = await new TastimonialModel(insertobj);
    let TastimonialRec = await Tastimonial.save();

    rec.send({
      status: true,
      messages: "create api",
      TastimonialRec,
    });
  } catch (err) {
    // console.log(err.code);

    let error = {};

    // erroe s
    for (let key in err.errors) {
      error[key] = err.errors[key].message;

      // console.log(key, err.errors[key].message);
    }

    console.log(err.error);

    if (err.code == "11000") {
      // unoce key
      error["TastimonialName"] = "TastimonialName is exite....";
    }

    rec.send({
      status: false,
      messages: "err found ",
      error,
    });
  }
};

let Tastimonialviwe = async (req, rec) => {
 const addCondition = [
    {
      deleted_at: null,
    },
  ];

  const orCondition = [];

  if (req.query.TastimonialName != undefined && req.query.TastimonialName != "") {
    orCondition.push({ TastimonialName: new RegExp(req.query.TastimonialName, "i") });
  }

  if (req.query.Tastimonialstatus != undefined && req.query.Tastimonialstatus != "") {
    orCondition.push({ Tastimonialstatus: req.query.Tastimonialstatus });
  }

  if (addCondition.length > 0) {
    var filter = { $and: addCondition };
  } else {
    var filter = {};
  }

  if (orCondition.length > 0) {
    filter.$or = orCondition;
  }
  let date = await TastimonialModel.find(filter);

  rec.send({
    status: true,
    messages: "create api",
    path: process.env.TASSTIMONIALIMAGEPATH
,
    date,
  });
};

let Tastimonialdelete = async (req, rec) => {
  //  singal delete
  let { id } = req.params;

  let softdelRes = await TastimonialModel.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        isdeleted: true,
        deletdat: Date.now(),
      },
    }
  );

  rec.send({
    status: true,
    messages: " Tastimonial deleted",
    softdelRes,
  });
};

let multidelete = async (req, rec) => {
  let { ids } = req.body;
  //arry
  let softdelRes = await TastimonialModel.updateMany(
    {
      _id: { $in: ids },
    },
    {
      $set: {
        isdeleted: true,
        deletdat: Date.now(),
      },
    }
  );

  rec.send({
    status: true,
    messages: " Tastimonial deleted",
    softdelRes,
  });
};

let changeStatus = async (req, res) => {
  console.log(req.body);
  let { ids } = req.body;

  let updetdeta = await TastimonialModel.updateMany(
    { _id: ids },
    [
      {
        $set: {
          Tastimonialstatus: {
            $not: "$Tastimonialstatus",
          },
        },
      },
    ],
    { updatePipeline: true }
  );

  res.send({
    _status: true,
    _message: "categoroy Status Chnaged",
    updetdeta,
  });
};

let getditelds = async (req, rec) => {
  let { id } = req.params;

  let data = await TastimonialModel.findOne({ _id: id });

  console.log(data);

  rec.send({
    status: true,
    messages: " color detles",
    path: process.env.TASSTIMONIALIMAGEPATH,
    data,
  });
};

let TastimonialUpdate = async (req, res) => {
  let { id } = req.params;
  let { TastimonialName, Tastimonialimg, Order, Description,Rating,Message } = req.body;

  console.log(req.body);

  let updateObj = {
    TastimonialName,
    Tastimonialimg,
    Order,
    Description,
    Rating,
    Message
  };

  if (req.file) {
    if (
      req.file.filename != "" &&
      req.file.filename != null &&
      req.file.filename != undefined
    ) {
      updateObj["Tastimonialimg"] = req.file.filename;
    }
  }

  let updateRes = await TastimonialModel.updateOne(
    { _id: id },
    {
      $set: updateObj,
    }
  );
  res.send({
    _status: true,
    _message: "Color Updated",
    updateRes,
  });
};

module.exports = {
  Tastimonialcreate,
  Tastimonialviwe,
  Tastimonialdelete,
  multidelete,
  changeStatus,
  getditelds,
  TastimonialUpdate,
};
