import { useState } from "react";
import AddPostForm from "./features/posts/components/AddPostForm";
import Post from "./features/posts/components/Post";
import { useSelector } from "react-redux";

const App = () => {
  const posts = useSelector((state) => state.posts);
  const [isPostAdding, setIsPostAdding] = useState(false);

  const handleAddPostBtnClicked = () => {
    setIsPostAdding((prev) => !prev);
  };

  return (
    <div className="w-[700px] max-w-[100%] m-auto flex items-center justify-center flex-col min-h-screen p-5">
      <button
        onClick={handleAddPostBtnClicked}
        className="block m-auto bg-white rounded-md p-2 font-semibold text-sm capitalize transition active:scale-75"
      >
        + add post
      </button>
      <div
        className={`absolute -translate-y-2/4 -translate-x-2/4 z-50 bg-white rounded-lg flex flex-col p-5 top-2/4 w-[400px] max-w-full transition-all duration-300 ${
          isPostAdding ? "left-2/4" : "-left-[100%]"
        }`}
      >
        <AddPostForm setIsPostAdding={setIsPostAdding} />
      </div>
      <main>
        <ul className="flex flex-col gap-5 mt-10">
          {posts.map((post, index) => {
            return <Post key={post?.imageUrl + index} post={post} />;
          })}
        </ul>
      </main>
    </div>
  );
};

export default App;
