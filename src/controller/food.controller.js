const foodModel = require('../models/food.model')
const likeModel = require('../models/like.model')
const saveModel = require('../models/save.model')
const commentModel = require("../models/comment.model");
const storageServices = require('../services/storage.services')
const{v4: uuid} = require('uuid')

async function createFood(req,res) {
   

    const fileUploadResult = await storageServices.uploadFile(req.file.buffer.toString("base64"), uuid())
    

    const foodItem = await foodModel.create({
        name:req.body.name,
        description:req.body.description,
        video:fileUploadResult.url,
        foodPartner:req.foodPartner._id
    })

    return res.status(200).json({message:"food video created successfuly",
        foodItem
    })

    return res.send("food item save")
    
    
}


async function getFoodItem(req,res) {
    
    const foodItem = await foodModel.find({})

    res.status(200).json({message:"Food item fetch successfuly",
        foodItem
    })

    
    
}

async function likeFoodItem(req,res) {
    try {
        const { foodId } = req.body
        const user = req.user

        if (!user) {
            return res.status(401).json({message:"Unauthorized"})
        }

        const isLikeAlready = await likeModel.findOne({
            userId: user._id,
            foodId: foodId
        })

        if (isLikeAlready) {
            await likeModel.deleteOne({
                userId: user._id,
                foodId: foodId
            })

            await foodModel.findByIdAndUpdate(foodId, {
                $inc: { likeCount: -1 }
            })

            return res.status(200).json({message: "Food unlike successfuly"})
        }

        await likeModel.create({
            userId: user._id,
            foodId: foodId
        })

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { likeCount: 1 }
        })

        return res.status(200).json({message: "Food like successfuly"})

    } catch (err) {
        console.log("LIKE ERROR:", err)
        res.status(500).json({message:"Server error"})
    }
}



async function saveFoodItem(req,res) {
    try {
        const {foodId} = req.body
        const user = req.user

        if (!user) {
            return res.status(401).json({message:"Unauthorized"})
        }

        const isAlreadySaved = await saveModel.findOne({
            userId: user._id,
            foodId: foodId
        })

        if (isAlreadySaved) {
            await saveModel.deleteOne({
                userId: user._id,
                foodId: foodId
            })

            // 🔥 DECREASE COUNT
            await foodModel.findByIdAndUpdate(foodId, {
                $inc: { saveCount: -1 }
            })

            return res.status(200).json({
                message: "Food unsaved successfully"
            })
        }

        await saveModel.create({
            userId: user._id,
            foodId: foodId
        })

        // 🔥 INCREASE COUNT
        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { saveCount: 1 }
        })

        return res.status(200).json({
            message: "Food saved successfully"
        })

    } catch (err) {
        console.log("SAVE ERROR:", err)
        res.status(500).json({message:"Server error"})
    }
}

async function addComment(req, res) {
  try {
    const { foodId, comment } = req.body;
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const newComment = await commentModel.create({
      userId: user._id,
      foodId,
      comment,
    });

    // Recalculate actual comment count
    const totalComments = await commentModel.countDocuments({
      foodId,
    });

    await foodModel.findByIdAndUpdate(foodId, {
      commentCount: totalComments,
    });

    res.status(200).json({
      message: "Comment added successfully",
      comment: newComment,
      commentCount: totalComments,
    });
  } catch (err) {
    console.log("ADD COMMENT ERROR:", err);

    res.status(500).json({
      message: "Server error",
    });
  }
}

async function getComments(req, res) {
  try {
    const { foodId } = req.params;

    // console.log("FoodId:", foodId);

    const comments = await commentModel
      .find({ foodId })
      .populate("userId", "fullName")
      .sort({ createdAt: -1 });

    res.status(200).json({ comments });

  } catch (err) {
    console.log("GET COMMENTS ERROR:", err);

    res.status(500).json({
      message: err.message
    });
  }
}
 
async function deleteComment(req, res) {
  try {
    const { commentId } = req.params;
    const user = req.user;

    const comment = await commentModel.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    if (comment.userId.toString() !== user._id.toString()) {
      return res.status(403).json({
        message: "Not allowed",
      });
    }

    await commentModel.findByIdAndDelete(commentId);

    // Recalculate actual comment count
    const totalComments = await commentModel.countDocuments({
      foodId: comment.foodId,
    });

    await foodModel.findByIdAndUpdate(comment.foodId, {
      commentCount: totalComments,
    });

    res.status(200).json({
      message: "Comment deleted",
      commentCount: totalComments,
    });
  } catch (err) {
    console.log("DELETE COMMENT ERROR:", err);

    res.status(500).json({
      message: "Server error",
    });
  }
}


async function deleteFood(req, res) {
  try {
    const { foodId } = req.params;

    const food = await foodModel.findById(foodId);

    if (!food) {
      return res.status(404).json({
        message: "Food not found",
      });
    }

    // Check owner
    if (food.foodPartner.toString() !== req.foodPartner._id.toString()) {
      return res.status(403).json({
        message: "You can only delete your own food videos",
      });
    }

    // Delete related likes
    await likeModel.deleteMany({
      foodId,
    });

    // Delete related saves
    await saveModel.deleteMany({
      foodId,
    });

    // Delete related comments
    await commentModel.deleteMany({
      foodId,
    });

    // Delete food video
    await foodModel.findByIdAndDelete(foodId);

    res.status(200).json({
      message: "Food deleted successfully",
    });
  } catch (err) {
    console.log("DELETE FOOD ERROR:", err);

    res.status(500).json({
      message: "Server error",
    });
  }
}

module.exports = {
  createFood,
  getFoodItem,
  likeFoodItem,
  saveFoodItem,
  addComment,
  getComments,
  deleteComment,
  deleteFood
};