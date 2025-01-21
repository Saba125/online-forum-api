import Utils from "../../../utils/index"
import db from "../../../db/index"
import { Request, Response } from "express"
export default async function get_user_comments(req: Request, res: Response) {
  const user: any = req.user
  const comments = await db.comment.findMany({
    where: {
      authorId: user.id,
    },
  })
  if (!comments) {
    Utils.sendSuccess(res, {
      status: "error",
      message: "You dont have any comments",
    })
    return
  }
  return Utils.sendSuccess(res, {
    comments,
  })
}
