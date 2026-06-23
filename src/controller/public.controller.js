const foodPartnerModel = require("../models/foodPartner.model");
const foodModel = require("../models/food.model");

async function getPublicProfile(req, res) {
  try {
    const { id } = req.params;

    const foodPartner = await foodPartnerModel
      .findById(id)
      .select("-password");

    if (!foodPartner) {
      return res.status(404).json({
        message: "Food Partner not found",
      });
    }

    const reels = await foodModel.find({
      foodPartner: id,
    });

    res.status(200).json({
      foodPartner,
      reels,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
}

module.exports = {
  getPublicProfile,
};