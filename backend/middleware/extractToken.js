const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const AsyncHandler = require('express-async-handler');

const extract = AsyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split('')[1];
            let decode = jwt.verify(token, process.env.JWT_SECRET)
            console.log(decode)
            req.user = await User.findById(decode.id)
            next()
        } catch (error) {
            res.status(401);
            throw new Error('Wrong token')
        }
    } else {
        res.status(401);
        throw new Error('No token exists')
    }

})

module.exports = extract;