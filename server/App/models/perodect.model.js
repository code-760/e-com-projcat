let mongoose = require("mongoose");
let ProductSchema = mongoose.Schema({
  ProductName: {
    type: String,
    required: [true, "Subcategory name is required"],
    minlength: 2,
    maxlength: 10,
    validate: {
      validator: async function (v) {
        const Product = await this.constructor.findOne({
          ProductName: v,
          deletdat: null,
        });
        return !Product;
      },
      message: (props) => `The specified Subcategory is already in use.`,
    },
  },

  Category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  SubCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
  },
  SubsubCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subsubcategory",
  },
  color: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "color",
    },
  ],
  material: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "material",
    },
  ],
  ProductType: {
    type: String,
    enum: ["1", "2", "3"],
  },

  BestSelling: Boolean,
  TopRated: Boolean,
  Upsell: Boolean,
  ActualPrice: Number,
  SalePrice: Number,
 Description: String,
  ProductImage: String,
  BackImage: String,
  GalleryImage: Array,
  Order: Number,
  TotalInStocks: Number,
  Productstatus: {
    type: Boolean,
    default: true,
  },

  isdeleted: {
    type: Boolean,
    default: false,
  },
  deletdat: {
    type: Date,
    default: null,
  },
});

let ProductModel = mongoose.model("Product", ProductSchema);

module.exports = { ProductModel };
