import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRoutes.js";
import styleRouter from "./routes/styleRoutes.js";

const app = express();
const PORT = process.env.PORT || 4000;

connectDB();

// REPLACE app.use(express.json()) WITH THESE TWO LINES:
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);
app.use('/api/style', styleRouter)


app.get("/", (req, res) => res.send("API Working"));

app.listen(PORT, () =>
  console.log("Server running on port " + PORT)
);
