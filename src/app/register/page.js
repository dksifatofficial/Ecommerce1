"use client";

import Button3 from "@/components/Buttons/Button3";
import InputComponent from "@/components/FormElements/InputComponent";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import { registerNewUser } from "@/services/register";
import { registrationFormControls } from "@/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const initialFormData = {
  name: "",
  email: "",
  password: "",
  role: "customer",
};

export default function Register() {
  const [formData, setFormData] = useState(initialFormData);
  const [isRegistered, setIsRegistered] = useState(false);
  const { componentLevelLoader, setComponentLevelLoader, isAuthUser } =
    useContext(GlobalContext);

  const router = useRouter();

  console.log(formData);

  function isFormValid() {
    return formData &&
      formData.name &&
      formData.name.trim() !== "" &&
      formData.email &&
      formData.email.trim() !== "" &&
      formData.password &&
      formData.password.trim() !== ""
      ? true
      : false;
  }

  console.log(isFormValid());

  async function handleRegisterOnSubmit() {
    setComponentLevelLoader({ loading: true, id: "" });
    const data = await registerNewUser(formData);

    if (data.success) {
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsRegistered(true);
      setComponentLevelLoader({ loading: false, id: "" });
      setFormData(initialFormData);
    } else {
      toast.error(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
      setFormData(initialFormData);
    }

    console.log(data);
  }

  useEffect(() => {
    if (isAuthUser) router.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthUser]);

  return (
    <div className="relative bg-gray-100 pb-4 md:pb-6 lg:pb-12 flex justify-center items-center w-full flex-row">
      <div className="mr-0 mb-0 ml-0 relative max-w-2xl mt-0 w-[90%] sm:w-[80%] md:w-[60%] lg:w-5/12">
        <div className="flex flex-row justify-between mt-4 md:mt-6 lg:mt-12 mb-4 md:mb-6 lg:mb-12 items-center">
          <h4 className="text-xs md:text-base lg:text-lg text-gray-600 font-semibold">
            Create your Daraz Account
          </h4>
          <p className="text-[10px] md:text-sm text-gray-400">
            Already member?{" "}
            <Link className="text-[10px] md:text-sm text-teal-500 hover:underline" href="/login">
              Login
            </Link>{" "}
            here.
          </p>
        </div>
        <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
          <p className="w-full text-4xl font-medium text-center font-serif text-teal-500">
            {isRegistered ? "Registration Successfull !" : ""}
          </p>
          {isRegistered ? (
            <Button3
              className="mt-4 inline-flex w-full items-center justify-center  px-6 py-4 text-lg 
                text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                "
              onClick={() => router.push("/login")}
            >
              Login
            </Button3>
          ) : (
            <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-4">
              {registrationFormControls.map(
                (controlItem) =>
                  controlItem.componentType === "input" ? (
                    // eslint-disable-next-line react/jsx-key
                    <InputComponent
                      type={controlItem.type}
                      placeholder={controlItem.placeholder}
                      label={controlItem.label}
                      onChange={(event) => {
                        setFormData({
                          ...formData,
                          [controlItem.id]: event.target.value,
                        });
                      }}
                      value={formData[controlItem.id]}
                    />
                  ) : null
                // controlItem.componentType === "select" ? (
                //   <SelectComponent
                //     options={controlItem.options}
                //     label={controlItem.label}
                //     onChange={(event) => {
                //       setFormData({
                //         ...formData,
                //         [controlItem.id]: event.target.value,
                //       });
                //     }}
                //     value={formData[controlItem.id]}
                //   />
                // ) : null
              )}
              <Button3
                className=" disabled:opacity-50 inline-flex w-full items-center justify-center px-6 py-2 text-lg 
                   text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                disabled={!isFormValid()}
                onClick={handleRegisterOnSubmit}
              >
                {componentLevelLoader && componentLevelLoader.loading ? (
                  <ComponentLevelLoader
                    text={"Registering"}
                    color={"#ffffff"}
                    loading={
                      componentLevelLoader && componentLevelLoader.loading
                    }
                  />
                ) : (
                  "Register"
                )}
              </Button3>
            </div>
          )}
        </div>
      </div>
      <Notification />
    </div>
  );
}
