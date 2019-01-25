const mongoose = require("mongoose");

// const Schema = mongoose.Schema;  destructuring.  Taking the schema property out of mongoose.
const { Schema } = mongoose;

//define what fields will be in each record of the collection.
//key value pairs, name: data type.
const userSchema = new Schema({
  googleId: String
});

//tell mongoose to create the actual model class. Name the collection, and assign the schema to it.
mongoose.model("users", userSchema);
