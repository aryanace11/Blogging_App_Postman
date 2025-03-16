import Blog from "../model/Blog";

export const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find();
  } catch (err) {
    return console.log(err);
  }
  if (!blogs) {
    return res.status(404).json({ message: "No Blogs Found" });
  }
  return res.status(200).json({ blogs });
};

export const addBlog = async (req, res, next) => {
  const { title, description, image, name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  const blog = new Blog({
    title,
    description,
    image,
    name,
  });

  try {
    await blog.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable To Add Blog" });
  }
  return res.status(200).json({ blog });
};

export const updateBlog = async (req, res, next) => {
  const { title, description } = req.body;
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, { title, description }, { new: true });
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(500).json({ message: "Blog Not Found" });
  }
  return res.status(200).json({ blog });
};

export const getById = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(404).json({ message: "No Blog Found" });
  }
  return res.status(200).json({ blog });
};

export const deleteBlog = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndDelete(id);
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(404).json({ message: "No Blog Found" });
  }
  return res.status(200).json({ message: "Blog Deleted" });
};

export const getByUserName = async (req, res, next) => {
  const name = req.params.name;
  let blogs;
  try {
    blogs = await Blog.find({ name });
  } catch (err) {
    return console.log(err);
  }
  if (!blogs || blogs.length === 0) {
    return res.status(404).json({ message: "No Blogs Found" });
  }
  return res.status(200).json({ blogs });
};
export const getByUserID = async (req, res, next) => {
  const id = req.params.id;
  let blogs;
  try {
      blogs = await Blog.find({ user: id }).populate("user");
  } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Error fetching blogs" });
  }
  if (!blogs || blogs.length === 0) {
      return res.status(404).json({ message: "No blogs found for this user" });
  }
  return res.status(200).json({ blogs });
};
