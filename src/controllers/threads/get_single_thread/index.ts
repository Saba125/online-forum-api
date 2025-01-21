import Utils from "../../../utils/index"
import db from "../../../db/index"
import { Request, Response } from "express"
export default async function get_single_thread(req: Request, res: Response) {
  const id = parseInt(req.params.id)
  const thread = await db.thread.findUnique({ where: { id } })
  return Utils.sendSuccess(res, {
    thread,
  })
}
