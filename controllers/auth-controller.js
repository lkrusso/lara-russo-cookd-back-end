const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("Please fill in all fields");
  }
  const user = await knex("users").where({ username: username }).first();
  if (!user) {
    return res.status(400).send("Invalid email");
  }

  const isPasswordCorrect = bcrypt.compareSync(password, user.password);
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
  res.status(201).send({ token, id: user.id });
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
    console.log(loggedInUser);
    res.status(201).send(loggedInUser);
  } catch (error) {
    console.error(error);
    res.status(401).send("Invalid auth token");
  }
};

const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send("Please fill in all required fields");
    }

    const existingUser = await knex("users").where({ username: username });
    if (existingUser !== 0) {
      return res.status(400).send("Please sign up using a unique email");
    }

    const hashedPassword = bcrypt.hashSync(password);

    const newUser = { username, password: hashedPassword };

    try {
      await knex("users").insert(newUser);
      res.status(201).send("Registered successfully");
    } catch (error) {
      console.error(error);
      return res.status(400).send("Failed registration");
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send("Could not create user due to server-side error");
  }
};

module.exports = { userLogin, userDetails, createUser };
