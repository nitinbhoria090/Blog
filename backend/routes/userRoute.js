import express from "express";
// import {register} from "../controllers/usercontroller.js"
import {login, logout, register, updateProfile} from "../controllers/usercontroller.js"
import {isAuthenticated} from "../middleware/isAuthenticated.js"
import {singleUpload} from "../middleware/multer.js"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.get("/logout", logout)
router.get("/logout", logout)
// router.route("/profile/update").put(singleUpload, isAuthenticated, updateProfile)
router.route("/profile/update")
  .put(singleUpload, isAuthenticated, updateProfile);


export default router;