import { useState } from "react";
import AddPostForm from "./features/posts/components/AddPostForm";

const App = () => {
  const [isPostAdding, setIsPostAdding] = useState(false);

  const handleAddPostBtnClicked = () => {
    setIsPostAdding((prev) => !prev);
  };

  return (
    <div className="w-[700px] m-auto flex items-center justify-center flex-col min-h-screen">
      <button
        onClick={handleAddPostBtnClicked}
        className="block m-auto bg-white rounded-md p-2 font-semibold text-sm capitalize transition active:scale-75"
      >
        + add post
      </button>
      {isPostAdding && <AddPostForm />}
    </div>
  );
};

export default App;
