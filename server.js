require("dotenv").config();
const knex = require("knex")(require("./knexfile"));
const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./controllers/user-controller");

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

app.listen(process.env.SERVER_PORT);
