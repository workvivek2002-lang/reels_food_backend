const express = require('express');
const authMiddeleware = require('../middleware/auth.middleware')
const foodPartnerController = require('../controller/foodPartnerController')
const foodController = require('../controller/food.controller')

const router = express.Router()

router.get('/:id', foodPartnerController.getFoodPartnerbyId)



module.exports = router