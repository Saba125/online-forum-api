import Utils from "../../../utils/index"
import db from "../../../db/index"
import { Request, Response } from "express"
export default async function delete_thread(req: Request, res: Response) {
  const id = parseInt(req.params.id)
  const user: any = req.user
  const currentThread = await db.thread.findUnique({ where: { id } })
  if (!currentThread) {
    Utils.sendError(res, {
      status: "error",
      message: "Provided id is incorrect",
    })
    return
  }
  if (currentThread.authorId !== user.id) {
    Utils.sendError(res, {
      status: "error",
      message: "You are only allowed to edit your thread",
    })
  }
  const thread = await db.thread.delete({ where: { id } })
  return Utils.sendSuccess(res, {
    thread: id,
    msg: "Deleted",
  })
}
