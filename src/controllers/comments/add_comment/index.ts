import Utils from "../../../utils/index"
import db from "../../../db/index"
import { Request, Response } from "express"
import commentSchema from "./schema"
export default async function add_coment(req: Request, res: Response) {
  const { error } = commentSchema.validate(req.body)
  const body = req.body
  const user: any = req.user
  if (error) {
    Utils.sendError(res, {
      status: "message",
      message: error.details.map((item) => item.message),
    })
    return
  }
  const comment = await db.comment.create({
    data: {
      postId: body.postId,
      content: body.content,
      authorId: user.id,
    },
  })
  return Utils.sendSuccess(res, {
    comment,
  })
}
