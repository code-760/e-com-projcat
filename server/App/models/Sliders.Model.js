let mongoose = require("mongoose");
let SlidersSchema = mongoose.Schema({
  Title: {
    type: String,
    required: [true, "Why Choose Us name is required"],
    minlength: 2,
    maxlength: 10,
    validate: {
      validator: async function (v) {
        const Title = await this.constructor.findOne({
          Title: v,
          deletdat: null,
        });
        return !Title;
      },
      message: (props) => `The specified Why Choose Us is already in use.`,
    },
  },
  Slidersimg: String,
  isdeleted: {
    type: Boolean,
    default: false,
  },
  deletdat: {
    type: Date,
    default: null,
  },

  Order: Number,

  Slidersstatus: {
    type: Boolean,
    default: true,
  },
});

let SlidersModel = mongoose.model("Sliders", SlidersSchema);

module.exports = { SlidersModel };
