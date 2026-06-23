const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Food name is required"]
    },
    video:{
        type:String,
        require:[true,"Food video is required"]
    },
    description:{
        type:String,
        require:[true,"Description is required"]
    },
    foodPartner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"foodPartner"
    },
    likeCount:{
        type:Number,
        default:0
    },
    commentCount: {
  type: Number,
  default: 0,
},
})

const foodModel = mongoose.model("food",foodSchema)

module.exports = foodModel