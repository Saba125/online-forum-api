import Joi from "joi"
const editPostSchema = Joi.object({
  content: Joi.string().optional(),
  threadId: Joi.number().optional(),
  authorId: Joi.number().optional(),
})
export default editPostSchema
