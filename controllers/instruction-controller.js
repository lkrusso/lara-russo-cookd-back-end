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

const createInstructions = async (req, res) => {
  try {
    const { recipe_id, instructionList } = req.body;
    if (!recipe_id) {
      return res.status(400).send("Please include the ID of the recipe");
    }

    if (!instructionList) {
      return res
        .status(400)
        .send("Please include the instructions of the recipe");
    }

    const validRecipeID = await knex("recipes").where({ id: recipe_id });
    if (!validRecipeID) {
      return res
        .status(400)
        .send("The recipe ID sent was not valid. Please try again");
    }

    let instructionDetails = {};

    for (let i = 0; i < instructionList.length; i++) {
      instructionDetails = {
        recipe_id: recipe_id,
        instruction: instructionList[i].instruction,
      };

      await knex("instructions").insert(instructionDetails);
    }

    const addedInstructions = await knex("instructions").where({
      recipe_id: recipe_id,
    });

    return res.status(200).send(addedInstructions);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send(
        `Unable to create instructions for recipe with ID ${req.body.recipe_id} due to server-side error`
      );
  }
};

const updateInstructions = async (req, res) => {
  const { instructions } = req.body;
  let updatedInstructionList = [];

  for (let i = 0; i < instructions.length; i++) {
    const instruction = instructions[i];
    try {
      const updatedRecord = await knex("instructions")
        .where({ id: instruction.id })
        .update(instruction);

      if (updatedRecord === 0) {
        return res
          .status(404)
          .send(
            `Instruction with ID ${instruction.id} of recipe with ID ${instruction.recipe_id} was not found`
          );
      }

      const updatedInstruction = await knex("instructions").where({
        id: instruction.id,
      });
      updatedInstructionList.push(updatedInstruction[0]);
    } catch (error) {
      res
        .status(500)
        .send(
          `Unable to update the instruction with ID ${instruction.id} of recipe with ID ${instruction.recipe_id}: ${error}`
        );
      return;
    }
  }
  res.status(200).send(updatedInstructionList);
  return;
};

module.exports = { getInstructions, createInstructions, updateInstructions };
