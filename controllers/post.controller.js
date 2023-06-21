import jwt from "jsonwebtoken";
import db from "../connect.js";
import moment from "moment";

const getPosts = (req, res) => {
  let userId = req.query.userId;
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    //Selecting everything from posts table but only userId, name, profilePic from the user table. And only retriving the same user as post.userId.
    // const q = `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId)`;

    // Now if we want to see only our post and the id I follow. We need to add another table relationship and we will have to add the condition so that if post has only the id I follow or post has the id that belongs to me will be shown
    const q = `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) 
    LEFT JOIN relationships AS r ON (p.userId = r.followerUserId) WHERE r.followedUserId= ? OR p.userId =?`;
    const values = (userId = "undefined"
      ? [userId]
      : [userInfo.id, userInfo.id]);

    db.query(q, [userInfo.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

const addPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const query =
      "INSERT INTO posts(`desc`, `img`, `createdAt`, `userId`) VALUES(?)";

    const values = [
      req.body.desc,
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
    ];

    db.query(query, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been created!");
    });
  });
};

export const PostController = {
  getPosts,
  addPost,
};
