import Utils from "../../../utils/index"
import db from "../../../db/index"
import { Request, Response } from "express"
export default async function get_categories(req: Request, res: Response) {
  const categories = await db.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })
  return Utils.sendSuccess(res, {
    categories,
  })
}
