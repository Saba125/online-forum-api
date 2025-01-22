import Utils from "../../../utils/index"
import db from "../../../db/index"
import { Request, Response } from "express"
export default async function delete_comment(req: Request, res: Response) {
  const id = parseInt(req.params.id)
  const user: any = req.user
  const existingComment = await db.comment.findUnique({ where: { id } })
  if (!existingComment) {
    return Utils.sendError(res, {
      status: "error",
      message: `Comment not found`,
    })
  }
  if (existingComment.authorId !== user.id) {
    return Utils.sendError(res, {
      status: "error",
      message: `You can only delete your own comments`,
    })
  }
  const comment = await db.comment.delete({
    where: { id },
    select: { id: true },
  })
  return Utils.sendSuccess(res, {
    id: comment,
    message: "Deleted",
  })
}
