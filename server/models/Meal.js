const mealSchema = new mongoose.Schema({
  meal: String,
  ingredients: [{ ingredient: String, quantity: String }],
  instructions: String,
});


