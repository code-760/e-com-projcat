let mongoose = require("mongoose");
let SubsubcategorySchema = mongoose.Schema({
  SubsubcategoryName: {
    type: String,
    required: [true, "Subcategory name is required"],
    minlength: 2,
    maxlength:10,
    validate: {
      validator: async function (v) {
        const Subsubcategory = await this.constructor.findOne({ SubsubcategoryName: v,deletdat:null });
        return !Subsubcategory;
      },
      message: (props) => `The specified Subcategory is already in use.`,
    },
  },

   Category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"category"

  },
   SubCategory:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"SubCategory"

  },
  Subsubcategoryimg:String,
  isdeleted: {
    type: Boolean,
    default: false,
  },
  deletdat: {
    type: Date,
    default: null,
  },
 
  SubsubcategoryOder:Number,
  Subsubcategorystatus:{
    type:Boolean,
    default:true
  },
});

let SubsubcategoryModel = mongoose.model("Subsubcategory", SubsubcategorySchema);

module.exports = { SubsubcategoryModel };
