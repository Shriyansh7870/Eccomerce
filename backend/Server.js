import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

import authRoutes from "./routes/auth.js";
app.use("/api/auth", authRoutes);

// health‑check
app.get("/", (_req, res) => res.send("API running"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Server on http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => console.error(err));
