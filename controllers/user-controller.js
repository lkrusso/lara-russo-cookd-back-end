const knex = require("knex")(require("../knexfile"));

const getUser = async (req, res) => {
  try {
    let userFound = false;
    let selectedUser = {};
    const selectedUsername = req.body.username;
    if (!selectedUsername) {
      return res.status(400).send("Please enter a username");
    }
    const allUsers = await knex("users");
    allUsers.forEach((user) => {
      if (user.username === selectedUsername) {
        userFound = true;
        return (selectedUser = user);
      }
    });
    if (!userFound) {
      return res
        .status(404)
        .send(`The user with username ${selectedUsername} could not be found`);
    }
    return res.status(200).send(selectedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Could not find user due to server-side error");
  }
};

module.exports = { getUser };
