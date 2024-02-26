import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../postsSLice";

const PostSettings = ({ id }) => {
  const dispatch = useDispatch();
  const post = useSelector((state) =>
    state.posts.find((post) => post.id === id)
  );

  const handleDeletePost = () => {
    dispatch(deletePost(post.id));
  };

  return (
    <ul className="text-nowrap capitalize">
      <li className="hover:text-white transition mb-2">edit post</li>
      <li className="hover:text-white transition" onClick={handleDeletePost}>
        delete post
      </li>
    </ul>
  );
};

export default PostSettings;
