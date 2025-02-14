const express = require("express");
const {
  updateUser,
  deleteUser,
  logoutUser,
  getUser,
  getTotalUsers,
  getUsers,
} = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.post("/logout", verifyToken, logoutUser);
router.get("/:id", getUser);
router.get("/total-users", getTotalUsers);
router.get("/users", getUsers);

module.exports = router;
