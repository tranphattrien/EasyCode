import AnimationWrapper from "../common/page-animation";
import InputBox from "../components/input.component";
import googleIcon from "../imgs/google.png";
import { Link, Navigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { storeInSession } from "../common/session";
import { useUserContext } from "../../context/user-context";
export default function UserAuthForm({ type }) {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

  const { userAuth, setUserAuth } = useUserContext();
  const access_token = userAuth?.user?.access_token;

  const userAuthThroughServer = (serverRoute, formData) => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, formData)
      .then(({ data }) => {
        storeInSession("user", JSON.stringify(data));
        setUserAuth(data);
        toast.success(data.status);
        // if (data.status === "Registration successful") {
        //   window.location.href = "signin";
        // }

        // if (data.status === "Signin successful") {
        //   window.location.href = "/";
        // }
      })
      .catch(({ response }) => {
        toast.error(response?.data?.error || "An error occurred !");
      });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const serverRoute = type == "signin" ? "/signin" : "/signup";

    const form = new FormData(formElement);
    const formData = {};

    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

    const { fullname, email, password } = formData;
    if (fullname) {
      if (!fullname || fullname.length < 3 || fullname.trim() < 3) {
        return toast.error("Fullname must be at least 3 letters long !");
      }
    }

    if (!email.length) {
      return toast.error("Enter Email");
    }

    if (!emailRegex.test(email)) {
      return toast.error("Invalid email address");
    }

    if (!passwordRegex.test(password)) {
      return toast.error(
        "Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters!"
      );
    }

    userAuthThroughServer(serverRoute, formData);
  };
  return access_token ? (
    <Navigate to="/" />
  ) : (
    <AnimationWrapper keyValue={type}>
      <section className="h-cover flex items-center justify-center">
        <Toaster />
        <form
          id="formElement"
          action=""
          method="post"
          className="w-[80%] max-w-[400px]"
          onSubmit={submitHandler}
        >
          <h1 className="text-4xl font-gelasio capitalize text-center mb-10">
            {type === "signin" ? "Welcome back" : "Join us today"}
          </h1>
          {type != "signin" ? (
            <InputBox
              name="fullname"
              type="text"
              placeholder="Full name"
              icon="fi-rr-user"
            />
          ) : (
            ""
          )}
          <InputBox
            name="email"
            type="email"
            placeholder="Email"
            icon="fi-rr-envelope"
          />
          <InputBox
            name="password"
            type="password"
            placeholder="Password"
            icon="fi-rr-lock"
          />

          <button className="btn-dark center mt-14" type="submit">
            {type === "signup" ? "Sign up" : "Sign in"}
          </button>

          <div className="relative w-full flex items-center justify-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
            <hr className="w-1/2 border-black" />
            <p>OR</p>
            <hr className="w-1/2 border-black" />
          </div>

          <button className="btn-dark flex items-center justify-center gap-4 w-[90%] center">
            <img src={googleIcon} alt="Google icon" className="w-5" />
            Continue with google
          </button>

          {type === "signin" ? (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Don't have account ?
              <Link to="/signup" className="underline text-black text-xl ml-1">
                Join us today
              </Link>
            </p>
          ) : (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Already a member ?
              <Link to="/signin" className="underline text-black text-xl ml-1">
                Sign in here
              </Link>
            </p>
          )}
        </form>
      </section>
    </AnimationWrapper>
  );
}
