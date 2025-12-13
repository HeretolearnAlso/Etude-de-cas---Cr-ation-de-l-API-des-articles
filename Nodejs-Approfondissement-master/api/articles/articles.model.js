const { Schema, model } = require("mongoose");

const articleSchema = Schema({
  title: String,
  content: String,
  status: {
    type: String,
    enum: ['draft', 'published'],
  },
  userId: {
    type: Number,
  },
});



let Article;


module.exports = Article = model("Article", articleSchema);

