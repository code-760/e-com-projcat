let mongoose = require("mongoose");
let AdminSchema = mongoose.Schema({
  AdminName: String,
  Adminphone: {
    type: String,
    
  },
  Adminemail: {
    type: String,
    required: [true, "Admin email required"],
  },

  Password: {
    type: String,
    required: true,
  },
  Adminaddress: {
    type: String,
   
  },
  Adminprofile: {
    type: String,   
    
  },
  AdminGender: {
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
  shippingcharges: {
    
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

let AdminModel = mongoose.model("Admin", AdminSchema);

module.exports = { AdminModel };
