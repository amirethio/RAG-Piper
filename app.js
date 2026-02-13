import express from "express";
import "dotenv/config";
import indexRoute from "./routes/index.route.js";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT;

// *MIDDLEWARES
app.use(cookieParser());
app.use(express.json());

app.use(indexRoute);


app.get("/", (req, res) => {
  res.send("working");
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
