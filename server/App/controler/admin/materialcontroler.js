const { materialModel } = require("../../models/material.model");

// colorModel.syncIndexes();

let materialcreate = async (req, rec) => {
  let { materialName, materialOder } = req.body;
  let insrtobj = { materialName, materialOder };
  try {
    let material = await materialModel(insrtobj);
    let data = await material.save();

    rec.send({
      status: true,
      messages: "create api",
      data,
    });
  } catch (err) {
    console.log(err);

    let error = {};

    if (err.code == "11000") {
      error["materialName"] = "This Name is already exits....";
    }
    if (materialName.length > 150) error.materialName = "materialName max 50 characters allowed";
    

    for (let key in err.errors) {
      error[key] = err.errors[key].message;

      console.log(key, err.errors[key].message);
    }

    rec.send({
      status: false,
      messages: "err found ",
      error,
    });
  }
};

let materialviwe = async (req, rec) => {
  const addCondition = [
    {
      deleted_at: null,
    },
  ];

  const orCondition = [];

  if (req.query.materialName != undefined && req.query.materialName != "") {
    orCondition.push({ materialName: new RegExp(req.query.materialName, "i") });
  }

  if (req.query.materialOder != undefined && req.query.materialOder != "") {
    orCondition.push({ materialOder: req.query.materialOder });
  }

  if (addCondition.length > 0) {
    var filter = { $and: addCondition };
  } else {
    var filter = {};
  }

  if (orCondition.length > 0) {
    filter.$or = orCondition;
  }

  let data = await materialModel.find(filter);

  rec.send({
    status: true,
    messages: "create api",
    data,
  });
};

let materialdelete = async (req, rec) => {
  let { id } = req.params;

  let data = await materialModel.updateOne(
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
    messages: "delete matrial api",
    data,
  });
};

let multidelete = async (req, rec) => {
  let { ids } = req.body;

  let materialmultidetele = await materialModel.updateMany(
    {
      _id: ids,
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
    messages: "delete matrial api",
    materialmultidetele,
  });
};

let changeStatus = async (req, res) => {

  console.log(req.body);
  let {ids}=req.body

  let updetdeta=await materialModel.updateMany(
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

  let data = await materialModel.findOne({_id:id});

  rec.send({
    status: true,
    messages: " color detles",
    data,
  });

}

let materialUpdate = async (req, res) => {
  let { id } = req.params;
  let {materialName, materialOder} = req.body;
  let updateObj = {
    materialName,
     materialOder,
  };
  let updateRes = await materialModel.updateOne(
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

module.exports = { materialcreate, materialviwe, materialdelete, multidelete ,changeStatus,getditelds,materialUpdate };
