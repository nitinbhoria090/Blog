import { Blog } from "../models/blog.model.js"
import Comment from "../models/comment.model.js"

// export const createComment = async (req, res) => {
//     try {
//         const postId = req.params.id
//         const commentKrneWaleUserKiId = req.id
//         const { content } = req.body;

//         const blog = await Blog.findById(postId)
//         if (!content) return res.status(400).json({
//             message: "text is required",
//             success: false
//         })

//         const comment = await Comment.create({
//             content,
//             userId: commentKrneWaleUserKiId,
//             postId: postId
//         })

//         await comment.populate({
//             path: 'userId',
//             select: `firstName lastName photoUrl`
//         })

//         blog.comments.push(comment._id)
//         await blog.save()
//         return res.status(201).json({
//             message: "comment added",
//             success: true
//         })
//     } catch (error) {
//         console.log(error);

//     }
// }


export const createComment = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.id;
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({
                message: "Text is required",
                success: false
            });
        }

        const blog = await Blog.findById(postId);
        if (!blog) {
            return res.status(404).json({
                message: "Blog not found",
                success: false
            });
        }

        const comment = await Comment.create({
            content,
            userId,
            postId
        });

        await comment.populate({
            path: "userId",
            select: "firstName lastName photoUrl"
        });

        blog.comments.push(comment._id);
        await blog.save();

        return res.status(201).json({
            message: "Comment added",
            success: true,
            comment
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error creating comment"
        });
    }
};

export const getCommentsOfPost = async (req, res) => {
    try {
        const blogId = req.params.id;

        const comments = await Comment.find({ postId: blogId })
            .populate("userId", "firstName lastName photoUrl")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            comments
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error fetching comments"
        });
    }
};



export const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        const userId = req.id;

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            });
        }

        if (comment.userId.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            });
        }

        await Comment.findByIdAndDelete(commentId);

        await Blog.findByIdAndUpdate(comment.postId, {
            $pull: { comments: commentId }
        });

        return res.status(200).json({
            success: true,
            message: "Comment deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error deleting comment"
        });
    }
};


export const editComment = async (req, res) => {
    try {
        const userId = req.id;
        const { content } = req.body;
        const commentId = req.params.id;

        if (!content) {
            return res.status(400).json({
                success: false,
                message: "Content is required"
            });
        }

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        if (comment.userId.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "Not authorized"
            });
        }

        comment.content = content;
        comment.editedAt = new Date();

        await comment.save();

        return res.status(200).json({
            success: true,
            message: "Comment updated successfully",
            comment
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Comment not edited",
            error: error.message
        });
    }
};



// export const likeComment = async (req, res) => {
//     try {
//         const userId = req.id;
//         const commentId = req.params.id;

//         const comment = await Comment.findById(commentId);
//         if (!comment) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Comment not found"
//             });
//         }

//         const alreadyLiked = comment.likes.some(
//             id => id.toString() === userId
//         );

//         if (alreadyLiked) {
//             comment.likes = comment.likes.filter(
//                 id => id.toString() !== userId
//             );
//         } else {
//             comment.likes.push(userId);
//         }

//         await comment.save();

//         return res.status(200).json({
//             success: true,
//             message: alreadyLiked ? "Comment unliked" : "Comment liked",
//             updatedComment: comment
//         });

//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Something went wrong",
//             error: error.message
//         });
//     }
// };

export const likeComment = async (req, res) => {
    try {
        const userId = req.id;
        const commentId = req.params.id;

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            });
        }

        const alreadyLiked = comment.likes.some(
            id => id.toString() === userId
        );

        if (alreadyLiked) {
            comment.likes = comment.likes.filter(
                id => id.toString() !== userId
            );
        } else {
            comment.likes.push(userId);
        }

        await comment.save();

        // 🔥 THIS IS THE FIX
        await comment.populate({
            path: "userId",
            select: "firstName lastName photoUrl"
        });

        return res.status(200).json({
            success: true,
            message: alreadyLiked ? "Comment unliked" : "Comment liked",
            updatedComment: comment
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};


// export const getAllCommentOnMyBlogs = async (req, res) => {
//     try {
//         const userId = req.id;
//        console.log(userId)
//         const myBlogs = await Blog.find({ author: userId }).select("_id");
//         const blogIds = myBlogs.map(blog => blog._id);

//         if (blogIds.length === 0) {
//             return res.status(200).json({
//                 success: true,
//                 totalComments: 0,
//                 comments: [],
//                 message: "No blogs found"
//             });
//         }

//         const comments = await Comment.find({
//             postId: { $in: blogIds }
//         })
//             .populate("userId", "firstName lastName email")
//             .populate("postId", "title")
//             .sort({ createdAt: -1 });

//         return res.status(200).json({
//             success: true,
//             totalComments: comments.length,
//             comments
//         });

//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Failed to get comments"
//         });
//     }
// };



export const getAllCommentOnMyBlogs = async (req, res) => {
    try {
        console.log("User ID from middleware:", req.id);

        const userId = req.id;


        const myBlogs = await Blog.find({ author: userId }).select("_id");
        console.log("My Blogs:", myBlogs);

        const blogIds = myBlogs.map(blog => blog._id);

        if (blogIds.length === 0) {
            return res.status(200).json({
                success: true,
                totalComments: 0,
                comments: [],
                message: "No blogs found"
            });
        }

        const comments = await Comment.find({
            postId: { $in: blogIds }
        })
        .populate("userId", "firstName lastName email")
        .populate("postId", "title")
        .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            totalComments: comments.length,
            comments
        });

    } catch (error) {
        console.error("🔥 ERROR:", error);  // 👈 VERY IMPORTANT

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

