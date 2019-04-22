const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/reviews", { useNewUrlParser: true })
  .then(() => {
    console.log("Mongoose connected.");
  })
  .catch(err => {
    console.log("Error connecting to Mongoose", err);
  });

const reviewSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  id: Number,
  date: String,
  text: String,
  rating: Number,
  user_id: Number,
  apartment_id: Number,
  has_response: Boolean,
  owner_response: String
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
