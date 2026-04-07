// import express from "express";
// // import {register} from "../controllers/usercontroller.js"
// import {isAuthenticated} from "../middleware/isAuthenticated.js"

// import { createComment, deleteComment, editComment, getCommentsOfPost, likeComment } from "../controllers/commentcontroller.js";

// const router = express.Router()

// router.post(":/id/create", isAuthenticated, createComment)
// router.delete('/:id/delete', isAuthenticated, deleteComment)
// router.put('/:id/edit', isAuthenticated, editComment)
// router.get('/:id/comment/all',getCommentsOfPost)
// router.get('/:id/like',isAuthenticated, likeComment)
// router.get('/my-blogs/comments', isAuthenticated, getAllCommentOnMyBlogs)
// export default router;

import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

import {
  createComment,
  deleteComment,
  editComment,
  getCommentsOfPost,
  likeComment,
  getAllCommentOnMyBlogs
} from "../controllers/commentcontroller.js";

const router = express.Router();


router.get("/my-blogs/comments", isAuthenticated, getAllCommentOnMyBlogs);

router.post("/:id/create", isAuthenticated, createComment);

router.get("/:id/comments", getCommentsOfPost);


router.put("/:id/edit", isAuthenticated, editComment);


router.delete("/:id/delete", isAuthenticated, deleteComment);


router.post("/:id/like", isAuthenticated, likeComment);


export default router;
