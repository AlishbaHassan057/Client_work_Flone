const AsyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const registerUser = AsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    // check if user already exists
    const checkUser = await User.findOne({ m_mail })
    if (checkUser) {
        res.status(400);
        throw new Error('User already exists!');
    } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const createdUser = await User.create(
            {
                name,
                email,

                password: hashedPassword,

            }
        )

        res.json(
            {
                _id: createdUser._id,
                name,
                email,
                password,
                token: generateToken(createdUser._id)
            }
        )
    }

})

const loginUser = AsyncHandler(async (req, res) => {
    // get the data from the user
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please enter the fields')
    }
    const findUser = await User.findOne({ m_mail })
    if (!findUser) {
        res.status(404);
        throw new Error('User not found')
    }
    if (findUser && (await bcrypt.compare(password, findUser.password))) {
        res.status(200);
        res.send({
            _id: findUser._id,
            name: findUser.name,

            email: findUser.email,

            token: generateToken(findUser._id)
        })
    } else {
        res.status(401);
        throw new Error('Invalid Credentials')
    }
})



const getAllUser = AsyncHandler(async (req, res) => {
    const users = await User.find();
    res.send(users);
})
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })

}


module.exports = {
    registerUser, loginUser, getAllUser
};
