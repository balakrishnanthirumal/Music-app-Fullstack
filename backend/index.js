import express from "express";
import dotenv from "dotenv";
import userRoutes from "../backend/src/routes/userRoute.js";
import authRoutes from "../backend/src/routes/authRoute.js";
import adminRoutes from "../backend/src/routes/adminRoute.js";
import songRoutes from "../backend/src/routes/songRoute.js";
import albumRoutes from "../backend/src/routes/albumRoute.js";
import statRoutes from "../backend/src/routes/statRoute.js";
import connectDB from "../backend/src/lib/db.js";
// import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import cors from "cors";
import path from "path";
import { createServer } from "http";
import { initializeSocket } from "../backend/src/lib/socket.js";
import { clerkMiddleware } from "@clerk/express";
dotenv.config();

const app = express();

const PORT = process.env.PORT;

const httpServer = createServer(app);
initializeSocket(httpServer);

const __dirname = path.resolve();

app.use(express.json()); //to parse the req.body
app.use(clerkMiddleware()); //this will add auth to req

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024, //10MB file size
    },
  })
);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

//error handler
app.use((err, req, res, next) => {
  res.status(500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
});

httpServer.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
  connectDB();
});
