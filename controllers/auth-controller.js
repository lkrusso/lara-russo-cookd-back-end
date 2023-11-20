const router = require("express").Router();
const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(404).send("Please fill in all fields");
  }
  const user = await knex("users").where({ username: username }).first();
  if (!user) {
    return res.status(400).send("Invalid email");
  }
  //const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  const isPasswordCorrect = password === user.password;
  if (!isPasswordCorrect) {
    return res.status(400).send("Invalid password");
  }
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_KEY,
    { expiresIn: "24h" }
  );
  if (!token) {
    return res
      .status(500)
      .send("Unable to generate token due to server-side error");
  }
  res.status(201).send({ token });
};

const userDetails = async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Please login");
  }
  const authToken = req.headers.authorization.split(" ")[1];

  try {
    const decodedToken = jwt.verify(authToken, process.env.JWT_KEY);
    const loggedInUser = await knex("users")
      .where({ id: decodedToken.id })
      .first();
    delete loggedInUser.password;
    res.status(201).send(loggedInUser);
  } catch (error) {
    console.error(error);
    res.status(401).send("Invalid auth token");
  }
};

module.exports = { userLogin, userDetails };
