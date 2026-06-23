const mongoose = require('mongoose')

const foodPartnerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    contactName:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    }
},
{
    timestamps:true
})


const foodPartnerModel = mongoose.model("foodPartner",foodPartnerSchema)

module.exports=foodPartnerModel