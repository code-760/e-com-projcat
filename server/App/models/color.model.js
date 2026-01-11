let mongoose = require("mongoose");
let colorSchema = mongoose.Schema({
  colorName: {
    type: String,
    required: [true, "color name is required"],
    minlength: 2,
    maxlength:50,
    validate: {
      validator: async function (v) {
        const color = await this.constructor.findOne({ colorName: v,deletdat:null });
        return !color;
      },
      message: (props) => `The specified color is already in use.`,
    },
  },
  colorcode: {
    type: String,
    required: [true, "color code is required"],
    minlength: 2,
    maxlength: 10,
  },
  isdeleted: {
    type: Boolean,
    default: false,
  },
  deletdat: {
    type: Date,
    default: null,
  },

  colorOder:Number,
  colorstatus:{
    type:Boolean,
    default:true
  },
});

let colorModel = mongoose.model("color", colorSchema);

module.exports = { colorModel };
