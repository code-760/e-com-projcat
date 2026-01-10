let mongoose = require("mongoose");
let categorySchema = mongoose.Schema({
  categoryName: {
    type: String,
    required: [true, "category name is required"],
    minlength: 2,
    maxlength:10,
    validate: {
      validator: async function (v) {
        const category = await this.constructor.findOne({ categoryName: v,deletdat:null });
        return !category;
      },
      message: (props) => `The specified category is already in use.`,
    },
  },
  categoryimg:String,
  isdeleted: {
    type: Boolean,
    default: false,
  },
  deletdat: {
    type: Date,
    default: null,
  },

  categoryOder:Number,
  categorystatus:{
    type:Boolean,
    default:true
  },
});

let categoryModel = mongoose.model("category",categorySchema);

module.exports = { categoryModel };
