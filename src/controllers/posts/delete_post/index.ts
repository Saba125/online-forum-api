import Utils from "../../../utils/index"
import db from "../../../db/index"
import { Request, Response } from "express"
export default async function delete_post(req: Request, res: Response) {
  const id = parseInt(req.params.id)
  const user: any = req.user
  const currentPost = await db.post.findUnique({ where: { id } })
  if (currentPost?.authorId !== user.id) {
    Utils.sendError(res, {
      status: "error",
      message: "You can only delete your post",
    })
    return
  }
  await db.post.delete({ where: { id } })
  return Utils.sendSuccess(res, {
    id,
    msg: "Post deleted",
  })
}
