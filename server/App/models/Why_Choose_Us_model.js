let mongoose = require("mongoose");
let WhyChooseUsSchema = mongoose.Schema({
  Title: {
    type: String,
    required: [true, "Why Choose Us name is required"],
    minlength: 2,
    maxlength: 100,
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
  WhyChooseUsimg: String,
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
  WhyChooseUsstatus: {
    type: Boolean,
    default: true,
  },
});

let WhyChooseUsModel = mongoose.model("WhyChooseUs", WhyChooseUsSchema);

module.exports = { WhyChooseUsModel };
