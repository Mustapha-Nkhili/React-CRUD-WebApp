import { useRef, useState } from "react";
import vanImgPlaceholder from "../../../assets/van-img-placeholder.png";
import { addPost } from "../postsSLice";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

const AddPostForm = ({ setIsPostAdding }) => {
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const [newPost, setNewPost] = useState({
    imageUrl: null,
    name: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  const onPostImgSelected = (e) => {
    const file = e.target.files[0];
    setErrors((prev) => ({ ...prev, imgType: null }));

    const reader = new FileReader();

    reader.addEventListener("load", (e) => {
      setNewPost((prev) => ({ ...prev, imageUrl: e.target.result }));
    });

    reader.addEventListener("error", (e) => {
      setErrors((prev) => ({ ...prev, imgType: true }));
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

  const handleSubmitPost = (e) => {
    e.preventDefault();

    const errors = {};

    if (!newPost.name.trim()) {
      errors.name = "Name is required";
    }

    if (!newPost.description.trim()) {
      errors.description = "Description is required";
    }

    if (!newPost.imageUrl) {
      errors.img = "Img is required";
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      dispatch(addPost({ ...newPost, id: nanoid() }));
      formRef.current.reset();
      formRef.current.querySelector("textarea#postDescription").value = "";
      setIsPostAdding(false);
    }
  };

  return (
    <>
      <h2 className="font-bold text-2xl text-center capitalize font-palanquin mb-5">
        Add New post
      </h2>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmitPost}
        ref={formRef}
        method="post"
      >
        <label className="block w-[250px] m-auto border-2 border-dashed border-gray p-5 rounded-md cursor-pointer text-center">
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
          {errors.imgType && (
            <span className="block text-sm text-red-400">
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
        {errors.img && (
          <span className="block text-sm text-red-400 mb-5">{errors.img}</span>
        )}

        <input
          type="text"
          name="name"
          id="postName"
          placeholder="Enter post name"
          className="py-3 px-2 bg-transparent border border-gray rounded-lg outline-none"
          value={newPost.name}
          onChange={handleFormChanges}
        />
        {errors.name && (
          <span className="block text-sm text-red-400">{errors.name}</span>
        )}

        <textarea
          name="description"
          id="postDescription"
          placeholder="Enter post description"
          className="py-3 px-2 bg-transparent border border-gray rounded-lg outline-none"
          value={newPost.description}
          onChange={handleFormChanges}
        ></textarea>
        {errors.description && (
          <span className="block text-sm text-red-400">
            {errors.description}
          </span>
        )}

        <div className="flex gap-3 justify-center items-center">
          <button
            type="submit"
            className="w-fit p-3 bg-primary rounded-3xl text-white font-semibold transition-all duration-300 active:scale-75"
          >
            Add New post
          </button>

          <button
            type="button"
            className="w-fit py-3 px-5 bg-transparent border border-gray rounded-3xl text-black font-semibold transition hover:bg-red-500 hover:text-white"
            onClick={() => setIsPostAdding(false)}
          >
            cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default AddPostForm;
