import { useEffect, useState } from "react";
import AnimationWrapper from "../common/page-animation";
import InpageNavigation, {
  activeTabRef
} from "../components/inpage-navigation.component";
import axios from "axios";
import Loader from "../components/loader.component";
import BlogPostCard from "../components/blog-post.component";
import MinimalBlogPost from "../components/nobanner-blog-post.component";
import NoDataMessage from "../components/nodata.component";
import { filterPaginationData } from "../common/filter-pagination-data";
import LoadMoreDataBtn from "../components/load-more.component";
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

  const fetchLatestBlogs = async ({ page = 1 }) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_SERVER_DOMAIN + "/latest-blogs",
        { page }
      );
      let formatedData = await filterPaginationData({
        state: blogs,
        data: response.data.blogs,
        page,
        countRoute: "/all-latest-blogs-count"
      });
      setBlogs(formatedData);
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

  const fetchBlogByCategory = async ({ page = 1 }) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs",
        { tag: pageState, page }
      );
      let formatedData = await filterPaginationData({
        state: blogs,
        data: response.data.blogs,
        page,
        countRoute: "/search-blogs-count",
        data_to_send: { tag: pageState }
      });
      setBlogs(formatedData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    activeTabRef.current.click();
    if (pageState == "home") {
      fetchLatestBlogs({ page: 1 });
    } else {
      fetchBlogByCategory({ page: 1 });
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
              ) : blogs.results.length ? (
                blogs.results.map((blog, i) => {
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
              ) : (
                <NoDataMessage message="No blogs published !" />
              )}
              <LoadMoreDataBtn
                state={blogs}
                fetchDataFunction={
                  pageState == "home" ? fetchLatestBlogs : fetchBlogByCategory
                }
              />
            </>

            <>
              {trendingBlogs == null ? (
                <Loader />
              ) : trendingBlogs.length ? (
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
              ) : (
                <NoDataMessage message="No trending blogs !" />
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
                ) : trendingBlogs.length ? (
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
                ) : (
                  <NoDataMessage message="No trending blogs !" />
                )}
              </>
            </div>
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
}
