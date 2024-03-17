import React, { useState } from "react";
import { useUserContext } from "../../context/user-context";
import { Navigate } from "react-router-dom";
import BlogEditor from "../components/blog-editor.component";
import PublishForm from "../components/publish-form.component";
export default function Editor() {
  const { userAuth, setUserAuth } = useUserContext();
  const access_token = userAuth?.user?.access_token;

  const [editorState, setEditorState] = useState("editor");
  return access_token === null ? (
    <Navigate to={"/signin"} />
  ) : editorState == "editor" ? (
    <BlogEditor />
  ) : (
    <PublishForm />
  );
}
