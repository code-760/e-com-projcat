let mongoose=require("mongoose")
let materialSchema=mongoose.Schema(

    {
        materialName:{
            type:String,
            match:[/^[a-zA-Z]{2,10}$/,"plesse file (a-z) (A-Z)"],
            required :[true,"color name is required"],
            minlength:2,
            maxlength:20,
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

let materialModel=mongoose.model("/material",materialSchema);


module.exports={materialModel}