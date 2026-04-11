let mongoose = require("mongoose");
let AdminSchema = mongoose.Schema({
  AdminName: String,
  Adminphone: {
    type: String,
    
  },
   Adminemail: {
    type: String,
    required: [true, "Admin email required"]
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
  country: {
    type: String,
   
  },
  Bio:{
    type: String,
   
  },

  shippingcharges: {
    type: Number,
    default: 0
    
  },
  isdeleted: {
    type: Boolean,
    default: false,
  },
  deletdat: {
    type: Date,
    default: null,
  },

  adminstatus: {
    type: Boolean,
    default: true,
  },
});

let AdminModel = mongoose.model("Admin", AdminSchema);

module.exports = { AdminModel };
