import React from "react";
import { useEditorContext } from "../pages/editor";
import AnimationWrapper from "../common/page-animation";
import toast, { Toaster } from "react-hot-toast";
import Tag from "./tags.component";

export default function PublishForm() {
  const characterLimit = 200;
  const tagLimit = 10;
  let {
    blog,
    blog: { banner, title, tags, des },
    setEditorState,
    setBlog
  } = useEditorContext();
  const handleCloseEvent = () => {
    setEditorState("editor");
  };
  const handleBlogTitleChange = (e) => {
    let input = e.target;
    setBlog({ ...blog, title: input.value });
  };
  const handleBlogDesChange = (e) => {
    let input = e.target;
    setBlog({ ...blog, des: input.value });
  };
  const handleDesKeyDown = (e) => {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  };
  const handleTagKeyDown = (e) => {
    if (e.keyCode == 13 || e.keyCode == 188) {
      e.preventDefault();
      let tag = e.target.value;

      if (tags.length < tagLimit) {
        if (!tags.includes(tag) && tag.length) {
          setBlog({ ...blog, tags: [...tags, tag] });
        }
      } else {
        toast.error(`You can only add max ${tagLimit} tags !`);
      }
      e.target.value = "";
    }
  };
  return (
    <AnimationWrapper>
      <section className="w-screen min-h-screen grid items-center lg:grid-cols-2 py-16 lg:gap-4">
        <Toaster />

        <button
          className="w-12 h-12 absolute right-[5vw] z-10 top-[2%]"
          onClick={handleCloseEvent}
        >
          <i className="fi fi-br-cross"></i>
        </button>

        <div className="lg:max-w-[550px] center">
          <p className="text-dark-grey mb-1">Preview</p>

          <div className="w-full aspect-video rounded-lg overflow-hidden bg-grey mt-4">
            <img src={banner} alt="Banner of blog" />
          </div>
          <h1 className="text-4xl font-medium mt-2 leading-tight line-clamp-1">
            {title}
          </h1>
          <p className="font-gelasio line-clamp-2 text-xl leading-7 mt-4">
            {des}
          </p>
        </div>

        <div className="border-grey lg:border-1 lg:pl-8">
          <p className="text-dark-grey mb-2 mt-9">Blog Title</p>
          <input
            className="input-box pl-4"
            type="text"
            placeholder="Blog Title"
            defaultValue={title}
            onChange={handleBlogTitleChange}
          />

          <p className="text-dark-grey mb-2 mt-9">
            Short description about your blog
          </p>

          <textarea
            className="h-40 resize-none leading-7 input-box pl-4"
            maxLength={characterLimit}
            defaultValue={des}
            onChange={handleBlogDesChange}
            onKeyDown={handleDesKeyDown}
          ></textarea>

          <p className="mt-1 text-dark-grey text-sm text-right">
            {characterLimit - des.length} characters left
          </p>

          <p className="text-dark-grey mb-2 mt-9">
            Topics - ( Helps is searching and ranking your blog post )
          </p>
          <div className="relative input-box pl-2 py-2 pb-4">
            <input
              className="stick input-box bg-white top-0 pl-4 mb-3 focus:bg-white"
              type="text"
              placeholder="Topic"
              onKeyDown={handleTagKeyDown}
            />
            {tags.map((tag, i) => (
              <Tag tag={tag} tagIndex={i} key={i} />
            ))}
          </div>
          <p className="mt-1 mb-4 text-dark-grey text-sm text-right">
            {tagLimit - tags.length} tags left
          </p>
          <button className="btn-dark px-8">Publish</button>
        </div>
      </section>
    </AnimationWrapper>
  );
}
