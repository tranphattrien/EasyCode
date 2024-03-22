import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Lottie from "react-lottie";
import Loading from "../Assets/animations/loading.json";
import Fail from "../Assets/animations/fail.json";
import Success from "../Assets/animations/success.json";

const Activation = () => {
  const [searchParams] = useSearchParams();
  const activation_token = searchParams.get("token");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadingOptions = {
    loop: true,
    autoplay: true,
    animationData: Loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const failOptions = {
    loop: 5,
    autoplay: true,
    animationData: Fail,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const successOptions = {
    loop: 5,
    autoplay: true,
    animationData: Success,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  useEffect(() => {
    const activateAccount = async () => {
      try {
        await axios.post(`http://localhost:3000/activation`, {
          activation_token: activation_token
        });
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    activateAccount();
  }, [activation_token]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      {loading ? (
        <div>
          <Lottie options={loadingOptions} width={300} height={300} />
        </div>
      ) : error ? (
        <div>
          <Lottie options={failOptions} width={300} height={300} />
          <h5 className="text-center mb-14 text-[25px] text-[#000000a1]">
            There was an error activating your account. Please try again later.
          </h5>
        </div>
      ) : (
        <div>
          <Lottie options={successOptions} width={300} height={300} />
          <h5 className="text-center mb-14 text-[25px] text-[#000000a1]">
            Your account has been successfully activated.
          </h5>
          <button className="btn-dark center mt-14">
            <Link to="/signin">Sign in now</Link>
          </button>
          <br />
          <br />
        </div>
      )}
    </div>
  );
};

export default Activation;
