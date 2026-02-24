import { Blog } from "../models/blog.model.js"
import cloudinary from "../Utils/cloudinary.js";
import getDataUri from "../Utils/dataUri.js";


export const createBlog = async (req, res) => {
  try {
    const { title, category } = req.body;

    if (!title || !category) {
      return res.status(400).json({
        message: "Blog title and category is required"
      });
    }

    const blog = await Blog.create({
      title,
      category,
      author: req.userId
    });

    return res.status(201).json({
      success: true,
      blog,
      message: "Blog was created successfully"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to create Blog"
    });
  }
};

// export const updateBlog = async(req,res)=>{
//   try {
//     const blogId = req.params.blogId
//     const {title, subtitle, description, category} = req.body
//     const file = req.file

//     let blog = await Blog.findById(blogId)
//     if(!blog){
//       return res.status(404).json({
//         message: "Blog not found"
//       })
//     }
//     let thumbnail;
//     if(file){
//       const fileUri = getDataUri(file)
//       thumbnail = await cloudinary.uploader.upload(fileUri)

//     }
//     const updateData = {title, subtitle, description, category, author:req.userId, thumbnail:thumbnail?.secure_url}
//     blog = await Blog.findByIdAndUpdate(blogId, updateData, {new:true})
//     res.status(200).json({
//       success:true,
//       message:"Blog update successfully",
//       blog
//     })


//   } catch (error) {
//     console.log(error);

//    return res.status(500).json({
//     success:false,
//     message:"exrror updating blog"
//    })
//   }
// }


export const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const { title, subtitle, description, category, } = req.body;
    const file = req.file;



    let blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    let thumbnail;
    if (file) {
      const fileUri = getDataUri(file);
      const uploadRes = await cloudinary.uploader.upload(fileUri);
      thumbnail = uploadRes.secure_url;

    }
    console.log("FILE:", req.file);

    const updateData = {
      title,
      subtitle,
      description,
      category,
      author: req.id
    };

    if (thumbnail) {
      updateData.thumbnail = thumbnail;
    }

    blog = await Blog.findByIdAndUpdate(blogId, updateData, { new: true });

    res.status(200).json({
      success: true,
      message: "Blog update successfully",
      blog
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error updating blog"
    });
  }
};


export const getOwnBlogs = async (req, res) => {
  try {
    const userId = req.id
    if (!userId) {
      return res.status(400).json({
        message: "User ID is required"
      })

    }
    const blogs = await Blog.find({ author: userId }).populate({
      path: "author",
      select: "firstName lastName photoUrl"
    })
    if (!blogs) {
      return res.status(404).json({
        message: "No Blogs Found", blogs: [], success: false
      })

    }
    return res.status(200).json({ blogs, success: true })


  } catch (error) {
    return res.status(500).json({
      message: "Error fetched blogs",
      error: error.message
    })
  }
}

export const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const authorId = req.id
    const blog = await Blog.findById(blogId)
    if (!blog) {
      return res.status(404).json({ success: false, message: "blog is not found" })
    }
    if (blog.author.toString() !== authorId) {
      return res.status(403).json({ success: false, message: "Unauthorized to delete this blog " })
    }
    //delete blog

    await Blog.findByIdAndDelete(blogId)

    res.status(200).json({ success: true, message: " Blog Delete Successfully" })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting blog",
      error: error.message
    })
  }
}

export const getPublishedBlog = async (_, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true }).sort({ createdAt: -1 }).populate({ path: "author", select: "firstName lastName photoUrl" })
    if (!blogs) {
      return res.status(401).json({
        message: "blog not found"
      })
    }
    return res.status(200).json({
      success: true,
      blogs
    })
  } catch (error) {
    return res.status(500).json({
      message: "failed to get published blogs"
    })
  }
}

// export const togglePublishedBlog = async (req, res) => {
//   try {
//     const { blogId } = req.perams
//     const { publish } = req.query;//ture or false

//     const blog = await Blog.findById(blogId)
//     if (!blog) {
//       return res.status(404).json({
//         message: "Blog not found"
//       })
//     }
//     //publish status based on the query parameter
//     blog.isPublished = !blog.isPublished
//     await blog.save()

//     const statusMessage = blog.isPublished ? "Published" : "UnPublished"
//     return res.status(200).json({
//       success: true,
//       message: `Blog is ${statusMessage}`
//     })

//   } catch (error) {
//     return res.status(500).json({
//       message: "failed to update status"
//     })
//   }
// }

export const togglePublishedBlog = async (req, res) => {
  try {
    const { blogId } = req.params   // ✅ fixed typo

    const blog = await Blog.findById(blogId)

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      })
    }

    // Toggle publish status
    blog.isPublished = !blog.isPublished
    await blog.save()

    return res.status(200).json({
      success: true,
      message: blog.isPublished
        ? "Blog Published Successfully"
        : "Blog Unpublished Successfully"
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Failed to update status"
    })
  }
}


export const likeBlog = async (req, res) => {
  try {
    const blogId = req.params.id
    const likeKrneWaleKiId = req.id;

    const blog = await Blog.findById(blogId).populate({ path: "likes" })

    if (!blog) {
      return res.status(404).json({
        message: "blog not found",
        success: false
      })


    }

    await blog.updateOne({ $addToSet: { likes: likeKrneWaleKiId } })
    await blog.save()
    return res.status(200).json({ message: "blog liked", blog, success: true })
  } catch (error) {
    console.log(error);

  }
}

export const dislikeBlog = async (req, res) => {
  try {
    const blogId = req.params.id
    const likeKrneWaleKiId = req.id;

    const blog = await Blog.findById(blogId)

    if (!blog) {
      return res.status(404).json({
        message: "blog not found",
        success: false
      })


    }
//dislike logic

    await blog.updateOne({ $pull: { likes: likeKrneWaleKiId } })
    await blog.save()
    return res.status(200).json({ message: "blog disliked", blog, success: true })
  } catch (error) {
    console.log(error);

  }
}

export const getMyTotalBlogLikes = async (req, res)=>{
try {
  const userId = req.id
  const myBlogs = await Blog.find({author:userId}).select("likes")
  const totalLikes = myBlogs.reduce((acc, blog)=>acc+(blog.likes?.length || 0), 0)

  return res.status(200).json({
    success:true,
    totalBlogs:myBlogs.length,
    totalLikes,
  })
} catch (error) {
  return res.status(500).json({
    success:false,
    message:"failed to fetch total blog likes"
  })
}
}