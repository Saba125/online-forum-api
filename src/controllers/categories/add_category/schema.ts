import Joi from "joi"
const addCategorySchema = Joi.object({
  name: Joi.string().required(),
})
export default addCategorySchema
