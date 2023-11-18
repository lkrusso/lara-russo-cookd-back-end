/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    { id: 1, username: "test@test.com", password: "test" },
    { id: 2, username: "jsmith@gmail.com", password: "password" },
    { id: 3, username: "bob@bob.com", password: "password123" },
  ]);
};
