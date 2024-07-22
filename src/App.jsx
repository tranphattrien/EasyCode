import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuthForm from "./pages/userAuthForm";
import UserContextProvider from "../context/user-context";
import Editor from "./pages/editor";
import Activation from "./pages/Activation";
import HomePage from "./pages/home";
import SearchPage from "./pages/search";
import PageNotFound from "./pages/404";
import ProfilePage from "./pages/profile";
import BlogPage from "./pages/blog";
import SideNav from "./components/sidenavbar.component";
import ChangePassword from "./pages/change-password";

const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<HomePage />} />

          <Route path="settings" element={<SideNav />}>
            <Route path="edit-profile" element={<h1>Edit profile</h1>} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>

          <Route path="signin" element={<UserAuthForm type="signin" />} />
          <Route path="signup" element={<UserAuthForm type="signup" />} />
          <Route path="search/:query" element={<SearchPage />} />
          <Route path="user/:id" element={<ProfilePage />} />
          <Route path="blog/:blog_id" element={<BlogPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>

        <Route path="/editor" element={<Editor />} />
        <Route path="/editor/:blog_id" element={<Editor />} />
        <Route path="/activation" element={<Activation />} />
      </Routes>
    </UserContextProvider>
  );
};

export default App;
