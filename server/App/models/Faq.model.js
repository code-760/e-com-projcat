let mongoose = require("mongoose");
let Faqschama = mongoose.Schema({
  FaqQuestion: {
    type: String,
    required: [true, " Faq Question  is required"],
    minlength: 3,
    maxlength: 150,
    unique: true,
  },
  FaqAnswer: {
    type: String,
    required: [true, "Faq Answer is required"],
    minlength: 3,
    maxlength: 150,
    unique: true,
  },
  isdeleted: {
    type: Boolean,
    default: false,
  },
  deletdat: {
    type: Date,
    default: null,
  },
  FaqOder: Number,
  Faqstatus:{
    type:Boolean,
    default:true
  },
});

let Faqmodele = mongoose.model("Faq", Faqschama);

module.exports = { Faqmodele };
