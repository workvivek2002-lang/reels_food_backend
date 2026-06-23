const express = require('express')
const authController = require('../controller/auth.controller')

const router = express.Router()


//User Auth
router.post('/user/register',authController.registerUser)

router.post('/user/login',authController.logIn)

router.get('/user/logout',authController.logOut)

//FoodPartner Auth

router.post('/food-partner/register',authController.registerFoodPartner)

router.post('/food-partner/login',authController.loginFoodPartner)

router.get('/food-partner/logout',authController.loggedOutFoodPartner)




module.exports= router