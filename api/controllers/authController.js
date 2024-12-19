const { initializeDbAndServer } = require("../db"); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const login = async (req, res) => {
  const { username, password } = req.body;
  dbs = await initializeDbAndServer();
  if (!dbs) {
    return res.status(500).json({ message: "Database not initialized" });
  }

  const get_user = "SELECT * FROM admin WHERE username = (?)";
  try {
    const user = await dbs.get(get_user, [username]);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ message: "Password is incorrect" });
    }

    const payLoad = { username: username };
    const jwtToken = jwt.sign(payLoad, "arun");
    res.json({ jwtToken });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Error during login" });
  }
};

module.exports = { login };


