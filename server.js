require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
process.on("uncaughtException", err => {
  console.log("UNCAUGHT EXCEPTION REJECTION! ");
  console.log(err.name, err.message);

  process.exit(1);
});

mongoose
  .connect(process.env.MONG_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Success"))
  .catch(err => console.log(err));
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
/**
 * Phan trang
 */
process.on("unhandleRejection", err => {
  console.log("UNHANDLER REJECTION! ");
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});
