import Utils from "../../../utils/index"
import db from "../../../db/index"
import { Request, Response } from "express"
export default async function get_posts(req: Request, res: Response) {
  const { search, threadId, authorId } = req.query
  const filters: any = {}
  if (search) {
    filters.OR = [
      { content: { contains: search as string, mode: "insensitive" } },
    ]
  }
  if (threadId) filters.threadId = Number(threadId)

  if (authorId) filters.authorId = Number(authorId)

  const posts = await db.post.findMany({
    where: filters,
    include: {
      author: { select: { id: true, email: true } },
      thread: { select: { id: true, title: true, content: true } },
    },
  })
  return Utils.sendSuccess(res, {
    posts,
  })
}
