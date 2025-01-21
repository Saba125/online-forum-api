import Utils from "../../../utils/index"
import db from "../../../db/index"
import { Request, Response } from "express"
import editPostSchema from "./schema"
export default async function edit_post(req: Request, res: Response) {
  const id = parseInt(req.params.id)
  const user: any = req.user
  const { error } = editPostSchema.validate(req.body)
  if (error) {
    Utils.sendSuccess(res, {
      status: "message",
      message: error.details.map((item) => item.message),
    })
    return
  }
  const currentPost = await db.post.findUnique({ where: { id } })
  if (currentPost?.authorId !== user.id) {
    Utils.sendError(res, {
      status: "error",
      message: "You can only edit your post",
    })
    return
  }
  const post = await db.post.update({
    where: { id },
    data: {
      ...req.body,
    },
  })
  return Utils.sendSuccess(res, {
    post,
  })
}
