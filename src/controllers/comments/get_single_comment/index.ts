import Utils from "../../../utils/index"
import db from "../../../db/index"
import { Request, Response } from "express"
export default async function get_single_comment(req: Request, res: Response) {
  const id = parseInt(req.params.id)
  const comment = await db.comment.findUnique({ where: { id } })
  if (!comment) {
    return Utils.sendError(res, {
      status: "error",
      message: `Comment with id ${id} is not found`,
    })
  }
  return Utils.sendSuccess(res, comment)
}
