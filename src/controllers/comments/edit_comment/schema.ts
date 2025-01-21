import Joi from "joi"
const editCommentSchema = Joi.object({
  content: Joi.string().optional(),
  authorId: Joi.number().optional(),
  postId: Joi.number().optional(),
})
export default editCommentSchema
