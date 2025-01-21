import Utils from "../../../utils/index"
import db from "../../../db/index"
import { Request, Response } from "express"
import postSchema from "./schema"
export default async function add_post(req: Request, res: Response) {
  const { error } = postSchema.validate(req.body)
  const body = req.body
  const user: any = req.user
  if (error) {
    Utils.sendError(res, {
      status: "error",
      message: error.details.map((item) => item.message),
    })
    return
  }

  const post = await db.post.create({
    data: {
      authorId: user.id,
      threadId: body.threadId,
      content: body.content,
    },
  })
  return Utils.sendSuccess(res, {
    post,
  })
}
