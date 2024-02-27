import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../postsSLice";

const ConfirmationDialog = ({ id, setIsPostDeletting }) => {
  const dispatch = useDispatch();
  const post = useSelector((state) =>
    state.posts.find((post) => post.id === id)
  );

  const handleDeletePost = () => {
    dispatch(deletePost(post.id));
  };

  const handleCancel = () => {
    setIsPostDeletting(false);
  };

  return (
    <div className="fixed top-2/4 -translate-x-2/4 -translate-y-2/4 left-2/4 z-50 bg-primary px-5 py-16 rounded-md">
      <h4 className="text-2xl font-bold capitalize mb-2">delete Post</h4>
      <p>Are you sure you want to delete the post ?</p>
      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          onClick={handleCancel}
          className="p-2 bg-white rounded-md capitalize font-semibold transition-all active:scale-75"
        >
          cancel
        </button>
        <button
          onClick={handleDeletePost}
          className="p-2 bg-red-500 text-white rounded-md capitalize font-semibold transition-all active:scale-75"
        >
          delete
        </button>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
