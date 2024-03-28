import { useEffect, useState } from "react";
import AnimationWrapper from "../common/page-animation";
import InpageNavigation from "../components/inpage-navigation.component";
import axios from "axios";
import Loader from "../components/loader.component";
import BlogPostCard from "../components/blog-post.component";
export default function HomePage() {
  const [blogs, setBlogs] = useState(null);
  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_SERVER_DOMAIN + "/latest-blogs"
        );
        setBlogs(response.data.blogs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLatestBlogs();
  }, []);

  return (
    <AnimationWrapper>
      <section className="h-cover flex justify-center gap-10">
        {/* LATEST BLOGS */}
        <div className="w-full">
          <InpageNavigation
            routes={["home", "trending blogs"]}
            defaultHidden={["trending blogs"]}
          >
            <>
              {blogs == null ? (
                <Loader />
              ) : (
                blogs.map((blog, i) => {
                  return (
                    <AnimationWrapper
                      transition={{ duration: 1, delay: i * 0.1 }}
                      key={i}
                    >
                      <BlogPostCard
                        content={blog}
                        author={blog.author.personal_info}
                      />
                    </AnimationWrapper>
                  );
                })
              )}
            </>

            <h1>Trending Blogs Here</h1>
          </InpageNavigation>
        </div>

        {/* FILTERS AND TRENDING BLOGS */}
        <div></div>
      </section>
    </AnimationWrapper>
  );
}
