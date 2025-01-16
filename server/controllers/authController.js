const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json("Please fill in all fields");

    const userExits = await User.findOne({ email });
    if (userExits) return res.status(400).json("User already exits");

    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashPassword });
    await user.save();
    const { password: pass, ...rest } = user._doc;
    res.status(201).json(rest);
  } catch (error) {
    res.status(500).json("Error registering user");
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json("Please fill in all fields");

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json("User not found!");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json("Invalid login credentials");
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.secret,
      { expiresIn: "1h" }
    );
    const { password: pass, ...rest } = user._doc;
    return res
      .status(200)
      .cookie("token", token, { httpOnly: true })
      .json(rest);
  } catch (error) {
    res.status(500).json("Error logging in user");
    console.log(error);
  }
};

const google = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.secret);
      const { password: pass, ...rest } = user._doc;
      return res
        .status(200)
        .cookie("token", token, { httpOnly: true })
        .json(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashPassword = await bcrypt.hash(generatedPassword, 10);

      const newUser = new User({
        username:
          req.body.displayName.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashPassword,
        avatar: req.body.photoURL,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.secret);
      const { password: pass, ...rest } = newUser._doc;
      return res
        .status(200)
        .cookie("token", token, { httpOnly: true })
        .json(rest);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { register, login, google };
