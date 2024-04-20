const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title should be there!"],
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "General",
        "Vegetarian",
        "Vegan",
        "Gluten-free",
        "Dairy-free",
        "Nut-free",
      ],
      default: ["General"],
    },
    ingredients: {
      type: Object,
      required: true,
      default: [{ name: "", quantity: "" }],
    },
    instructions: {
      type: String,
      required: true,
      default: [],
    },
    allergens: {
      type: String,
    },
    chronicDiseases: {
      type: String,
    },

    image: {
      type: String,
      required: true,
      default:
        "https://res.cloudinary.com/dzexxvvzc/image/upload/v1710920643/samples/food/spices.jpg",
    },
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
