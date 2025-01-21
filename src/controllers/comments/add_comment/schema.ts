import Joi from "joi"
const commentSchema = Joi.object({
  content: Joi.string().required(),
  authorId: Joi.number().required(),
  postId: Joi.number().required(),
})
export default commentSchema
