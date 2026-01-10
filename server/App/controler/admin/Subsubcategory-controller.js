// SubcategoryModel.syncIndexes();

const { categoryModel } = require("../../models/Category.model");
const { SubcategoryModel } = require("../../models/Subcategory");
const { SubsubcategoryModel } = require("../../models/Subsubcategory");

let Subsubcategorycreate = async (req, rec) => {
  let insertobj = { ...req.body };

  if (req.file) {
    if (
      req.file.filename != "" &&
      req.file.filename != null &&
      req.file.filename != undefined
    ) {
      insertobj["Subsubcategoryimg"] = req.file.filename;
    }
  }

  //   console.log(insertobj);

  try {
    let Subsubcategory = await new SubsubcategoryModel(insertobj);
    let SubsubcategoryRec = await Subsubcategory.save();

    rec.send({
      status: true,
      messages: "create api",
      SubsubcategoryRec,
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
      error["SubcategoryName"] = "categorName is exite....";
    }

    rec.send({
      status: false,
      messages: "err found ",
      error,
    });
  }
};

let Subsubcategoryviwe = async (req, rec) => {
  let filterSubsubcategory = {
    deletdat: null,
  };

  let date = await SubsubcategoryModel.find(filterSubsubcategory)
    .populate("Category", "categoryName")
    .populate("SubCategory", "SubcategoryName");
  //  {poputale<-- ka kam hai ki vo pernet category ka deta dikhata hai ye un me se deta nikal kar lata hai  }

  rec.send({
    status: true,
    messages: "create api",
    path: process.env.SUBSUBCATEGROYIMAGEPATH,
    date,
  });
};

let parnetcategroy = async (req, rec) => {
  // let filterSubcategory = {
  //  ,
  // };

  let date = await categoryModel
    .find({ categorystatus: true, deletdat: null })
    .select("categoryName");
  // //  {poputale<-- ka kam hai ki vo pernet category ka deta dikhata hai ye un me se deta nikal kar lata hai  }

  rec.send({
    status: true,
    messages: "create api",

    date,
  });
};
let subcategroy = async (req, rec) => {
  let { parnetid } = req.params;
  // let filterSubcategory = {
  //   deletdat: null,
  // };

  let date = await SubcategoryModel.find({
    Subcategorystatus: true,
    Category: parnetid,
    deletdat: null,
  }).select("SubcategoryName");
  // //  {poputale<-- ka kam hai ki vo pernet category ka deta dikhata hai ye un me se deta nikal kar lata hai  }

  rec.send({
    status: true,
    messages: "subcatgroy aad api",
    date,
  });
};

let Subsubcategorydelete = async (req, rec) => {
  //  singal delete
  let { id } = req.params;

  let softdelRes = await SubsubcategoryModel.updateOne(
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
    messages: " Subsubcategory deleted",
    softdelRes,
  });
};

let multidelete = async (req, rec) => {
  let { ids } = req.body;
  //arry
  let softdelRes = await SubsubcategoryModel.updateMany(
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
    messages: " Subsubcategory deleted",
    softdelRes,
  });
};

let changeStatus = async (req, res) => {
  console.log(req.body);
  let { ids } = req.body;

  let updetdeta = await SubsubcategoryModel.updateMany(
    { _id: ids },
    [
      {
        $set: {
          Subsubcategorystatus: {
            $not: "$Subsubcategorystatus",
          },
        },
      },
    ],
    { updatePipeline: true }
  );

  res.send({
    _status: true,
    _message: "subsubcategoroy Status Chnaged",
    updetdeta,
  });
};
let getditelds = async (req, rec) => {
  let { id } = req.params;

  let data = await SubsubcategoryModel.findOne({ _id: id })
    .populate("Category", "categoryName")
    .populate("SubCategory", "SubcategoryName");

  rec.send({
    status: true,
    messages: " Subsubcategory detles",
    path: process.env.SUBSUBCATEGROYIMAGEPATH,
    data,
  });
};

let SubsubcategoryUpdate = async (req, res) => {
  let { id } = req.params;
  let {
    SubsubcategoryName,
    SubCategory,
    Category,
    SubsubcategoryOder,
    Subsubcategoryimg,
  } = req.body;

  console.log(req.body);

  let updateObj = {
    SubsubcategoryName,
    SubCategory,
    Category,
    SubsubcategoryOder,
    Subsubcategoryimg,
  };

  if (req.file) {
    if (
      req.file.filename != "" &&
      req.file.filename != null &&
      req.file.filename != undefined
    ) {
      updateObj["Subsubcategoryimg"] = req.file.filename;
    }
  }

  let updateRes = await SubsubcategoryModel.updateOne(
    { _id: id },
    {
      $set: updateObj,
    }
  );
  res.send({
    _status: true,
    _message: "subsubcatgroy Updated",
    updateRes,
  });
};

module.exports = {
  Subsubcategorycreate,
  Subsubcategoryviwe,
  subcategroy,
  Subsubcategorydelete,
  multidelete,
  changeStatus,
  parnetcategroy,
  getditelds,
  SubsubcategoryUpdate,
};
