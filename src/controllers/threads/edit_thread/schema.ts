import Joi from "joi"
const threadsSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryId: Joi.number().required(),
})
export default threadsSchema
