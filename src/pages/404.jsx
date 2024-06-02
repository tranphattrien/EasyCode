import React from "react";
import pageNotFoundImage from "../Assets/imgs/404.png";
import { Link } from "react-router-dom";
export default function PageNotFound() {
  return (
    <section className="h-cover relative p-10 flex - flex-col items-center gap-10 text-center">
      <img
        src={pageNotFoundImage}
        alt="Page not found image"
        className="select-none w-72 aspect-square object-cover rounded"
      />
      <h1 className="text-4xl font-gelasio leading-7">
        Sorry, we couldn't find this page.
      </h1>
      <p className="text-dark-grey text-xl leading-7">
        But don't worry, you can find plenty of other things on our homepage.
      </p>
      <Link to="/" className="btn-dark">
        Back to home page
      </Link>
    </section>
  );
}
