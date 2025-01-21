import Utils from "../../../utils/index"
import db from "../../../db/index"
import { Request, Response } from "express"
import threadsSchema from "./schema"
export default async function add_thread(req: Request, res: Response) {
  const { error } = threadsSchema.validate(req.body)
  const user: any = req.user
  const body = req.body
  if (error) {
    Utils.sendError(res, {
      status: "error",
      message: error.details.map((item) => item.message),
    })
    return
  }
  const thread = await db.thread.create({
    data: {
      title: body.title,
      content: body.content,
      categoryId: body.categoryId,
      authorId: user.id,
    },
  })
  return Utils.sendSuccess(res, {
    thread,
  })
}
