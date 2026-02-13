import express from "express";
import "dotenv/config";
import indexRoute from "./routes/index.route.js";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT;

// *MIDDLEWARES
app.use(
  cors({
    origin: "http://localhost:5173", // frontend origin
    credentials: true, // allow cookies / auth headers
  }),
);
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
