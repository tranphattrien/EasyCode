import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuthForm from "./pages/userAuthForm";
import UserContextProvider from "../context/user-context";
import Editor from "./pages/editor";
import Activation from "./pages/Activation";

const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="signin" element={<UserAuthForm type="signin" />}></Route>
          <Route path="signup" element={<UserAuthForm type="signup" />}></Route>
        </Route>
        <Route path="/editor" element={<Editor />} />
        <Route path="/activation" element={<Activation />} />
      </Routes>
    </UserContextProvider>
  );
};

export default App;
