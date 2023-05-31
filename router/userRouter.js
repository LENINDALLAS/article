import express from "express";
import bcrypt from "bcryptjs";
import { generateToken, isAuth, response } from "../utils.js";
import User from "../model/userModel.js";

const userRouter = express.Router();

userRouter.post(
  "/signup", async (req, res) => {
    try {
      if (!req.body.email || !req.body.password) {
        res.status(400).json(response({
          statusCode: 400,
          data: null,
          message: "Failed",
          error: "email and password are required"
        }))
        return;
      }

      const duplicateCheck = await User.findOne({ email: req.body.email });
      if (duplicateCheck.email === req.body.email) {
        res.status(409).json(response({
          statusCode: 409,
          data: null,
          message: "Failed",
          error: "user already exists, please login"
        }))
        return;
      }

      const user = new User({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
      });
      const createdUser = await user.save();
      const resData = response({
        statusCode: 200,
        data: {
          _id: createdUser._id,
          name: createdUser.name,
          email: createdUser.email,
        },
        message: "Success",
        error: null
      });

      res.status(200).send(resData);
    } catch (error) {
      res.status(500).json(response({
        statusCode: 500,
        data: null,
        message: "Failed",
        error
      }));
    }
  }
);

userRouter.post('/login', async (req, res) => {
  try {
    // console.log(req.body);
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const resData = response({
          statusCode: 200,
          data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user)
          },
          message: "Success",
          error: null
        });
        res.status(200).json(resData);
        return;
      }
    }
    else {
      res.status(401).json(response({
        statusCode: 401,
        data: null,
        message: "Failed",
        error: 'Invalid email and password'
      }))
    }
  } catch (error) {
    res.status(500).json(response({
      statusCode: 500,
      data: null,
      message: "Failed",
      error
    }));
  }
});


export default userRouter;