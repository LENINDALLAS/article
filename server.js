import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./router/userRouter.js";
import articleRouter from "./router/articleRouter.js";
import getArticleRouter from "./router/getArticleRouter.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL || " mongodb://localhost/article", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true
});

mongoose.connection.once("open", () => {
    console.log("Database Connected...");
});
mongoose.connection.on("error", (error) => {
    console.log("Error connecting database..."), error;
});

app.use("/api/users", articleRouter);
app.use("/api/articles", getArticleRouter);
app.use("/api", userRouter);


const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});