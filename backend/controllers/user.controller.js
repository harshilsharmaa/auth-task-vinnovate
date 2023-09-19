const User = require('../models/User');

exports.register = async(req, res) => {
    try {

        if(!req.body.name || !req.body.email || !req.body.password){
            return res.status(400).json({
                error: 'Please fill all the fields',
                success: false
            })
        }

        const userData = {
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        };

        const checkUserEmail = await User.findOne({email:userData.email});

        if(checkUserEmail){
            return res.status(400).json({
                error: 'User with this email already exists',
                success: false
            })
        }

        const user = await User.create(userData);

        const token = user.generateAuthToken();

        res.cookie('token', token, {httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7})
        .status(201).json({
            message: 'User created successfully',
            user: user,
            success: true
        })

        
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

exports.login = async(req, res) => {
    try {

        if(!req.body.email || !req.body.password){
            return res.status(400).json({
                error: 'Please fill all the fields',
                success: false
            })
        }

        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                error: 'User with this email does not exist',
                success: false
            })
        }

        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(400).json({
                error: 'Invalid password',
                success: false
            })
        }

        const token = user.generateAuthToken();

        res.cookie('token', token, {httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7})
        .status(200).json({
            message: 'User loggedIn successfully',
            user: user,
            success: true
        })


    }
    catch (error) {
        res.status(500).json({
            error: error.message,
            success: false
        })
    }
}

exports.deleteProfile = async(req,res)=>{
    try {

        const {email} = req.body;

        const user = await User.deleteOne({email})
        
        res.status(200).json({
            message: "User Deleted",
            success: true
        })
        
    } catch (error) {
        res.status(500).json({
            error: error.message,
            success: false
        }) 
    }
}