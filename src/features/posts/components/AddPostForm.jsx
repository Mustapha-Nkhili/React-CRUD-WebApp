import { useState } from "react";
import vanImgPlaceholder from "../../../assets/van-img-placeholder.png";

const AddPostForm = () => {
  const [newPost, setNewPost] = useState({
    imageUrl: null,
    name: "",
    description: "",
  });
  const [imgTypeError, setImgTypeError] = useState(null);

  const onPostImgSelected = (e) => {
    const file = e.target.files[0];
    setImgTypeError(null);

    const reader = new FileReader();

    reader.addEventListener("load", (e) => {
      setNewPost((prev) => ({ ...prev, imageUrl: e.target.result }));
    });

    reader.addEventListener("error", (e) => {
      setImgTypeError(true);
      console.error("Error occurred while reading the file:", e.target.error);
    });

    reader.readAsDataURL(file);
  };

  const handleFormChanges = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const type = e.target.type;

    if (type !== "file") {
      setNewPost((prev) => ({ ...prev, [name]: value }));
    } else {
      onPostImgSelected(e);
    }
  };

  console.log(newPost);

  const handleAddPost = () => {

  };

  return (
    <>
      <h2 className="font-bold text-2xl text-center capitalize font-palanquin mb-5">
        Add New post
      </h2>
      <form className="flex flex-col gap-4">
        <label className="block w-[250px] m-auto border-2 border-dashed border-[#D1D5DB] p-5 rounded-md cursor-pointer text-center mb-5">
          <div
            className="w-[70px] aspect-square max-w-full border border-[#486898] bg-[#F0F5FB] overflow-hidden rounded-full p-[15px] m-auto mb-5"
            style={{ padding: newPost.imageUrl && "0px" }}
          >
            <img
              src={newPost.imageUrl ? newPost.imageUrl : vanImgPlaceholder}
              className="object-cover max-w-full"
              style={newPost.imageUrl && { width: "100%", height: "100%" }}
              alt="this is the van img placeholder picture"
            />
          </div>
          <p className="font-semibold mb-1">Click to upload image</p>
          <span className="text-sm text-[#95928f]">
            JPG, PNG, SVG (2MB max)
          </span>
          {imgTypeError && (
            <span className="img-type-error">
              Sorry, we couldn't process your file. It appears that the file you
              uploaded is not an image or its format is not supported.
            </span>
          )}
          <input
            type="file"
            name="img"
            id="vanImgInput"
            accept=".png, .jpg, .jpeg, .svg"
            className="hidden"
            onChange={handleFormChanges}
          />
        </label>

        <input
          type="text"
          name="name"
          id="postName"
          placeholder="Enter post name"
          className="py-3 px-2 bg-transparent border border-[#D1D5DB] rounded-lg outline-none"
          onChange={handleFormChanges}
        />

        <textarea
          name="description"
          id="postDescription"
          placeholder="Enter post description"
          className="py-3 px-2 bg-transparent border border-[#D1D5DB] rounded-lg outline-none"
          value={newPost.description}
          onChange={handleFormChanges}
        ></textarea>

        <button
          onClick={handleAddPost}
          className="w-fit p-3 bg-primary rounded-3xl text-white m-auto font-semibold"
        >
          Add New post
        </button>
      </form>
    </>
  );
};

export default AddPostForm;
