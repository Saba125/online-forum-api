import Utils from "../../../utils/index"
import db from "../../../db/index"
import { Request, Response } from "express"
export default async function delete_category(req: Request, res: Response) {
  const id = parseInt(req.params.id)
  const category = await db.category.delete({ where: { id } })
  return Utils.sendSuccess(res, {
    msg: "Deleted",
    categoryId: category.id,
  })
}
