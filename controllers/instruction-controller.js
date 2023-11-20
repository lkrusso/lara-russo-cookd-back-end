const knex = require("knex")(require("../knexfile"));

const getInstructions = async (req, res) => {
  try {
    if (!req.body.id) {
      return res.status(400).send("Please include the ID of the recipe");
    }
    const instructions = await knex("instructions").where({
      recipe_id: req.body.id,
    });
    if (instructions.length === 0) {
      return res.status(404).send("No instructions found");
    }
    res.status(201).send(instructions);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send(
        `Unable to get instructions for recipe with ID ${req.body.id} due to server-side error`
      );
  }
};

module.exports = { getInstructions };
