import add_coment from "./add_comment"
import delete_comment from "./delete_comment"
import edit_comment from "./edit_comment"
import get_single_comment from "./get_single_comment"
import get_user_comments from "./get_user_comments"
const commentController = {
  add_coment,
  get_user_comments,
  edit_comment,
  delete_comment,
  get_single_comment,
}
export default commentController
