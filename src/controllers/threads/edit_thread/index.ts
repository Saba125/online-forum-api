import Utils from "../../../utils/index"
import db from "../../../db/index"
import { Request, Response } from "express"
import threadsSchema from "./schema"
export default async function edit_thread(req: Request, res: Response) {
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
  const thread = await db.thread.update({
    where: { id },
    data: {
      ...req.body,
    },
  })
  return Utils.sendSuccess(res, {
    thread,
  })
}
