import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js"
import blogRoute from "./routes/blogroute.js"
import commentRoute from "./routes/commentroute.js"
import cors from "cors"
import cookieParser from "cookie-parser";



dotenv.config();

const app = express();


app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }))

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))





app.get("/", (req, res) => {
  res.send("server running ");
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/comment", commentRoute);

let PORT = 8000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB error:", err);
  });

