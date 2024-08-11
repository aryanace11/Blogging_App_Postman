import express from "express";
import router from "./routes/user-routes";
const app = express();
import mongoose from "mongoose";
import blogRouter from "./routes/blog-routes";
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);
mongoose.connect("mongodb+srv://kumararyanai21:aryan12345@cluster0.95mmcdq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => app.listen(5000))
.then(() =>
console.log("Connected TO Database and Listening TO Localhos 5000")
)
.catch((err) => console.log(err));

