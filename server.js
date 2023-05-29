const mongoose = require("mongoose");
const app = require("./app");

// const DB_HOST =
//   "mongodb+srv://Hanna:IsB6L3EGjzG18Kly@cluster0.fipmyl6.mongodb.net/db-contacts?retryWrites=true&w=majority";

const { DB_HOST } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// });
