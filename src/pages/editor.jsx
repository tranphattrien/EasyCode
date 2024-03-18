import React, { createContext, useContext, useState } from "react";
import { useUserContext } from "../../context/user-context";
import { Navigate } from "react-router-dom";
import BlogEditor from "../components/blog-editor.component";
import PublishForm from "../components/publish-form.component";

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
  const { userAuth, setUserAuth } = useUserContext();
  const access_token = userAuth?.user?.access_token;

  const [blog, setBlog] = useState(blogStructure);
  const [editorState, setEditorState] = useState("editor");

  return (
    <EditorContext.Provider
      value={{ blog, setBlog, editorState, setEditorState }}
    >
      {access_token === null ? (
        <Navigate to={"/signin"} />
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
