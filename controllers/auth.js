import jwt from "jsonwebtoken";
import users from '../models/auth.js';

export const login = async(req, res) => {
    const { email, phone } = req.body;
    // console.log(email, phone);
    try {
        const existingUser = await users.findOne({ email });
        if (!existingUser) {
            try {
                let newUser;
                if (!phone) {
                    newUser = await users.create({ email });
                } else {
                    const existingPhone = await users.findOne({ phone });
                    if (existingPhone) {
                        return res.status(409).json({ msg: `Phone ${phone} already exists!`})
                    }
                    newUser = await users.create({ email: email, phone: phone  });
                }

                const token = jwt.sign({
                    email: newUser.email, id: newUser._id
                }, process.env.JWT_SECRET, {
                    expiresIn: "1h"
                })
                res.status(200).json({ result:newUser, token })
            } catch (error) {
                res.status(500).json({ msg: "Something went wrong..."});
            }
        } else {
            // console.log(existingUser);
            if (phone)
            return res.status(409).json({ msg: `Email ${email} already exists!` });
            const token = jwt.sign({
                email: existingUser.email, id: existingUser._id
            }, process.env.JWT_SECRET, {
                expiresIn: "1h"
            })
            res.status(200).json({ result:existingUser, token })
        }
    } catch (error) {
        res.status(500).json({ msg: "Something went wrong..."});
    }
};

export const phoneUserController = async (req, res) => {
    const { phone } = req.body;
    // console.log(phone);
    try {
        const existingUser = await users.findOne({ phone });
        if (existingUser) {
            res.status(200).json({ result:existingUser });
        }
        else
            res.status(404).json({msg: "User not found!"});
    } catch (error) {
        res.status(500).json({ msg: "Something went wrong..."});
    }
};