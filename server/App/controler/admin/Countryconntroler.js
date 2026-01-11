const { CountryModel } = require("../../models/contry.model");
// colorModel.syncIndexes();

let Countrycreate = async (req, rec) => {
  let { CountryName, CountryOder } = req.body;
  let insrtobj = { CountryName, CountryOder };
  try {
    let Country = await CountryModel(insrtobj);
    let CountryRec = await Country.save();

    rec.send({
      status: true,
      messages: "create api",
      CountryRec,
    });
  } catch (err) {
    console.log(err);
 
    let error = {};

    if (err.code == "11000") {
      error["CountryName"] = "This Name is already exits....";
    }

    for (let key in err.errors) {
      error[key] = err.errors[key].message;

      console.log(key, err.errors[key].message);
    }
      if (CountryName.length > 20) error.CountryName = "CountryName max 50 characters allowed";
   
    rec.send({
      status: false,
      messages: "err found ",
      error,
    });
  }
};

let Countryviwe = async (req, rec) => {
  const addCondition = [
    {
      deleted_at: null,
    },
  ];

  const orCondition = [];

  if (req.query.CountryName != undefined && req.query.CountryName != "") {
    orCondition.push({ CountryName: new RegExp(req.query.CountryName, "i") });
  }

  if (req.query.CountryOder != undefined && req.query.CountryOder != "") {
    orCondition.push({ CountryOder: req.query.CountryOder });
  }

  if (addCondition.length > 0) {
    var filter = { $and: addCondition };
  } else {
    var filter = {};
  }

  if (orCondition.length > 0) {
    filter.$or = orCondition;
  }

  let data = await CountryModel.find(filter);

  rec.send({
    status: true,
    messages: "create api",
    data,
  });
};

let Countrydelete = async (req, rec) => {
  let { id } = req.params;

  let Countrydeta = await CountryModel.updateOne(
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
    Countrydeta,
  });
};

let multidelete = async (req, rec) => {
  let { ids } = req.body;

  let Countrymultidetele = await CountryModel.updateMany(
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
    Countrymultidetele,
  });
};

let changeStatus = async (req, res) => {

  console.log(req.body);
  let {ids}=req.body

  let updetdeta=await CountryModel.updateMany(
    {_id:ids},
    [

      {
        $set:{
          Countrystatus:{
            $not:"$Countrystatus"
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

  let data = await CountryModel.findOne({_id:id});

  rec.send({
    status: true,
    messages: " color detles",
    data,
  });

}

let CountryUpdate = async (req, res) => {
  let { id } = req.params;
  let {CountryName, CountryOder} = req.body;
  let updateObj = {
    CountryName,
     CountryOder,
  };
  let updateRes = await CountryModel.updateOne(
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

module.exports = { Countrycreate, Countryviwe, Countrydelete, multidelete,changeStatus,getditelds,CountryUpdate };
