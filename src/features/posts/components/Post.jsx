import PostSettings from "./PostSettings";
import { useState } from "react";

const Post = ({ post }) => {
  const [isPostSettingDisplayed, setIsPostSettingDisplayed] = useState(false);

  const displayPostSettings = () => {
    setIsPostSettingDisplayed((prev) => !prev);
  };

  return (
    <li className="bg-white p-5 rounded-lg">
      <header className="flex justify-between items-center">
        <span className="font-semibold text-lg">{post.name}</span>
        <div className="cursor-pointer relative" onClick={displayPostSettings}>
          <span className="block bg-black w-1 aspect-square rounded-full mb-0.5"></span>
          <span className="block bg-black w-1 aspect-square rounded-full mb-0.5"></span>
          <span className="block bg-black w-1 aspect-square rounded-full mb-0.5"></span>

          <div
            className={`absolute right-0 top-full bg-primary p-5 rounded-lg ${
              isPostSettingDisplayed ? "opacity-100" : "opacity-0"
            } transition-all duration-300`}
          >
            <PostSettings id={post.id} />
          </div>
        </div>
      </header>
      <p className="mt-5 mb-2">{post.description}</p>
      <img
        src={post.imageUrl}
        className="max-w-[300px] object-cover"
        alt={`this is the post image of ${post.name}`}
      />
    </li>
  );
};

export default Post;
