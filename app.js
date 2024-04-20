const express = require("express");
const mongoose = require("mongoose");
const Recipe = require("./Models/recipeModel");

const app = express();

app.use(express.json());

console.log(process.env.MONGO_DB_URL);

(async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_DB_URL.replace(
        "<password>",
        process.env.MONGO_DB_PASSWORD
      )
    );
    console.log("Database connected ❤️❤️");
  } catch (error) {
    console.log(error.message);
  }
})();

app.get("/api/v1/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    console.log("data", recipes);
    res.status(200).json({
      status: "succes",
      data: recipes,
    });
  } catch (error) {
    res.status(200).json({
      status: "error",
      error: error.message,
    });
  }
});

app.post("/api/v1/recipes", async (req, res) => {
  try {
    const recipes = new Recipe({ ...req.body });
    await recipes.save();
    res.status(201).json({
      status: "success",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

app.listen(3000, () => {
  console.log("Port is running on 3000....");
});
