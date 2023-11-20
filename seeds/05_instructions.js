/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("instructions").del();
  await knex("instructions").insert([
    {
      id: 1,
      recipe_id: 1,
      instruction:
        "Put the flours in a bowl + pour in 200ml ice-cold water + reserved kimchi liquid. Whisk until a smooth batter is formed.",
    },
    {
      id: 2,
      recipe_id: 1,
      instruction: "Mix in the kimchi, gochujang + spring onions",
    },
    {
      id: 3,
      recipe_id: 1,
      instruction:
        "Place a large, non-stick pan over a high heat with vegetable oil. Ladle mix into pan + smooth the mixture out to create a thin, even layer.",
    },
    {
      id: 4,
      recipe_id: 1,
      instruction: "Fry for 2-3 mins and then flip the pancake.",
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
        "Flip one last time, pressing down on the pancake again and fry for 30 seconds. Serve.",
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
      id: 12,
      recipe_id: 3,
      instruction:
        "Heat the oil in a large pan over a medium heat, then tip in the mince and break it up using a wooden spoon.",
    },
    {
      id: 13,
      recipe_id: 3,
      instruction:
        "Stir in the garlic and chilli, and cook for 10 mins until the mince is cooked through.",
    },
    {
      id: 14,
      recipe_id: 3,
      instruction: "Add the herbs and spices, and cook for a minute more.",
    },
    {
      id: 15,
      recipe_id: 3,
      instruction:
        "Pour in the passata, the reserved liquid from the beans, the bouillon powder and peppers.",
    },
    {
      id: 16,
      recipe_id: 3,
      instruction:
        "Cover and cook for 15-20 mins until slightly thickened. Tip in the beans and cook for 3-5 mins more.",
    },
    {
      id: 17,
      recipe_id: 3,
      instruction:
        "Meanwhile, prick two of the sweet potatoes all over using a fork, then microwave on high for 7-10 mins until tender. Mash one of the avocados with half the lime juice in a small bowl.",
    },
    {
      id: 18,
      recipe_id: 3,
      instruction:
        "To serve, halve the potatoes and spoon over half the chilli, then finish with the mashed avocado.",
    },
  ]);
};
