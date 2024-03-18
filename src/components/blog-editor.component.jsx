import React, { useRef } from "react";
import { Link } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import defaultBanner from "../imgs/blog banner.png";
import { uploadImage } from "../common/upload_img";
import toast, { Toaster } from "react-hot-toast";
import { useEditorContext } from "../pages/editor";
export default function BlogEditor() {
  const {
    blog,
    blog: { title, banner, content, tags, des },
    setBlog
  } = useEditorContext();
  console.log(blog);
  const handleBannerUpload = (e) => {
    const img = e.target.files[0];
    if (img) {
      let loadingToast = toast.loading("Uploading...");
      uploadImage(img)
        .then((imageUrl) => {
          toast.dismiss(loadingToast);
          loadingToast = toast.success("Uploaded success!");
          setBlog({ ...blog, banner: imageUrl });
        })
        .catch((error) => {
          toast.dismiss(loadingToast);
          return toast.error(error);
        });
    }
  };
  const handleTitleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };
  const handleTitleChange = (e) => {
    let input = e.target;
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";
    setBlog({ ...blog, title: input.value });
  };
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="flex-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.0"
            width="100.000000pt"
            height="36.000000pt"
            viewBox="0 0 462.000000 136.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,136.000000) scale(0.100000,-0.100000)"
              fill="#000000"
              stroke="none"
            >
              <path d="M558 1042 l-218 -126 0 -250 c0 -138 4 -256 8 -261 10 -15 428 -255 443 -255 6 0 110 57 230 126 l219 126 0 258 0 258 -219 126 c-120 69 -225 126 -232 125 -8 0 -112 -57 -231 -127z m432 -35 l195 -113 0 -234 0 -234 -197 -114 -198 -114 -197 115 -198 115 0 232 0 233 195 113 c107 62 197 113 200 113 3 1 93 -50 200 -112z" />
              <path d="M805 858 c-5 -15 -75 -390 -75 -401 0 -5 10 -7 22 -5 21 3 26 17 60 193 20 105 37 198 37 208 1 20 -37 24 -44 5z" />
              <path d="M588 752 c-107 -57 -108 -57 -108 -94 0 -36 1 -37 110 -96 60 -33 112 -57 115 -54 3 3 5 19 5 36 0 29 -6 34 -82 73 l-83 41 80 38 c77 38 80 40 83 77 2 20 0 37 -5 37 -4 0 -56 -26 -115 -58z" />
              <path d="M880 773 c0 -38 1 -39 77 -77 l78 -38 -78 -39 -77 -39 0 -41 0 -41 33 20 c17 10 67 38 110 61 72 40 77 45 77 75 0 40 1 39 -122 105 l-98 52 0 -38z" />
              <path d="M3325 766 c-41 -18 -83 -69 -91 -111 -24 -128 122 -233 226 -162 76 51 98 124 61 201 -35 72 -122 104 -196 72z m135 -46 c76 -54 55 -180 -35 -210 -47 -15 -89 -5 -125 31 -61 61 -44 154 34 190 47 22 84 19 126 -11z" />
              <path d="M3355 710 c-80 -32 -77 -147 4 -171 79 -24 141 50 106 125 -20 41 -70 63 -110 46z m75 -45 c17 -21 16 -64 -3 -82 -18 -19 -61 -20 -82 -3 -21 17 -19 76 3 89 25 15 68 13 82 -4z" />
              <path d="M1387 763 c-4 -3 -7 -69 -7 -145 l0 -138 155 0 155 0 0 50 0 50 -120 0 c-113 0 -120 -1 -120 -20 0 -19 7 -20 105 -20 87 0 105 -3 105 -15 0 -12 -20 -15 -120 -15 l-120 0 0 110 0 110 120 0 c100 0 120 -2 120 -15 0 -12 -18 -15 -105 -15 l-105 0 0 -45 0 -45 95 0 c78 0 95 3 95 15 0 12 -16 15 -80 15 -64 0 -80 3 -80 15 0 12 18 15 105 15 l105 0 0 50 0 50 -148 0 c-82 0 -152 -3 -155 -7z" />
              <path d="M1850 657 c-35 -61 -73 -127 -83 -144 l-19 -33 55 0 55 0 52 90 c28 50 55 90 58 90 9 0 82 -125 82 -139 0 -23 -21 -9 -47 32 -15 23 -29 44 -30 46 -2 3 -8 0 -14 -6 -8 -8 -3 -25 17 -62 l29 -51 53 0 c28 0 52 3 52 6 0 5 -92 167 -127 223 -15 24 -16 23 -80 -88 -37 -63 -72 -111 -80 -111 -20 0 -15 12 51 124 81 138 80 136 59 136 -12 0 -38 -36 -83 -113z" />
              <path d="M2224 761 c-29 -12 -54 -50 -54 -79 0 -12 11 -34 25 -47 22 -23 31 -25 123 -25 85 0 101 -3 116 -19 23 -25 17 -52 -14 -68 -26 -13 -166 -18 -194 -7 -38 15 -9 23 87 26 83 2 102 6 102 18 0 12 -22 15 -122 18 l-123 3 0 -28 c0 -15 7 -37 16 -48 13 -18 27 -20 135 -20 115 0 122 1 140 24 26 32 24 77 -6 106 -22 23 -31 25 -124 25 -95 0 -101 1 -116 24 -19 28 -11 54 19 62 41 10 209 0 214 -13 3 -10 -22 -13 -102 -13 -88 0 -106 -3 -106 -15 0 -12 20 -15 120 -15 l120 0 0 28 c0 57 -18 67 -132 69 -57 2 -113 -1 -124 -6z" />
              <path d="M2549 753 c5 -10 30 -47 55 -82 43 -61 46 -69 46 -128 l0 -63 45 0 45 0 0 63 c0 60 3 68 49 135 27 39 52 76 56 81 4 7 -13 11 -49 11 -54 0 -57 -1 -86 -42 -30 -42 -38 -68 -20 -68 5 0 20 16 32 35 13 19 31 35 41 35 23 0 22 -3 -18 -59 -30 -42 -35 -56 -35 -105 0 -43 -3 -56 -15 -56 -12 0 -15 13 -15 56 0 49 -5 63 -36 106 -37 50 -39 72 -4 50 23 -14 34 -1 25 28 -5 17 -15 20 -66 20 -54 0 -59 -2 -50 -17z" />
              <path d="M2995 763 c-96 -24 -135 -154 -69 -232 32 -39 77 -51 187 -51 l87 0 0 50 c0 37 -4 50 -14 50 -9 0 -16 -12 -18 -32 l-3 -33 -82 0 c-95 0 -129 18 -152 78 -12 32 -11 40 5 74 25 51 54 63 152 63 66 0 82 -3 82 -15 0 -12 -16 -15 -84 -15 -102 0 -130 -16 -130 -74 0 -58 29 -79 111 -80 56 -1 68 2 71 16 3 14 -7 18 -64 20 -54 2 -69 7 -80 23 -12 18 -11 24 2 43 14 20 24 22 110 22 l94 0 0 50 0 50 -92 -1 c-51 -1 -102 -4 -113 -6z" />
              <path d="M3580 751 c0 -20 5 -21 104 -21 89 0 107 -3 129 -20 36 -29 50 -83 32 -126 -22 -53 -56 -68 -149 -69 l-81 0 -3 78 -3 77 79 0 c82 0 102 -9 102 -45 0 -32 -20 -45 -66 -45 -41 0 -43 1 -46 33 -2 20 -8 32 -18 32 -11 0 -15 -12 -15 -50 l0 -50 67 0 c81 0 112 22 112 79 0 64 -22 76 -141 76 l-103 0 0 -110 0 -110 98 0 c107 0 150 14 185 61 28 38 32 106 10 149 -30 56 -72 74 -190 78 -99 4 -103 4 -103 -17z" />
              <path d="M3930 625 l0 -145 155 0 155 0 0 50 0 50 -126 0 c-114 0 -125 -2 -122 -17 3 -16 18 -18 111 -21 80 -2 107 -6 104 -15 -2 -8 -38 -12 -123 -12 l-119 0 -3 108 -3 107 126 0 c104 0 125 -2 125 -15 0 -12 -19 -15 -110 -15 l-110 0 0 -45 0 -45 95 0 c78 0 95 3 95 15 0 12 -15 15 -75 15 -60 0 -75 3 -75 15 0 12 18 15 105 15 l105 0 0 50 0 50 -155 0 -155 0 0 -145z" />
            </g>
          </svg>
        </Link>
        <p className="max-md:hidden text-black line-clamp-1 w-full">
          {title.length ? title : "New Blog"}
        </p>

        <div className="flex gap-4 ml-auto">
          <button className="btn-dark py-2">Publish</button>
          <button className="btn-light py-2">Save Draft</button>
        </div>
      </nav>
      <Toaster />
      <AnimationWrapper>
        <section>
          <div className="mx-auto max-w-[900px] w-full">
            <div className="relative aspect-video bg-white border-4 border-grey hover:opacity-80 ">
              <label htmlFor="uploadBanner">
                <img
                  src={banner.length ? banner : defaultBanner}
                  alt="Default Banner"
                  className="z-20 hover:cursor-pointer"
                />
                <input
                  id="uploadBanner"
                  type="file"
                  accept=".png, .jpeg, .jpg"
                  hidden
                  onChange={handleBannerUpload}
                />
              </label>
            </div>
            <textarea
              placeholder="Blog Title"
              className="text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-80"
              onKeyDown={handleTitleKeyDown}
              onChange={handleTitleChange}
            />
            <hr className="w-full opacity-10" />
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
}
