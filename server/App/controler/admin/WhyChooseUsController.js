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

      console.log(key, err.errors[key].message);
    }

    console.log(err.error);

    if (err.code == "11000") {
      // unoce key
      error["WhyChooseUsName"] = "categorName is exite....";
    }

    rec.send({
      status: false,
      messages: "err found ",
      error,
    });
  }
};

let WhyChooseUsviwe = async (req, rec) => {
  let filterWhyChooseUs = {
    deletdat: null,
  };

  let date = await WhyChooseUsModel.find(filterWhyChooseUs);

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

module.exports = {
  WhyChooseUscreate,
  WhyChooseUsviwe,
  WhyChooseUsdelete,
  multidelete,
  changeStatus,
};
