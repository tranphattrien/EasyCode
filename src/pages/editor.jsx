import React, { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "../../context/user-context";
import { Navigate, useParams } from "react-router-dom";
import BlogEditor from "../components/blog-editor.component";
import PublishForm from "../components/publish-form.component";
import Loader from "../components/loader.component";
import axios from "axios";

const blogStructure = {
  title: "",
  banner: "",
  content: [],
  tags: [],
  des: "",
  author: { personal_info: {} }
};

const EditorContext = createContext({});

export default function Editor() {
  let { blog_id } = useParams();
  const { userAuth, setUserAuth } = useUserContext();
  const access_token = userAuth?.user?.access_token;

  const [blog, setBlog] = useState(blogStructure);
  const [editorState, setEditorState] = useState("editor");
  const [textEditor, setTextEditor] = useState({ isReady: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!blog_id) {
      return setLoading(false);
    }

    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/get-blog", {
        blog_id,
        draft: true,
        mode: "edit"
      })
      .then(({ data: { blog } }) => {
        setBlog(blog);
        setLoading(false);
      })
      .catch((err) => {
        setBlog(null);
        setLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <EditorContext.Provider
      value={{
        blog,
        setBlog,
        editorState,
        setEditorState,
        textEditor,
        setTextEditor
      }}
    >
      {access_token === null ? (
        <Navigate to={"/signin"} />
      ) : loading ? (
        <Loader />
      ) : editorState == "editor" ? (
        <BlogEditor />
      ) : (
        <PublishForm />
      )}
    </EditorContext.Provider>
  );
}

export function useEditorContext() {
  const context = useContext(EditorContext);
  if (context === null) {
    throw new Error(
      "useEditorContext must used within a EditorContextProvider"
    );
  }
  return context;
}
