const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    foodId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"food",
        required:true
    }
},
{
    timestamps:true
})

const likeModel = mongoose.model("like",likeSchema)

module.exports = likeModel