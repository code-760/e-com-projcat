const { Faqmodele } = require("../../models/Faq.model");

let Faqcreate = async (req, rec) => {
  let { FaqQuestion, FaqAnswer, FaqOder, Faqstatus } = req.body;
  let insrtobj = { FaqQuestion, FaqAnswer, FaqOder, Faqstatus };

  try {
    let deta = await Faqmodele.insertOne(insrtobj);

    rec.send({
      status: true,
      message: "Faq create",
      deta,
    });
  } catch (err) {
    let error = {};
    if (err.errors == "11000") {
      error["FaqQuestion"] = "Question is same ";
    }
    if (FaqQuestion.length > 20)
      error.FaqQuestion = "FaqQuestion max 150 characters allowed";
    if (FaqAnswer.length > 150)
      error.FaqAnswer = "colorcode max 150 characters allowed";

    for (let key in err.errors) {
      error[key] = err.errors[key].message;
    }

    rec.send({
      status: true,
      message: "api error",
      error,
    });
  }
};

let Faqview = async (req, rec) => {
  let filtermarial = {
    deletdat: null,
  };

  let data = await Faqmodele.find(filtermarial);

  rec.send({
    status: true,
    message: "Faq viwe",
    data,
  });
};

let Faqdelete = async (req, rec) => {
  let { id } = req.params;

  let data = await Faqmodele.updateOne(
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

  let materialmultidetele = await Faqmodele.updateMany(
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
    messages: "delete Faq api",
    materialmultidetele,
  });
};

let changeStatus = async (req, res) => {
  console.log(req.body);
  let { ids } = req.body;

  let updetdeta = await Faqmodele.updateMany(
    { _id: ids },
    [
      {
        $set: {
          Faqstatus: {
            $not: "$Faqstatus",
          },
        },
      },
    ],
    { updatePipeline: true }
  );

  res.send({
    _status: true,
    _message: "Color Status Chnaged",
    updetdeta,
  });
};
let getditelds = async (req, rec) => {
  let { id } = req.params;

  let data = await Faqmodele.findOne({ _id: id });

  rec.send({
    status: true,
    messages: " color detles",
    data,
  });
};

let FaqUpdate = async (req, res) => {
  let { id } = req.params;
  let { FaqQuestion, FaqAnswer, FaqOder } = req.body;
  let updateObj = {
    FaqQuestion,
    FaqAnswer,
    FaqOder,
  };
  let updateRes = await Faqmodele.updateOne(
    { _id: id },
    {
      $set: updateObj,
    }
  );
  res.send({
    _status: true,
    _message: "faq Updated",
    updateRes,
  });
};
module.exports = { Faqview, Faqcreate, Faqdelete, multidelete, changeStatus,getditelds,FaqUpdate };
