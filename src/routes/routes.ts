import express from "express"
import usersController from "../controllers/auth/export"
import authMiddleware from "../middlewares/auth"
import categoryController from "../controllers/categories/export"
import roleMiddleware from "../middlewares/permission"
import { Roles } from "@prisma/client"
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

Router.route("/category/:id").put(
  authMiddleware,
  roleMiddleware(Roles.Admin),
  categoryController.edit_category
)

export default Router
