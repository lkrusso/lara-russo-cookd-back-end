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
      user_id: 1,
      cookbook_id: 1,
      title: "kimchi jeon",
      duration: 20,
      serves: 2,
      cuisine_type: "korean",
    },
    {
      id: 2,
      user_id: 1,
      cookbook_id: 1,
      title: "easy kale soup",
      duration: 60,
      serves: 5,
      cuisine_type: "western",
    },
    {
      id: 2,
      user_id: 1,
      title: "turkey chilli",
      duration: 65,
      serves: 4,
      cuisine_type: "mexican",
    },
  ]);
};
