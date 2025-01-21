import Utils from "../../../utils/index"
import db from "../../../db/index"
import { Request, Response } from "express"
export default async function get_threads(req: Request, res: Response) {
  const { search, categoryId, authorId, startDate, endDate, sortBy, order } =
    req.query
  const filters: any = {}
  console.log(categoryId)
  if (search) {
    filters.OR = [
      { title: { contains: search as string, mode: "insensitive" } },
      { content: { contains: search as string, mode: "insensitive" } },
    ]
  }
  if (categoryId) filters.categoryId = Number(categoryId)

  if (authorId) filters.authorId = Number(authorId)
  const threads = await db.thread.findMany({
    where: filters,
    include: {
      author: { select: { id: true, email: true } },
      category: { select: { id: true, name: true } },
    },
  })
  return Utils.sendSuccess(res, {
    threads,
  })
}
