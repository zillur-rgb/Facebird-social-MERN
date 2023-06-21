import db from "../connect.js";
import httpStatus from "http-status";
import bcrypt from "bcryptjs";

const register = async (req, res) => {
  // Check if user already exists
  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");
    //create a new user
    //Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q =
      "INSERT INTO users (`username`,`email`,`password`,`name`) VALUE (?)";

    const values = [
      req.body.username,
      req.body.email,
      hashedPassword,
      req.body.name,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(httpStatus.OK).json({
        success: true,
        status: httpStatus.OK,
        message: "User has been created.",
        data,
      });
    });
  });
};

export const AuthController = {
  register,
};
