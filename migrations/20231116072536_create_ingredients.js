/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("ingredients", (table) => {
    table.increments("id").primary().unique();
    table.integer("recipe_id").unsigned().references("recipes.id");
    table.string("name").notNullable();
    table.integer("quantity").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("ingredients");
};
