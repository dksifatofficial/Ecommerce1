"use client";

import Button3 from "@/components/Buttons/Button3";
import LogInInput from "@/components/FormElements/LogInInput";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import { login } from "@/services/login";
import { loginFormControls } from "@/utils";
import Cookies from "js-cookie";
import Link from "next/link";
// import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
// import { signIn } from 'next-auth/react'
// import { useSession } from "next-auth/react";

const initialFormdata = {
  email: "",
  password: "",
};

export default function Login() {
  const [formData, setFormData] = useState(initialFormdata);
  // const { status } = useSession();
  const {
    isAuthUser,
    setIsAuthUser,
    user,
    setUser,
    componentLevelLoader,
    setComponentLevelLoader,
  } = useContext(GlobalContext);

  const router = useRouter();

  console.log(formData);

  function isValidForm() {
    return formData &&
      formData.email &&
      formData.email.trim() !== "" &&
      formData.password &&
      formData.password.trim() !== ""
      ? true
      : false;
  }

  //  function GoogleLogIn() {
  //     if (status === "authenticated") {
  //       setIsAuthUser(true);
  //     }
  //   }
  //   useEffect(() => {
  //     GoogleLogIn();
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  async function handleLogin() {
    setComponentLevelLoader({ loading: true, id: "" });
    const res = await login(formData);

    console.log(res);

    if (res.success) {
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsAuthUser(true);
      setUser(res?.finalData?.user);
      setFormData(initialFormdata);
      Cookies.set("token", res?.finalData?.token);
      localStorage.setItem("user", JSON.stringify(res?.finalData?.user));
      setComponentLevelLoader({ loading: false, id: "" });
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsAuthUser(false);
      setComponentLevelLoader({ loading: false, id: "" });
    }
  }

  console.log(isAuthUser, user);

  useEffect(() => {
    if (isAuthUser) router.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthUser]);

  return (
    <div className="relative bg-gray-100 pb-12 flex justify-center items-center w-full flex-row">
          <div className="mr-0 mb-0 ml-0 relative max-w-2xl mt-0 w-[90%] sm:w-[80%] md:w-[60%] lg:w-5/12">
            <div className="flex flex-row justify-between mt-12 mb-12 items-center">
              <h4 className="text-lg text-gray-600 font-semibold">
                Welcome to Daraz! Please login.
              </h4>
              <p className="text-sm text-gray-400">
                New member? <Link className=" text-teal-500 hover:underline" href="/register">Register</Link> here.
              </p>
            </div>
            <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
              <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                {loginFormControls.map((controlItem) =>
                  controlItem.componentType === "input" ? (
                    // eslint-disable-next-line react/jsx-key
                    <LogInInput
                      type={controlItem.type}
                      placeholder={controlItem.placeholder}
                      label={controlItem.label}
                      value={formData[controlItem.id]}
                      onChange={(event) => {
                        setFormData({
                          ...formData,
                          [controlItem.id]: event.target.value,
                        });
                      }}
                    />
                  ) : null
                )}
                <Button3
                  className="disabled:opacity-50 inline-flex w-full items-center justify-center px-6 py-4 text-lg 
                     text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                  disabled={!isValidForm()}
                  onClick={handleLogin}
                >
                  {componentLevelLoader && componentLevelLoader.loading ? (
                    <ComponentLevelLoader
                      text={"Logging In"}
                      color={"#ffffff"}
                      loading={
                        componentLevelLoader && componentLevelLoader.loading
                      }
                    />
                  ) : (
                    "Login"
                  )}
                </Button3>
              </div>
            </div>
          </div>
      <Notification />
    </div>
  );
}

// {/* <button
// className="mb-8 bg-white flex items-center gap-4 shadow-lg overflow-hidden rounded-lg pl-3"
// onClick={() => signIn('google')}
// >
//   <Image src="/google.png" alt="" height={30} width={30} />
//   <span className=" bg-blue-500 text-white px-4 py-3">Sign in with Google</span>
// </button> */}
