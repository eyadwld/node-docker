import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email }).lean();
    if (user) {
      const error = new Error("There is an account with that email");
      error.statusCode = 409;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User created successfully",
      result: newUser,
    });
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    console.log("hello from nginx");
    const { email, password } = req.body;
    const user = await User.findOne({ email }).lean();
    if (!user) {
      const error = new Error("There is no account with that email");
      error.statusCode = 401;
      throw error;
    }

    const isMatched = bcrypt.compare(password, user.password);

    if (!isMatched) {
      const error = new Error("Invalid Password");
      error.statusCode = 401;
      throw error;
    }
    req.session.user = user;

    res.status(201).json({
      message: "User fetched successfully",
      result: user,
    });
  } catch (error) {
    next(error);
  }
};
