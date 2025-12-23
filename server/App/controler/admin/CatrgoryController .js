const { categoryModel } = require("../../models/Category.model ");

// categoryModel.syncIndexes();

let categorycreate = async (req, rec) => {
  let insertobj = { ...req.body };

  if (req.file) {
    if (
      req.file.filename != "" &&
      req.file.filename != null &&
      req.file.filename != undefined
    ) {
      insertobj["categoryimg"] = req.file.filename;
    }
    n;
  }

  console.log(insertobj);

  try {
    let category = await new categoryModel(insertobj);
    let categoryRec = await category.save();

    rec.send({
      status: true,
      messages: "create api",
      categoryRec,
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
      error["categoryName"] = "categorName is exite....";
    }

    rec.send({
      status: false,
      messages: "err found ",
      error,
    });
  }
};

let categoryviwe = async (req, rec) => {
  let filtercategory = {
    deletdat: null,
  };

  let date = await categoryModel.find(filtercategory);

  rec.send({
    status: true,
    messages: "create api",
    path: process.env.CATEGROYIMAGEPATH,
    date,
  });
};

let categorydelete = async (req, rec) => {
  //  singal delete
  let { id } = req.params;

  let softdelRes = await categoryModel.updateOne(
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
    messages: " category deleted",
    softdelRes,
  });
};

let multidelete = async (req, rec) => {
  let { ids } = req.body;
  //arry
  let softdelRes = await categoryModel.updateMany(
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
    messages: " category deleted",
    softdelRes,
  });
};

let changeStatus = async (req, res) => {
  let { ids } = req.body;

  let updetdeta = await categoryModel.updateMany(
    { _id: ids },
    [
      {
        $set: {
          categorystatus: {
            $not: "$categorystatus",
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

  let data = await categoryModel.findOne({ _id: id });

  console.log(data);

  rec.send({
    status: true,
    messages: " color detles",
    path: process.env.CATEGROYIMAGEPATH,
    data,
  });
};

let catUpdate = async (req, res) => {
  let { id } = req.params;
  let { categoryName, categoryimg, categoryOder } = req.body;

  console.log(req.body);

  let updateObj = {
    categoryName,
    categoryimg,
    categoryOder,
  };

  if (req.file) {
    if (
      req.file.filename != "" &&
      req.file.filename != null &&
      req.file.filename != undefined
    ) {
      updateObj["categoryimg"] = req.file.filename;
    }
  }

  let updateRes = await categoryModel.updateOne(
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
  categorycreate,
  categoryviwe,
  categorydelete,
  multidelete,
  changeStatus,
  catUpdate,
  getditelds,
};
