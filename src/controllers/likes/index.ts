import Utils from "../../utils/index"
import db from "../../db/index"
import { Request, Response } from "express"
export default async function like(req: Request, res: Response) {
  const user: any = req.user
  const body = req.body
  const hasLiked = await db.like.findFirst({
    where: {
      authorId: user.id,
      postId: body.postId,
    },
  })
  if (hasLiked) {
    await db.like.delete({
      where: {
        id: body.id,
      },
    })
  } else {
    await db.like.create({
      data: {
        authorId: user.id,
        postId: body.postId,
      },
    })
  }
}
