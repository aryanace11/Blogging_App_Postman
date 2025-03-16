import express from "express";
import { addBlog, getAllBlogs, updateBlog, getById, deleteBlog, getByUserID, getByUserName } from "../controllers/blog-controller";

const blogRouter =express.Router();
blogRouter.get("/", getAllBlogs);
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.get("/:id", getById);

blogRouter.get("/get/user/:id", getByUserID);
export default blogRouter;