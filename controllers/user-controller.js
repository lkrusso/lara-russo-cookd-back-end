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

const deleteUser = async (req, res) => {
  let errors = [];
  let { id } = req.params;

  const userRecipes = await knex("recipes").where({ user_id: id }).select("id");
  userRecipes.forEach(async (recipe) => {
    try {
      await knex("instructions").where({ recipe_id: recipe.id }).delete();
    } catch (error) {
      console.error(error);
      errors.push(`Unable to delete instructions: ${error}`);
    }
    try {
      await knex("ingredients").where({ recipe_id: recipe.id }).delete();
    } catch (error) {
      console.error(error);
      errors.push(`Unable to delete ingredients: ${error}`);
    }
  });

  try {
    await knex("cookbooks").where({ user_id: id }).delete();
  } catch (error) {
    errors.push(`Unable to delete cookbooks: ${error}`);
  }

  try {
    await knex("recipes").where({ user_id: id }).del();
  } catch (error) {
    errors.push(
      `Unable to delete recipes made by user with ID ${id}: ${error}`
    );
  }

  try {
    const result = await knex("users").where({ id: id });
    if (result === 0) {
      errors.push(`This user doesn't exist`);
    }
  } catch (error) {
    errors.push(`Unable to delete user: ${error}`);
  }

  if (errors.length > 0) {
    return res.status(424).send(errors);
  }

  return res.sendStatus(204);
};

module.exports = { getUser, deleteUser };
