const router = require("express").Router();
const knex = require("knex")(require("../knexfile"));
const jwt = require("jsonwebtoken");

const getUser = async (req, res) => {
  try {
    const selectedUsername = req.body.username;
    if (!selectedUsername) {
      return res.status(400).send("Please enter a username");
    }
    const selectedUser = await knex("users").where(
      username === selectedUsername
    );
    if (!selectedUser) {
      return res.status(404).json({
        error: `The user with username ${selectedUsername} could not be found`,
      });
    }
    return res.status(200).send(selectedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Could not find user due to server-side error");
  }
};

module.exports = { getUser };
