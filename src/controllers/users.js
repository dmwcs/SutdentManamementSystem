//user management
//authentication, authorization

const UserModel = require('../models/User');
const {generateToken} = require("../utils/jwt");

//sign up
//POST/users
//POST/auth/register
const register = async (req, res, next) => {
    const {username, password} = req.body;
    //validation
    const user = new UserModel({username, password});
    await user.hashPassword();
    await user.save();

    //generate token
    const token = generateToken({username});
    //send token
    res.status(201).json({username, token});//不返回user的所有信息 因为是隐私

}

const login = async ( req, res, next) => {
    const {username, password} = req.body;
    const user = await UserModel.findOne({username}).exec();
    if(!user){
        res.status(401).json({error: 'Invalid credentials'});
        return;
    }

    const isValidPassword = await user.validatePassword(password);
    console.log(isValidPassword);
    if(!isValidPassword) {
        res.status(401).json({error: 'Invalid credentials'});
        return;
    }
    //generate token
    const token = generateToken({username})
    //send token
    res.json({username, token});
};

module.exports = {
    login,
    register,
}
