import Utils from "../../../utils/index"
import db from "../../../db/index"
import { Request, Response } from "express"
import editCommentSchema from "./schema"
export default async function edit_comment(req: Request, res: Response) {
  const id = parseInt(req.params.id)
  const user: any = req.user
  const body = req.body
  const { error } = editCommentSchema.validate(req.body)
  if (error) {
    Utils.sendError(res, {
      status: "error",
      message: error.details.map((item) => item.message),
    })
    return
  }
  const existingComment = await db.comment.findUnique({ where: { id } })
  if (!existingComment) {
    Utils.sendError(res, {
      status: "error",
      message: "Comment does not exist",
    })
    return
  }
  if (existingComment.authorId !== user.id) {
    Utils.sendError(res, {
      status: "error",
      message: "You can only edit your own comment",
    })
    return
  }
  const comment = await db.comment.update({
    where: { id },
    data: {
      content: body.content,
    },
  })
  return Utils.sendSuccess(res, {
    comment,
  })
}
