/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("ingredients").del();
  await knex("ingredients").insert([
    { id: 1, recipe_id: 1, name: "g self-raising flour", quantity: 175 },
    { id: 2, recipe_id: 1, name: "tbsp cornflour", quantity: 1 },
    { id: 3, recipe_id: 1, name: "g kimchi", quantity: 200 },
    { id: 4, recipe_id: 1, name: "tsp gochujang", quantity: 2 },
    { id: 5, recipe_id: 1, name: "spring onions", quantity: 2 },
    { id: 6, recipe_id: 1, name: "tbsp vegetable oil", quantity: 6 },
    { id: 7, recipe_id: 2, name: "tbsp extra virgin olive oil", quantity: 2 },
    { id: 8, recipe_id: 2, name: "large onion", quantity: 1 },
    { id: 9, recipe_id: 2, name: "garlic cloves", quantity: 3 },
    { id: 10, recipe_id: 2, name: "g kale", quantity: 200 },
    { id: 11, recipe_id: 2, name: "large potatoes", quantity: 2 },
    { id: 12, recipe_id: 2, name: "l stock", quantity: 1 },
    { id: 13, recipe_id: 2, name: "g frozen peas", quantity: 200 },
    { id: 14, recipe_id: 3, name: "tbsp rapeseed oil", quantity: 1 },
    { id: 15, recipe_id: 3, name: "g turkey thigh mince", quantity: 500 },
    { id: 16, recipe_id: 3, name: "garlic cloves", quantity: 2 },
    { id: 17, recipe_id: 3, name: "chilli", quantity: 1 },
    { id: 18, recipe_id: 3, name: "tsp dried oregano", quantity: 1 },
    { id: 19, recipe_id: 3, name: "tsp ground coriander", quantity: 2 },
    { id: 20, recipe_id: 3, name: "tsp ground coriander", quantity: 1 },
    { id: 21, recipe_id: 3, name: "g red kidney beans", quantity: 800 },
    {
      id: 22,
      recipe_id: 3,
      name: "tsp vegetable boullion powder",
      quantity: 2,
    },
    { id: 23, recipe_id: 3, name: "red peppers", quantity: 2 },
    { id: 24, recipe_id: 3, name: "small sweet potatoes", quantity: 4 },
    { id: 25, recipe_id: 3, name: "avocados", quantity: 2 },
    { id: 26, recipe_id: 3, name: "lime", quantity: 1 },
  ]);
};
