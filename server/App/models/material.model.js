let mongoose=require("mongoose")
let materialSchema=mongoose.Schema(

    {
        materialName:{
            type:String,
            required :[true,"Material name is required"],
            minlength:2,
            maxlength:70,
            unique:true   
        },
         isdeleted:{
            type:Boolean,
            default:false
        },
        deletdat:{
            type:Date,
            default:null

        },
        materialOder:Number,
        materialstatus:{
            type:Boolean,
            default:true
        }
         
    }
)

let materialModel=mongoose.model("material",materialSchema);


module.exports={materialModel}