import { useEffect, useState } from "react";
import AnimationWrapper from "../common/page-animation";
import InpageNavigation, {
  activeTabRef
} from "../components/inpage-navigation.component";
import axios from "axios";
import Loader from "../components/loader.component";
import BlogPostCard from "../components/blog-post.component";
import MinimalBlogPost from "../components/nobanner-blog-post.component";
export default function HomePage() {
  const [blogs, setBlogs] = useState(null);
  const [trendingBlogs, setTrendingBlogs] = useState(null);
  const [pageState, setPageState] = useState("home");
  const categories = [
    "data science",
    "technology",
    "self improvement",
    "machine learning",
    "politics",
    "travel",
    "social media",
    "finances"
  ];

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

  const fetchTredingBlogs = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_SERVER_DOMAIN + "/trending-blogs"
      );
      setTrendingBlogs(response.data.blogs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    activeTabRef.current.click();
    if (pageState == "home") {
      fetchLatestBlogs();
    }
    if (!trendingBlogs) {
      fetchTredingBlogs();
    }
  }, [pageState]);

  const loadBlogsByCategory = (e) => {
    const category = e.target.innerText.toLowerCase();
    setBlogs(null);
    if (pageState == category) {
      setPageState("home");
      return;
    }

    setPageState(category);
  };
  return (
    <AnimationWrapper>
      <section className="h-cover flex justify-center gap-10">
        {/* LATEST BLOGS */}
        <div className="w-full">
          <InpageNavigation
            routes={[pageState, "trending blogs"]}
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

            <>
              {trendingBlogs == null ? (
                <Loader />
              ) : (
                trendingBlogs.map((trendingBlog, i) => {
                  return (
                    <AnimationWrapper
                      transition={{ duration: 1, delay: i * 0.1 }}
                      key={i}
                    >
                      <MinimalBlogPost blog={trendingBlog} index={i} />
                    </AnimationWrapper>
                  );
                })
              )}
            </>
          </InpageNavigation>
        </div>

        {/* FILTERS AND TRENDING BLOGS */}
        <div className="min-w-[40%] lg:min-w-[400px] max-w-min border-l-2 border-grey pl-8 pt-3 max-md:hidden">
          <div className="flex flex-col gap-10">
            <div>
              <h1 className="font-medium text-xl mb-8">
                Stories form all interests
              </h1>
              <div className="flex gap-3 flex-wrap">
                {categories.map((category, i) => {
                  return (
                    <button
                      className={
                        "tag " +
                        (pageState == category ? " bg-black text-white" : "s")
                      }
                      key={i}
                      onClick={loadBlogsByCategory}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h1 className="font-medium text-xl mb-8">
                Trending <i className="fi fi-rr-arrow-trend-up"></i>
              </h1>
              <>
                {trendingBlogs == null ? (
                  <Loader />
                ) : (
                  trendingBlogs.map((trendingBlog, i) => {
                    return (
                      <AnimationWrapper
                        transition={{ duration: 1, delay: i * 0.1 }}
                        key={i}
                      >
                        <MinimalBlogPost blog={trendingBlog} index={i} />
                      </AnimationWrapper>
                    );
                  })
                )}
              </>
            </div>
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
}
