const foodPartnerModel = require('../models/foodPartner.model')

const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')

async function authFoodPartnerMiddleWare(req, res, next) {

    const token = req.cookies.foodPartner_token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorize"
        });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SKEY);

        const foodPartner = await foodPartnerModel.findById(decode.id);

        req.foodPartner = foodPartner;

        next();
    } catch (err) {
        return res.status(401).json({
            message: "Invalid Token"
        });
    }
}


async function authUserMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Please Login First",
    });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SKEY);

    const user = await userModel.findById(decode.id);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}
module.exports ={ authFoodPartnerMiddleWare, authUserMiddleware}