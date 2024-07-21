import React from "react";
import AnimationWrapper from "../common/page-animation";
import { Link } from "react-router-dom";
import { useUserContext } from "../../context/user-context";
import { removeFromSession } from "../common/session";

export default function UserNavigationPanel() {
  const {
    userAuth: {
      user: { username }
    },
    setUserAuth
  } = useUserContext();

  const signOutUser = () => {
    removeFromSession("user");
    setUserAuth({ access_token: null, username: null });
    window.location.reload();
  };

  return (
    <AnimationWrapper
      transition={{ duration: 0.2 }}
      className="absolute right-0 z-50"
    >
      <div className="bg-white absolute right-0 border-grey w-60 duration-200">
        <Link to="/editor" className="flex gap-2 link  pl-8 py-4">
          <i className="fi fi-rr-edit"></i>
          <p>Write</p>
        </Link>

        <Link to={`/user/${username}`} className="flex gap-2 link  pl-8 py-4">
          <i className="fi fi-rr-user"></i>
          <p>Profile</p>
        </Link>

        <Link to="/dashboard/blogs" className="flex gap-2 link  pl-8 py-4">
          <i className="fi fi-rr-dashboard"></i>
          <p>Dashboard</p>
        </Link>

        <Link
          to="/settings/edit-profile"
          className="flex gap-2 link  pl-8 py-4"
        >
          <i className="fi fi-rr-settings"></i>
          <p>Settings</p>
        </Link>

        <span className="absolute border-t border-grey w-[100%]" />

        <button
          className="text-left hover:bg-grey w-full pl-8 py-4 text-dark-grey"
          onClick={signOutUser}
        >
          <div>Sign Out</div>
          <p>@{username}</p>
        </button>
      </div>
    </AnimationWrapper>
  );
}
