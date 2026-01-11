
// SlidersModel.syncIndexes();

const { SlidersModel } = require("../../models/Sliders.Model");

let Sliderscreate = async (req, rec) => {
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

      insertobj["Slidersimg"] = req.file.filename;
    }
  }

  // console.log(insertobj);

  try {
    let Sliders = await new SlidersModel(insertobj);
    let SlidersRec = await Sliders.save();

    rec.send({
      status: true,
      messages: "create api",
    
      SlidersRec,
    });
  } catch (err) {
    // console.log(err.code);

    let error = {};

    // erroe s
    for (let key in err.errors) {
      error[key] = err.errors[key].message;

      console.log(key, err.errors[key].message);
    }

    console.log(err.error);

    if (err.code == "11000") {
      // unoce key
      error["SlidersName"] = "categorName is exite....";
    }

    rec.send({
      status: false,
      messages: "err found ",
      error,
    });
  }
};

let Slidersviwe = async (req, rec) => {
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

  let date = await SlidersModel.find(filter);

  rec.send({
    status: true,
    messages: "create api",
    path: process.env.SLIDERIMAGEPATH,
    date,
  });
};

let Slidersdelete = async (req, rec) => {
  //  singal delete
  let { id } = req.params;

  let softdelRes = await SlidersModel.updateOne(
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
    messages: " Sliders deleted",
    softdelRes,
  });
};

let multidelete = async (req, rec) => {
  let { ids } = req.body;
  //arry
  let softdelRes = await SlidersModel.updateMany(
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
    messages: " Sliders deleted",
    softdelRes,
  });
};

let changeStatus = async (req, res) => {
  console.log(req.body);
  let { ids } = req.body;

  let updetdeta = await SlidersModel.updateMany(
    { _id: ids },
    [
      {
        $set: {
          Slidersstatus: {
            $not: "$Slidersstatus",
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

  let data = await SlidersModel.findOne({ _id: id });

  console.log(data);

  rec.send({
    status: true,
    messages: " color detles",
    path: process.env.SLIDERIMAGEPATH,
    data,
  });
};

let SlidersUpdate = async (req, res) => {
  let { id } = req.params;
  let { Title, Slidersimg, Order, } = req.body;

  console.log(req.body);

  let updateObj = {
    Title,
    Slidersimg,
    Order,
   
  };

  if (req.file) {
    if (
      req.file.filename != "" &&
      req.file.filename != null &&
      req.file.filename != undefined
    ) {
      updateObj["Slidersimg"] = req.file.filename;
    }
  }

  let updateRes = await SlidersModel.updateOne(
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
  Sliderscreate,
  Slidersviwe,
  Slidersdelete,
  multidelete,
  changeStatus,
  SlidersUpdate,
  getditelds
};
