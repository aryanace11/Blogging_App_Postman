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
  const { title, description, image, user}= req.body;
  let existingUser;
try {
existingUser = await User.findById(user);
} catch (err) {
return console.log(err)
}
if (!existingUser) {
return res.status(400).json({message: "Unable To Find User By This ID"})
}

  const blog = new Blog({
  title,
  description,
  image,
  user,
  });
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await blog.save({ session: sess });

    existingUser.blogs.push(blog);
    await existingUser.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
   console.log(err);
   return res.status(500).json({ message: "Unable To Add Blog" });
  }
  return res.status(200).json({ blog });
  };
  export const updateBlog = async (req, res, next) => {
    const { title, description, } = req.body;
    const blogId = req.params.id;
    let blog;
    try { 
    blog = await Blog.findById(blogId,{
    title,description
    } );
    }
    catch (err) { 
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
      blog = await Blog.findByIdAndDelete(id).populate("user") ;
      await blog.user.blogs.pull(blog);
      } catch (err) {
      return console.log(err);
      }
      if (!blog) {
      return res.status(404).json({ message: "No Blog Found" });
      }
      return res.status(200).json({ message: "Blog Deleted" });
      };
      
      export const getByUserID = async (req, res, next) => {
        const id = req.params.id;
        let blog;
        try {
        blog = await Blog.find({ user: id }).populate("blogs");
        } catch (err) {
        return console.log(err);
        }
        if (!blog) {
        return res.status(404).json({ message: "No Blog Found" });
        }
        return res.status(200).json({ blogs: blog });
        }


