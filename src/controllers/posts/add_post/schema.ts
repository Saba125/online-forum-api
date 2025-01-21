import Joi from "joi"
const postSchema = Joi.object({
  content: Joi.string().required(),
  threadId: Joi.number().required(),
  authorId: Joi.number().required(),
})
export default postSchema
