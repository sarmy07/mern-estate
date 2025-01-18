const User = require("../models/User");
const bcrypt = require("bcrypt");

const updateUser = async (req, res) => {
  const userId = req.params.id;

  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password: pass, ...rest } = updatedUser._doc;
    return res.status(200).json(rest);
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) return res.status(404).json("No user found");
    res.clearCookie("token", {
      httpOnly: true,
    });
    return res.status(200).json("User deleted!");
  } catch (error) {
    res.status(500).json("Error deleteing user", error);
    console.log(error);
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json("loogged out!");
  } catch (error) {
    console.log(error);
  }
};

const getUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json("No user found");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json("Error getting user", error);
    console.log(error);
  }
};

const getTotalUsers = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({});
    return res.status(200).json(totalUsers);
  } catch (error) {
    console.log(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  updateUser,
  deleteUser,
  logoutUser,
  getUser,
  getTotalUsers,
  getUsers,
};
