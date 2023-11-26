/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      id: 1,
      username: "test@test.com",
      password: "$2a$12$rFQAOEhOQYmbuN9TYZDAK.AwcDPq/Zgduhc9Puud5MmyPbeTqpgx6",
    },
    {
      id: 2,
      username: "jsmith@gmail.com",
      password: "$2a$12$jJNHGV68hF2kMGgTzl5.gOcor9Bl7a.I4omZpSUj8g.chyem2lrEO",
    },
    {
      id: 3,
      username: "bob@bob.com",
      password: "$2a$12$jRPhFI9DsvA3ZcGTlF0REeIaTRbmQpikU5AuZf/Zdi7v0OK3pRAGq",
    },
  ]);
};
