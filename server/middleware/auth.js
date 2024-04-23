// authMiddleware.js
const jwt = require("jsonwebtoken");
const util = require("util");

const verifyAsync = util.promisify(jwt.verify);

// Authentication middleware
const authenticateToken = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Không có token xác thực" });
  }

  try {
    const user = await verifyAsync(token, "shineaura");
    req.user = {
      userId: user.userId,
      email: user.email,
      // Thêm các thông tin khác của người dùng nếu cần
    };

    next();
  } catch (error) {
    console.error(error);
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token hết hạn", error: error.message });
    } else {
      return res
        .status(401)
        .json({ message: "Token không hợp lệ", error: error.message });
    }
  }
};

module.exports = authenticateToken;
