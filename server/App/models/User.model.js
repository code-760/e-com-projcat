let mongoose = require("mongoose");
let UserSchema = mongoose.Schema({
  UserName: String,
  userphone: {
    type: String,
    match: [/^\d{10}$/, "Please fill a valid 10 digit phone number"],
    required: [true, "User phone number required"],
    unique: true,
  },
  useremail: {
    type: String,
    required: [true, "User email required"],
  },

  Password: {
    type: String,
    required: true,
  },
  useraddress: {
    type: String,
    default: "",
  },
  userprofile: {
    type: String,   
    default: "",
  },
  userGender: {
    type: String,
    enum: ["male", "female", "other"],
    
  },
  isdeleted: {
    type: Boolean,
    default: false,
  },
  deletdat: {
    type: Date,
    default: null,
  },

  Userstatus: {
    type: Boolean,
    default: true,
  },
});

let UserModel = mongoose.model("User", UserSchema);

module.exports = { UserModel };
