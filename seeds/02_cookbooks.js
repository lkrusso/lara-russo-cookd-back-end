/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("table_name").del();
  await knex("table_name").insert([
    { id: 1, user_id: 1, name: "test cookbook" },
    { id: 2, user_id: 1, name: "another test cookbook" },
    { id: 3, user_id: 2, name: "john's cookbook" },
    { id: 4, user_id: 3, name: "bob" },
  ]);
};
