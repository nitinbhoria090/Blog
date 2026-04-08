// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import userRoute from "./routes/userRoute.js"
// import blogRoute from "./routes/blogroute.js"
// import commentRoute from "./routes/commentroute.js"
// import cors from "cors"
// import cookieParser from "cookie-parser";
// import path from "path"


// dotenv.config();

// const app = express();


// app.use(express.json());
// app.use(cookieParser());

// app.use(express.urlencoded({ extended: true }))

// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true
// }))

// const _dirname = path.resolve()





// app.get("/", (req, res) => {
//   res.send("server running ");
// });

// app.use("/api/v1/user", userRoute);
// app.use("/api/v1/blog", blogRoute);
// app.use("/api/v1/comment", commentRoute);


// app.use(express.static(path.join(_dirname,"frontend/dist")))

// // app.get("*",(_, res)=>{
// //   res.sendFile(path.resolve(_dirname,"frotend","dist","index.html"))
// // })


// let PORT = 8000;
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("MongoDB connected");

//     app.listen(PORT, () => {
//       console.log(`Server listening on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("MongoDB error:", err);
//   });



import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";
import blogRoute from "./routes/blogroute.js";
import commentRoute from "./routes/commentroute.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "https://blog-2-zfmp.onrender.com",
    credentials: true,
  })
);

// path resolve
const _dirname = path.resolve();

// API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/comment", commentRoute);

// serve frontend (dist)
// app.use(express.static(path.join(_dirname, "frontend/dist")));

// // ⚠️ fallback route (React/Vite)
// // app.get("*", (req, res) => {
// //   res.sendFile(
// //     path.resolve(_dirname, "frontend", "dist", "index.html")
// //   );
// // });

app.use(express.static(path.join(_dirname, "frontend/dist")));

// ✅ Express v5 compatible fallback
app.get("/:path(.*)", (req, res) => {
  res.sendFile(
    path.resolve(_dirname, "frontend", "dist", "index.html")
  );
});

// server
const PORT = 8000;

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