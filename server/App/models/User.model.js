let mongoose = require("mongoose");
let UserSchema = mongoose.Schema({
  UserName: String,
  userphone: {
    type: String,
    
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
   
  },
  userprofile: {
    type: String,   
    
  },
  userGender: {
    type: String,
    enum: ["male", "female", "other"],
    
  },
  state: {
    type: String,
   
  },
  
  city: {
    type: String,
   
  },
  country: {
    type: String,
   
  },
  pincode: {
    type: String,
    
  },
  shippingAddress: {
    type: Object,
    shippingName: String,
    shippingEmail: String,
    shippingPhone: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
    country: String
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
