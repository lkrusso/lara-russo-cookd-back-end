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
      instruction:
        "Put the flours in a bowl and pour in 200ml ice-cold water and the reserved kimchi liquid. Whisk until a smooth batter is formed.",
    },
    {
      id: 2,
      recipe_id: 1,
      instruction:
        "Mix in the kimchi, gochujang and spring onions - the batter should be a slightly thick pancake batter, similar to a drop scone consistency. You can add a tablespoon of flour if you need to thicken it a little.",
    },
    {
      id: 3,
      recipe_id: 1,
      instruction:
        "Place a large, non-stick pan over a high heat with 2 tbsp vegetable oil. Ladle the pancake mix into the pan. Use the back of the ladle to smooth the mixture out to create a thin, even layer. Reduce the heat to medium high. Fry for 2-3 mins, until air bubbles start to pop on the surface and the sides start to crisp.",
    },
    {
      id: 4,
      recipe_id: 1,
      instruction:
        "Flip the pancake then slightly lift the side of the pancake with a spatula and add another tablespoon of oil underneath - shake the pan a little to make sure the oil coats the bottom of the pancake.",
    },
    {
      id: 5,
      recipe_id: 1,
      instruction:
        "Use a spatula to press on top of the pancake to ensure the pancake is crispy. Fry for a further 2 mins.",
    },
    {
      id: 6,
      recipe_id: 1,
      instruction:
        "Flip one last time, pressing down on the pancake again and fry for 30 seconds. Drain on kitchen paper and keep warm in a low oven while you cook the second pancake using the same method. Serve (optionally cut into bite-sized pieces).",
    },
    {
      id: 7,
      recipe_id: 2,
      instruction:
        "Heat the oil in a large saucepan over a medium-low heat and cook the onion, garlic, kale stalks and a pinch of salt, covered, for 10-15 mins until softened.",
    },
    {
      id: 8,
      recipe_id: 2,
      instruction:
        "Remove the lid, add the potatoes and cook for another 5 mins. Pour in the stock, bring to the boil, reduce the heat and simmer for 20 mins.",
    },
    {
      id: 9,
      recipe_id: 2,
      instruction:
        "Add the kale leaves and peas, and cook for another 5-10 mins until the kale has wilted and softened.",
    },
    {
      id: 10,
      recipe_id: 2,
      instruction:
        "Remove from the heat, leave to cool and blitz using a jug or hand blender.",
    },
    {
      id: 11,
      recipe_id: 2,
      instruction:
        "Reheat in a clean pan over a low-medium heat until piping hot, then ladle into bowls. Serve.",
    },
    {
      id: 11,
      recipe_id: 3,
      instruction:
        "Heat the oil in a large pan over a medium heat, then tip in the mince and break it up using a wooden spoon.",
    },
    {
      id: 11,
      recipe_id: 3,
      instruction:
        "Stir in the garlic and chilli, and cook for 10 mins until the mince is cooked through.",
    },
    {
      id: 12,
      recipe_id: 3,
      instruction: "Add the herbs and spices, and cook for a minute more.",
    },
    {
      id: 13,
      recipe_id: 3,
      instruction:
        "Pour in the passata, the reserved liquid from the beans, the bouillon powder and peppers.",
    },
    {
      id: 14,
      recipe_id: 3,
      instruction:
        "Cover and cook for 15-20 mins until slightly thickened. Tip in the beans and cook for 3-5 mins more.",
    },
    {
      id: 15,
      recipe_id: 3,
      instruction:
        "Meanwhile, prick two of the sweet potatoes all over using a fork, then microwave on high for 7-10 mins until tender. Mash one of the avocados with half the lime juice in a small bowl.",
    },
    {
      id: 16,
      recipe_id: 3,
      instruction:
        "To serve, halve the potatoes and spoon over half the chilli, then finish with the mashed avocado.",
    },
  ]);
};
