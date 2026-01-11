const { WhyChooseUsModel } = require("../../models/Why_Choose_Us_model");

// WhyChooseUsModel.syncIndexes();

let WhyChooseUscreate = async (req, rec) => {
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

      insertobj["WhyChooseUsimg"] = req.file.filename;
    }
  }

  // console.log(insertobj);

  try {
    let WhyChooseUs = await new WhyChooseUsModel(insertobj);
    let WhyChooseUsRec = await WhyChooseUs.save();

    rec.send({
      status: true,
      messages: "create api",
      WhyChooseUsRec,
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
      error["WhyChooseUsName"] = "WhyChooseUsName is exite....";
    }

    rec.send({
      status: false,
      messages: "err found ",
      error,
    });
  }
};

let WhyChooseUsviwe = async (req, rec) => {
  const addCondition = [
    {
      deleted_at: null,
    },
  ];

  const orCondition = [];

  if (req.query.Title != undefined && req.query.Title != "") {
    orCondition.push({ Title: new RegExp(req.query.Title, "i") });
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
  let date = await WhyChooseUsModel.find(filter);

  rec.send({
    status: true,
    messages: "create api",
    path: process.env.WHYCHOOSEUSIMAGEPATH,
    date,
  });
};

let WhyChooseUsdelete = async (req, rec) => {
  //  singal delete
  let { id } = req.params;

  let softdelRes = await WhyChooseUsModel.updateOne(
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
    messages: " WhyChooseUs deleted",
    softdelRes,
  });
};

let multidelete = async (req, rec) => {
  let { ids } = req.body;
  //arry
  let softdelRes = await WhyChooseUsModel.updateMany(
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
    messages: " WhyChooseUs deleted",
    softdelRes,
  });
};

let changeStatus = async (req, res) => {
  console.log(req.body);
  let { ids } = req.body;

  let updetdeta = await WhyChooseUsModel.updateMany(
    { _id: ids },
    [
      {
        $set: {
          WhyChooseUsstatus: {
            $not: "$WhyChooseUsstatus",
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

  let data = await WhyChooseUsModel.findOne({ _id: id });

  console.log(data);

  rec.send({
    status: true,
    messages: " color detles",
    path: process.env.WHYCHOOSEUSIMAGEPATH,
    data,
  });
};

let WhyChooseUsUpdate = async (req, res) => {
  let { id } = req.params;
  let { Title, WhyChooseUsimg, Order, Description } = req.body;

  console.log(req.body);

  let updateObj = {
    Title,
    WhyChooseUsimg,
    Order,
    Description,
  };

  if (req.file) {
    if (
      req.file.filename != "" &&
      req.file.filename != null &&
      req.file.filename != undefined
    ) {
      updateObj["WhyChooseUsimg"] = req.file.filename;
    }
  }

  let updateRes = await WhyChooseUsModel.updateOne(
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
  WhyChooseUscreate,
  WhyChooseUsviwe,
  WhyChooseUsdelete,
  multidelete,
  changeStatus,
  getditelds,
  WhyChooseUsUpdate,
};
