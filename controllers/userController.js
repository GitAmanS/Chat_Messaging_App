const User = require('../models/user');



const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;



exports.userSignUp = async (request, response, next) => {
    try {
        const { name, email, phoneNumber, imageUrl, password } = request.body;

        let userExist = await User.findOne({
            where: {
                [Op.or]: [{ email }, { phoneNumber }]
            }
        });
        if (!userExist) {
            const hash = await bcrypt.hash(password, 10);
            const user = await User.create({ name, email, phoneNumber, imageUrl, password: hash });
            const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '12h' });
            response.cookie('token', token, { maxAge: 3600000 });
            return response.status(201).json({ message: "user Account created successfully" });
        } else {
            return response.status(409).json({ message: 'Email or Phone Number already exist!' })
        }


    } catch (error) {
        console.log(error);
    }
}
exports.userSignIn = async (request, response, next) => {
    try {
        const { email, password } = request.body;
        let userExist = await User.findOne({ where: { email } })
        if (userExist) {
            const isPasswordValid = await bcrypt.compare(password, userExist.password);
            if (isPasswordValid) {
                const token = jwt.sign({ userId: userExist.id }, secretKey, { expiresIn: '1h' });
                response.cookie('token', token, { maxAge: 3600000 });
                return response.status(201).json({ message: "Username and password correct" })
            } else {
                return response.status(401).json({ message: 'Invalid Password!' })
            }
        } else {
            return response.status(409).json({ message: 'Account is not exist!' })
        }


    } catch (error) {
        console.log(error);
    }
}


exports.getCurrentUser = async (request, response, next) => {
    const user = request.user;
    response.json({ userId: user.id ,user});
}
exports.getAllUser = async (request, response, next) => {
    try {
        const user = request.user;
        const users = await User.findAll({
            attributes: ['id', 'name', 'imageUrl'],
            where: {
                id: {
                    [Op.not]: user.id
                }
            }
        });
        return response.status(200).json({ users, message: "All users succesfully fetched" })

    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: 'Internal Server error!' })
    }
}






