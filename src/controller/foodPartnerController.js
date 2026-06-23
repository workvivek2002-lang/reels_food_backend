const foodPartnerModel = require('../models/foodPartner.model');
const foodModel = require('../models/food.model');

async function getFoodPartnerbyId(req, res) {
  try {
    const foodPartnerId = req.params.id;

    const foodPartner = await foodPartnerModel.findById(foodPartnerId);

    if (!foodPartner) {
      return res.status(404).json({ message: "Food partner not found" });
    }

    // ✅ FIXED VARIABLE NAME
    const foodItemsByFoodPartner = await foodModel.find({
      foodPartner: foodPartnerId,
    });

    return res.status(200).json({
      message: "Food partner fetch successfully",
      foodPartner: {
        ...foodPartner.toObject(),
        foodItems: foodItemsByFoodPartner,
      },
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}



module.exports = { getFoodPartnerbyId };