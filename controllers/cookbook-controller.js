const knex = require("knex")(require("../knexfile"));

const getCookbooks = async (req, res) => {
  try {
    if (!req.body.id) {
      return res.status(400).send("Please include the ID of the cookbook");
    }
    const cookbooks = await knex("cookbooks").where({
      user_id: req.body.id,
    });
    if (cookbooks.length === 0) {
      return res.status(404).send("No cookbooks found");
    }
    res.status(201).send(cookbooks);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send(
        `Unable to get cookbooks for user with ID ${req.body.id} due to server-side error`
      );
  }
};

module.exports = { getCookbooks };
