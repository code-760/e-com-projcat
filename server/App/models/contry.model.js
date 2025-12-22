let mongoose = require("mongoose");
let CountrySchema = mongoose.Schema({
  CountryName: {
    type: String,
    required: [true, "color name is required"],
    minlength: 2,
    maxlength: 5,
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

  CountryOder: Number,
  Countrystatus: {
    type:Boolean,
    default:true
  },
});

let CountryModel = mongoose.model("Country", CountrySchema);

module.exports = { CountryModel };
