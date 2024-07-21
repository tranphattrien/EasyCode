import React, { useState } from "react";
import { useUserContext } from "../../context/user-context";
import toast, { Toaster } from "react-hot-toast";
import { useBlogContext } from "../pages/blog";
import axios from "axios";

export default function CommentField({
  action,
  index = undefined,
  replyingTo = undefined,
  setReplying
}) {
  let {
    userAuth: {
      user: { username, fullname, profile_img, access_token }
    }
  } = useUserContext();

  let {
    blog,
    blog: {
      _id,
      author: {
        _id: blog_author,
        personal_info: { username: author_username }
      },
      comments,
      comments: { results: commentsArr },
      activity,
      activity: { total_comments, total_parent_comments }
    },
    setBlog,
    setTotalParentCommentsLoaded
  } = useBlogContext();
  const [comment, setComment] = useState("");

  const handleComment = () => {
    if (!access_token) {
      return toast.error("Please sign in to leave a comment !");
    }
    if (!comment.length) {
      return toast.error("Write something to leave a comment...");
    }
    console.log(comments);
    axios
      .post(
        import.meta.env.VITE_SERVER_DOMAIN + "/add-comment",
        {
          _id,
          blog_author,
          comment,
          replying_to: replyingTo
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        }
      )
      .then(({ data }) => {
        setComment("");
        data.commented_by = {
          personal_info: { username, profile_img, fullname }
        };

        let newCommentArr;
        if (replyingTo) {
          commentsArr[index].children.push(data._id);
          data.childrenLevel = commentsArr[index].childrenLevel + 1;
          data.parentIndex = index;

          commentsArr[index].isReplyLoaded = true;

          commentsArr.splice(index + 1, 0, data);

          newCommentArr = commentsArr;

          setReplying(false);
        } else {
          data.childrenLevel = 0;
          newCommentArr = [data, ...commentsArr];
        }

        let parentCommentIncrementval = replyingTo ? 0 : 1;
        setBlog({
          ...blog,
          comments: { ...comments, results: newCommentArr },
          activity: {
            ...activity,
            total_comments: total_comments + 1,
            total_parent_comments:
              total_parent_comments + parentCommentIncrementval
          }
        });
        setTotalParentCommentsLoaded(
          (preVal) => preVal + parentCommentIncrementval
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Toaster />
      <textarea
        className="input-box pl-5 placeholder:text-dark-grey resize-none h-[100px] overflow-auto"
        value={comment}
        placeholder="Leave a comment..."
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <button className="btn-dark mt-5  px-10" onClick={handleComment}>
        {action}
      </button>
    </>
  );
}
