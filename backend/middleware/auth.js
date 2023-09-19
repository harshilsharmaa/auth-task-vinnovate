const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.isAuthenticated = async (req, res, next) => {
    try {
        const {token} = req.cookies;
        if(!token){
            return res.status(401).json({
                error: 'Please Login First',
                success: false
            })
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);
        if(!user){
            return res.status(401).json({
                error: 'Please Login First',
                success: false
            })
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({
            error: error.message,
            success: false
        })
    }
}