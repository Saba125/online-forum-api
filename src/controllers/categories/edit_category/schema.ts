import Joi from "joi"
const editCategorySchema = Joi.object({
  name: Joi.string().required(),
})
export default editCategorySchema
