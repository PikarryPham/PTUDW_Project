require('dotenv').config()
const mongoose = require("mongoose");
const app = require('./app');


mongoose.connect(process.env.MONG_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB Connection Success'))
  .catch(() => console.log('Error Database'));
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
/**
 * Phan trang
 */