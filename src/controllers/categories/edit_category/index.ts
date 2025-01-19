import Utils from "../../../utils/index"
import db from "../../../db/index"
import { Request, Response } from "express"
import editCategorySchema from "./schema"
export default async function edit_category(req: Request, res: Response) {
  const { error } = editCategorySchema.validate(req.body)
  if (error) {
    Utils.sendError(res, {
      status: "error",
      message: error.details.map((item) => item.message),
    })
    return
  }
  const id = parseInt(req.params.id)
  const category = await db.category.update({
    where: {
      id,
    },
    data: {
      name: req.body.name,
    },
  })
  return Utils.sendSuccess(res, {
    category,
  })
}
