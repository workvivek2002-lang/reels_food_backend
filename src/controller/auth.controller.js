// USER MODEL IMPORT 
const userModel = require('../models/user.model')
// FOOD PARTNER MODEL IMPORT 
const foodPartnerModel = require('../models/foodPartner.model')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// USER AUTHENTICATION CODE   
async function registerUser(req, res) {
    const { fullName, email, password } = req.body

    const isAllreadyUser = await userModel.findOne({
        email
    })

    if (isAllreadyUser) {
        return res.status(400).json({ message: "User Already exist" })
    }

    const hassPass = await bcrypt.hash(password, 10)
    const user = await userModel.create({
        fullName,
        email,
        password: hassPass,

    })

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SKEY)

    res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000
});

    res.status(201).json({
        message: "User register successfuly...",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    }
    )

}


async function logIn(req, res) {

    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(400).json({ message: "email not register" })
    }

    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
        return res.status(400).json({ message: "invalid user name or password" })
    }

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SKEY)

    res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000
});

    res.status(200).json({
        message: "User login successfuly...",
        user: {
            id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })

}

async function logOut(req, res) {
    res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
});
    res.status(200).json({ message: "User loggedOut successfuly" })
}



// FOODPARTNER AUTHENTICATION CODE 

async function registerFoodPartner(req, res) {
    const { name, email, password, phone, address, contactName } = req.body

    const isAccountAllreadyExists = await foodPartnerModel.findOne({ email })

    if (isAccountAllreadyExists) {
        return res.status(400).json({ message: "Food Partner already exist" })
    }

    //Making Hass password
    const hashedPassword = await bcrypt.hash(password, 10)

    const foodPartner = await foodPartnerModel.create({
        name,
        email,
        password: hashedPassword,
        phone,
        address,
        contactName
    })

    const token = jwt.sign({
        id: foodPartner._id,
    }, process.env.JWT_SKEY)

    res.cookie("foodPartner_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000
});

    res.status(200).json({
        message: "Food partner registered successfully",
        foodPartner
    });

}


// LOGIN PAGE 

async function loginFoodPartner(req, res) {
    const { email, password } = req.body

    const foodPartner = await foodPartnerModel.findOne({ email })

    if (!foodPartner) {
       return res.status(400).json({ message: "Invalid email and password" })
    }

    const isPasswordValid = await bcrypt.compare(password, foodPartner.password)

    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email and password" })
    }

    const token = jwt.sign({
        id: foodPartner._id,
    }, process.env.JWT_SKEY)

    res.cookie("foodPartner_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000
});

    res.status(200).json({
        message: "Food partner loggedin successfuly",
        foodPartner: {
            _id: foodPartner._id,
            email: foodPartner.email,
            name: foodPartner.name,
            address: foodPartner.address,
            phone: foodPartner.phone,
            contactName: foodPartner.contactName
        }
    }

    )

}





// LOGED OUT 
function loggedOutFoodPartner(req, res) {
    res.clearCookie("foodPartner_token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
});
    res.status(200).json({ message: "Food partner logged out successfuly" })
}








module.exports = { registerUser, logIn, logOut, registerFoodPartner, loginFoodPartner, loggedOutFoodPartner }




