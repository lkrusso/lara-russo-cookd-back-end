/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("recipes", (table) => {
    table.increments("id").primary().unique();
    table.integer("user_id").unsigned().references("users.id");
    table.integer("cookbook_id").unsigned().references("cookbooks.id");
    table.string("title").notNullable();
    table.integer("duration").notNullable();
    table.integer("serves").notNullable();
    table.string("cuisine_type").notNullable();
    table.timestamp("date_created").defaultTo(knex.fn.now());
    table
      .timestamp("date_last_cooked")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("recipes");
};
