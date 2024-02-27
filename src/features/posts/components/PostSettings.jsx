const PostSettings = ({ setIsPostEditting, showConfimationDialog }) => {
  const handleEditPost = () => {
    setIsPostEditting((prev) => !prev);
  };

  return (
    <ul className="text-nowrap capitalize">
      <li className="hover:text-white transition mb-2" onClick={handleEditPost}>
        edit post
      </li>
      <li
        className="hover:text-white transition"
        onClick={showConfimationDialog}
      >
        delete post
      </li>
    </ul>
  );
};

export default PostSettings;
