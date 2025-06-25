// to register
//  to login
//  to logout
import Joi from 'joi'
import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const SECRET_KEY = 'tejas';
const isProduction = process.env.NODE_ENV === 'production';


const SignupSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(2).required()
})
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(2).required()
})

const generateToken = (getId) => {
    return jwt.sign({ getId }, SECRET_KEY, {
        expiresIn: 3 * 24 * 60 * 60
    });
}

const SignupUser = async (req, res, next) => {
    const { name, email, password } = req.body;
    const { error } = SignupSchema.validate({
        name,
        email,
        password
    });
    if (error) {
        return res.status(400).json({
            success:false,
            message: error.details[0].message // here error message
        })
    }

    try {
        const isUserAlreadyExist = await User.findOne({ email });
        if (isUserAlreadyExist) {
            return res.status(400).json({
                success:false,
                message: 'User Email Already Exist'
            });
        } else {
            const hashPassword = await bcrypt.hash(password, 12);
            const NewUser = await User.create({
                name,
                email,
                password: hashPassword
            });
            if (NewUser) {
                const token = generateToken(NewUser?._id);
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: isProduction,
                    sameSite: isProduction ? 'None' : 'Lax',
                    maxAge: 1000 * 60 * 60 * 24
                });
                res.status(200).json({
                    success: true,
                    message: 'User Signup Successfull',
                    userData: {
                        _id: NewUser._id,
                        name: NewUser.name,
                        email: NewUser.email
                    }
                });

                next();
            }
        }

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Something Went Wrong !! Try Again !!"
        })
    }
}

const loginUser = async (req, res, next) => {
    const { email, password } = await req.body;
    const { error } = loginSchema.validate({
        email,
        password
    });
    if (error) {
        return res.status(400).json({
            success:false,
            message: `Wrong Credentials ${error.details[0].message}`
        })
    }
    try {
        const getUser = await User.findOne({ email });
        if (!getUser) {
            return res.status(400).json({
                success:false,
                message: `Email Doesn't Exist !! Please Signup !!`
            })
        }
        const checkPassword = await bcrypt.compare(password, getUser.password);
        if (!checkPassword) {
            return res.status(400).json({
                success:false,
                message: `Pssword Incorrect !!`
            })
        }
        const token = generateToken(getUser._id);
        res.cookie('token', token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'None' : 'Lax',
            maxAge: 1000 * 60 * 60 * 24
        });
        res.status(200).json({
            success: true,
            message: `User logged In Successfully!!`
        })
        next();
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Something Went Wrong !! Try Again !!"
        })
    }
}

const logoutUser = async (req, res, next) => {
    res.cookie('token', "", {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'None' : 'Lax',
        expires: new Date(0), 
    })
    return res.status(200).json({
        success: true,
        message: 'Logout Successfully !!'
    })
}
export { SignupUser, loginUser, logoutUser }