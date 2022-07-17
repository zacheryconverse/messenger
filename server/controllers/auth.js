const bcrypt = require("bcrypt");
const StreamChat = require("stream-chat").StreamChat;
const crypto = require("crypto");

require("dotenv").config();

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;

const signup = async (req, res) => {
  try {
    const { fullName, username, password, phoneNumber } = req.body;

    const userId = crypto.randomBytes(16).toString("hex");

    const serverClient = StreamChat.getInstance(
      api_key,
      api_secret,
    );

    const hashedPassword = await bcrypt.hash(password, 10);

    const token = serverClient.createToken(userId);

    res
      .status(200)
      .json({ token, fullName, username, userId, hashedPassword, phoneNumber });
  } catch (error) {
    console.log("signup error");

    res.status(500).json({ message: error.message });
  }
};
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const serverClient = StreamChat.getInstance(
      api_key,
      api_secret,
    );

    const { users } = await serverClient.queryUsers({ name: username });

    if (!users.length)
      return res.status(400).json({ message: "User not found" });

    const success = bcrypt.compare(password, users[0].hashedPassword);

    const token = serverClient.createToken(users[0].id);

    if (success) {
      res.status(200).json({
        token,
        fullName: users[0].fullName,
        username,
        userId: users[0].id,
      });
    } else {
      res.status(500).json({ message: "Invalid password" });
    }
  } catch (error) {
    console.log("login error");

    res.status(500).json({ message: error.message });
  }
};

module.exports = { signup, login };
