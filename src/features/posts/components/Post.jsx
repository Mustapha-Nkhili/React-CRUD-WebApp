import { useState } from "react";
import { useDispatch } from "react-redux";
import { editPost } from "../postsSLice";
import PostSettings from "./PostSettings";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const [isPostSettingDisplayed, setIsPostSettingDisplayed] = useState(false);
  const [editedPost, setEditedPost] = useState(post);
  const [isPostEditting, setIsPostEditting] = useState(false);

  const displayPostSettings = () => {
    setIsPostSettingDisplayed((prev) => !prev);
  };
  const handleEditedPostChanges = (e) => {
    const { name, value, type } = e.target;

    if (type !== "file") {
      setEditedPost((prev) => ({ ...prev, [name]: value }));
    } else {
      const file = e.target.files[0];

      const reader = new FileReader();

      reader.addEventListener("load", (e) => {
        setEditedPost((prev) => ({ ...prev, imageUrl: e.target.result }));
      });

      reader.readAsDataURL(file);
    }
  };

  const saveChanges = () => {
    dispatch(editPost(editedPost));
    setIsPostEditting(false);
  };

  return (
    <li className="bg-white p-5 rounded-lg w-[300px] max-w-full">
      <header className="flex justify-between items-center">
        {!isPostEditting ? (
          <span className="font-semibold text-lg">{post.name}</span>
        ) : (
          <input
            type="text"
            className="bg-transparent border-b border-primary outline-none"
            name="name"
            placeholder="Enter the new post name"
            onChange={handleEditedPostChanges}
            value={editedPost.name}
          />
        )}
        <div className="cursor-pointer relative" onClick={displayPostSettings}>
          <span className="block bg-black w-1 aspect-square rounded-full mb-0.5"></span>
          <span className="block bg-black w-1 aspect-square rounded-full mb-0.5"></span>
          <span className="block bg-black w-1 aspect-square rounded-full mb-0.5"></span>

          <div
            className={`absolute top-full bg-primary p-5 rounded-lg ${
              isPostSettingDisplayed
                ? "opacity-100 right-0"
                : "opacity-0 -right-[100px]"
            } transition-all duration-300`}
          >
            <PostSettings id={post.id} setIsPostEditting={setIsPostEditting} />
          </div>
        </div>
      </header>
      {!isPostEditting ? (
        <p className="mt-5 mb-2 text-justify">{post.description}</p>
      ) : (
        <textarea
          className="bg-transparent border-b border-primary outline-none mb-2 w-full"
          name="description"
          placeholder="Enter the new post description"
          rows={4}
          value={editedPost.description}
          onChange={handleEditedPostChanges}
        />
      )}
      <div className="flex items-center justify-center w-full">
        <img
          src={!isPostEditting ? post.imageUrl : editedPost.imageUrl}
          className="w-full object-cover"
          alt={`this is the post image of ${post.name}`}
        />
        {isPostEditting && (
          <input
            type="file"
            className="mt-5"
            onChange={handleEditedPostChanges}
          />
        )}
      </div>
      {isPostEditting && (
        <button
          className="capitalize bg-primary rounded-md px-2 py-1 text-white transition-all m-auto block active:scale-75"
          onClick={saveChanges}
        >
          save changes
        </button>
      )}
    </li>
  );
};

export default Post;
