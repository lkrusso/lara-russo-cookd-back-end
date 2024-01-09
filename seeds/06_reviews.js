/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("table_name").del();
  await knex("table_name").insert([
    {
      id: 1,
      recipe_id: 1,
      rating: 5,
      comment: "Delicious recipe, but needs more gochujang",
    },
    {
      id: 1,
      recipe_id: 2,
      rating: 1,
      comment: "Not yummy at all! Will not cook again",
    },
  ]);
};
