let mongoose = require("mongoose");
let SubcategorySchema = mongoose.Schema({
  SubcategoryName: {
    type: String,
    required: [true, "Subcategory name is required"],
    minlength: 2,
    maxlength:10,
    validate: {
      validator: async function (v) {
        const Subcategory = await this.constructor.findOne({ SubcategoryName: v,deletdat:null });
        return !Subcategory;
      },
      message: (props) => `The specified Subcategory is already in use.`,
    },
  },

   Category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"category"

  },
  Subcategoryimg:String,
  isdeleted: {
    type: Boolean,
    default: false,
  },
  deletdat: {
    type: Date,
    default: null,
  },
 
  SubcategoryOder:Number,
  Subcategorystatus:{
    type:Boolean,
    default:true
  },
});

let SubcategoryModel = mongoose.model("SubCategory", SubcategorySchema);

module.exports = { SubcategoryModel };
