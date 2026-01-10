
// SubcategoryModel.syncIndexes();

const { categoryModel } = require("../../models/Category.model");
const { SubcategoryModel } = require("../../models/Subcategory");

let Subcategorycreate = async (req, rec) => {
  let insertobj = { ...req.body };
  

  if (req.file) {
    if (
      req.file.filename != "" &&
      req.file.filename != null &&
      req.file.filename != undefined
    ) {
      insertobj["Subcategoryimg"] = req.file.filename;
    }
  }

//   console.log(insertobj);

  try {
    let Subcategory = await new SubcategoryModel(insertobj);
    let SubcategoryRec = await Subcategory.save();

    rec.send({
      status: true,
      messages: "create api",
      SubcategoryRec,
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

let Subcategoryviwe = async (req, rec) => {
  let filterSubcategory = {
    deletdat: null,
  };

  let date = await SubcategoryModel.find(filterSubcategory).populate('Category','categoryName');
//  {poputale<-- ka kam hai ki vo pernet category ka deta dikhata hai ye un me se deta nikal kar lata hai  }

  rec.send({
    status: true,
    messages: "create api",
    path: process.env.SUBCATEGROYIMAGEPATH,
    date,
  });
};


let parnetcategroy=async (req, rec) => {
  let filterSubcategory = {
    deletdat: null,
  };

  let date = await categoryModel.find({categorystatus:true}&&filterSubcategory).select('categoryName')
// //  {poputale<-- ka kam hai ki vo pernet category ka deta dikhata hai ye un me se deta nikal kar lata hai  }

  rec.send({
    status: true,
    messages: "create api",
  
    date,
  });
};


let Subcategorydelete = async (req, rec) => {
  //  singal delete
  let { id } = req.params;

  let softdelRes = await SubcategoryModel.updateOne(
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
    messages: " Subcategory deleted",
    softdelRes,
  });
};

let multidelete = async (req, rec) => {
  let { ids } = req.body;
  //arry
  let softdelRes = await SubcategoryModel.updateMany(
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
    messages: " Subcategory deleted",
    softdelRes,
  });
};

let changeStatus = async (req, res) => {
  console.log(req.body);
  let { ids } = req.body;

  let updetdeta = await SubcategoryModel.updateMany(
    { _id: ids },
    [
      {
        $set: {
          Subcategorystatus: {
            $not: "$Subcategorystatus",
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

  let data = await SubcategoryModel.findOne({ _id: id }).populate('Category','categoryName');;

  console.log(data);

  rec.send({
    status: true,
    messages: " color detles",
    path: process.env.SUBCATEGROYIMAGEPATH,
    data,
  });
};

let SubcategoryUpdate = async (req, res) => {
  let { id } = req.params;
  let { SubcategoryName, Category, SubcategoryOder, Subcategoryimg } = req.body;

  console.log(req.body);

  let updateObj = {
   SubcategoryName, Category, SubcategoryOder, Subcategoryimg
  };

  if (req.file) {
    if (
      req.file.filename != "" &&
      req.file.filename != null &&
      req.file.filename != undefined
    ) {
      updateObj["Subcategoryimg"] = req.file.filename;
    }
  }

  let updateRes = await SubcategoryModel.updateOne(
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
  Subcategorycreate,
  Subcategoryviwe,
  Subcategorydelete,
  multidelete,
  changeStatus,
  parnetcategroy,
  getditelds,
  SubcategoryUpdate
};
