const { colorModel } = require("../../models/color.model");

// colorModel.syncIndexes();

let colorcreate = async (req, rec) => {
  let { colorName, colorcode, colorOder, colorstatus } = req.body;
  let insrtobj = {
    colorName,
    colorcode,
    colorOder,
    colorstatus,
  };

  try {
    let color = await new colorModel(insrtobj);
    let colorRec = await color.save();

    rec.send({
      status: true,
      messages: "create api",
      colorRec,
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
      error["colorcode"] = "colorcode is exite....";
    }

    if (colorName.length > 20)
      error.colorName = "colorName max 50 characters allowed";
    if (colorcode.length > 10)
      error.colorcode = "colorcode max 20 characters allowed";

    rec.send({
      status: false,
      messages: "err found ",
      error,
    });
  }
};

let colorviwe = async (req, rec) => {
  const addCondition = [
    {
      deleted_at: null,
    },
  ];

  const orCondition = [];

  if (req.query.colorName != undefined && req.query.colorName != "") {
    orCondition.push({ colorName: new RegExp(req.query.colorName, "i") });
  }

  if (req.query.colorOder != undefined && req.query.colorOder != "") {
    orCondition.push({ colorOder: req.query.colorOder });
  }

  if (addCondition.length > 0) {
    var filter = { $and: addCondition };
  } else {
    var filter = {};
  }

  if (orCondition.length > 0) {
    filter.$or = orCondition;
  }
  let date = await colorModel.find(filter);

  rec.send({
    status: true,
    messages: "create api",
    date,
  });
};

let colordelete = async (req, rec) => {
  //  singal delete
  let { id } = req.params;

  let softdelRes = await colorModel.updateOne(
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
    messages: " color deleted",
    softdelRes,
  });
};

let multidelete = async (req, rec) => {
  let { ids } = req.body;
  //arry
  let softdelRes = await colorModel.updateMany(
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
    messages: " color deleted",
    softdelRes,
  });
};

let changeStatus = async (req, res) => {

  console.log(req.body);
  let {ids}=req.body

  let updetdeta=await colorModel.updateMany(
    {_id:ids},
    [

      {
        $set:{
          colorstatus:{
            $not:"$colorstatus"
          }
        }
      }
    ],
    { updatePipeline: true }


  )
 
  res.send({
    _status: true,
    _message: "Color Status Chnaged",
    updetdeta
   
  });
};


let getditelds= async(req,rec)=>{

  let {id}=req.params

  let data = await colorModel.findOne({_id:id});

  rec.send({
    status: true,
    messages: " color detles",
    data,
  });

}

let colorUpdate = async (req, res) => {
  let { id } = req.params;
  let { colorName, colorCode, colorOder } = req.body;
  let updateObj = {
    colorName,
    colorCode,
    colorOder,
  };
  let updateRes = await colorModel.updateOne(
    { _id: id },
    {
      $set:updateObj
    }
  );
  res.send({
    _status: true,
    _message: "Color Updated",
    updateRes,
  });
};






module.exports = {
  colorcreate,
  colorviwe,
  colordelete,
  multidelete,
  changeStatus,
  getditelds,
  colorUpdate
};
