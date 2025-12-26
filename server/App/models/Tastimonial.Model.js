let mongoose = require("mongoose");
let TastimonialSchema = mongoose.Schema({
  TastimonialName: {
    type: String,
    required: [true, "Why Choose Us name is required"],
    minlength: 2,
    maxlength: 100,
    validate: {
      validator: async function (v) {
        const TastimonialName = await this.constructor.findOne({
          TastimonialName: v,
          deletdat: null,
        });
        return !TastimonialName;
      },
      message: (props) => `The specified TastimonialName is already in use.`,
    },
  },
 Tastimonialimg: String,
  isdeleted: {
    type: Boolean,
    default: false,
  },
  deletdat: {
    type: Date,
    default: null,
  },

  Order: Number,
  Description: String,
  Rating: String,
  Message: String,
  Tastimonialstatus: {
    type: Boolean,
    default: true,
  },
});

let TastimonialModel = mongoose.model("Tastimonial", TastimonialSchema);

module.exports = { TastimonialModel };
