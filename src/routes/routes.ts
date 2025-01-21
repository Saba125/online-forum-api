import express from "express"
import usersController from "../controllers/auth/export"
import authMiddleware from "../middlewares/auth"
import categoryController from "../controllers/categories/export"
import roleMiddleware from "../middlewares/permission"
import postController from "../controllers/posts/export"
import { Roles } from "@prisma/client"
import threadsController from "../controllers/threads/export"
import commentController from "../controllers/comments/export"
const Router = express.Router()
// user routes
Router.post("/auth/register", usersController.register)
Router.post("/auth/login", usersController.login)
// must add deleting and editing user
// category routes
Router.route("/category")
  .post(
    authMiddleware,
    roleMiddleware(Roles.Admin),
    categoryController.add_category
  )
  .get(authMiddleware, categoryController.get_categories)

Router.route("/category/:id")
  .put(
    authMiddleware,
    roleMiddleware(Roles.Admin),
    categoryController.edit_category
  )
  .delete(
    authMiddleware,
    roleMiddleware(Roles.Admin),
    categoryController.delete_category
  )
// threads routes
Router.route("/threads")
  .post(authMiddleware, threadsController.add_thread)
  .get(authMiddleware, threadsController.get_threads)
Router.route("/threads/:id")
  .put(authMiddleware, threadsController.edit_thread)
  .delete(authMiddleware, threadsController.delete_thread)
  .get(authMiddleware, threadsController.get_single_thread)
// posts routes
Router.route("/posts")
  .post(authMiddleware, postController.add_post)
  .get(authMiddleware, postController.get_posts)
Router.route("/posts/:id")
  .delete(authMiddleware, postController.delete_post)
  .put(authMiddleware, postController.edit_post)
export default Router
// comment controller
Router.route("/comments")
  .post(authMiddleware, commentController.add_coment)
  .get(authMiddleware, commentController.get_user_comments)
Router.route("/comments/:id").put(
  authMiddleware,
  commentController.edit_comment
)
