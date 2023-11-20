require("dotenv").config();
const knex = require("knex")(require("./knexfile"));
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.SERVER_PORT || 5050;

const userRoutes = require("./routes/user-routes");
const recipeRoutes = require("./routes/recipe-routes");
const ingredientRoutes = require("./routes/ingredient-routes");
const instructionRoutes = require("./routes/instruction-routes");
const cookbookRoutes = require("./routes/cookbook-routes");

app.use(cors());
app.use(express.json());

app.use((_req, _res, next) => {
  console.log("Logging a request from middleware");
  next();
});

app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/ingredients", ingredientRoutes);
app.use("/api/instructions", instructionRoutes);
app.use("/api/cookbooks", cookbookRoutes);

app.listen(PORT, console.log(`Listening on port ${PORT}`));
