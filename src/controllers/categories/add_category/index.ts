import Utils from "../../../utils/index"
import db from "../../../db/index"
import { Request, Response } from "express"
import addCategorySchema from "./schema"
export default async function add_category(req: Request, res: Response) {
  const { error } = addCategorySchema.validate(req.body)
  if (error) {
    Utils.sendError(res, {
      status: "error",
      message: error.details.map((item) => item.message),
    })
    return
  }
  const category = await db.category.create({
    data: {
      name: req.body.name,
    },
  })
  return Utils.sendSuccess(res, {
    category,
  })
}
