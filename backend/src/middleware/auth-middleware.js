import jwt, { decode } from "jsonwebtoken";
import User from "../models/user.js";
const SECRET_KEY = 'tejas';
const userAuthVerification = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "User Not Authenticated"
        })
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const userInfo = await User.findById(decoded.getId);
        if (userInfo) {
            return res.status(200).json({
                success: true,
                userInfo
            });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "User Not Authenticated"
        })
    }

}

export { userAuthVerification }