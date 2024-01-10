import path from "path";
import express from "express";
import * as dotenv from "dotenv"; // to get variables from .env

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;
const publicPath = path.join(path.resolve(), "/public");

app.use(express.static(publicPath));

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
