const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const foodController = require("../controller/food.controller");
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
});

// Create Food Reel
router.post(
  "/",
  authMiddleware.authFoodPartnerMiddleWare,
  upload.single("video"),
  foodController.createFood
);

// Get All Food Reels
router.get("/", foodController.getFoodItem);

// Like / Unlike
router.post("/like", authMiddleware.authUserMiddleware, foodController.likeFoodItem);

// Save / Unsave
router.post("/save", authMiddleware.authUserMiddleware, foodController.saveFoodItem);

// ================= COMMENTS (STANDARDIZED) =================

// Add Comment (Singular Action)
router.post(
  "/comment",
  authMiddleware.authUserMiddleware,
  foodController.addComment
);

// Get Comments of a Reel (Plural List - CHANGED TO /comments/:foodId)
router.get(
  "/comments/:foodId",
  foodController.getComments
);

// Delete Comment (Singular Action)
router.delete(
  "/comment/:commentId",
  authMiddleware.authUserMiddleware,
  foodController.deleteComment
);

router.delete(
  "/:foodId",
  authMiddleware.authFoodPartnerMiddleWare,
  foodController.deleteFood
);

module.exports = router;