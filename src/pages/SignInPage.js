import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Field } from "../components/field";
import { useAuth } from "../contexts/auth-context";
import { useForm } from "react-hook-form";
import AuthenticationPage from "./AuthenticationPage";
import { Label } from "../components/label";
import { Input } from "../components/input";
import { Button } from "../components/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { IconEyeClose, IconEyeOpen } from "../components/icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";

const schema = yup.object({
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Please enter your email address"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters or greater")
    .required("Please enter your password"),
});

const SignInPage = () => {
  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const [togglePassword, setTogglePassword] = useState(false);

  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  //   console.log(userInfo);
  useEffect(() => {
    document.title = "SignIn Page";
    if (userInfo?.email) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSignIn = async (values) => {
    if (!isValid) {
      return;
    }
    await signInWithEmailAndPassword(auth, values.email, values.password);
    navigate("/");
  };

  return (
    <AuthenticationPage>
      <form className="form" onSubmit={handleSubmit(handleSignIn)}>
        <Field>
          <Label htmlFor="email">Email Address</Label>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email address..."
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <Input
            type={togglePassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password..."
            control={control}
          >
            {!togglePassword ? (
              <IconEyeClose
                onClick={() => {
                  setTogglePassword(true);
                }}
              ></IconEyeClose>
            ) : (
              <IconEyeOpen
                onClick={() => {
                  setTogglePassword(false);
                }}
              ></IconEyeOpen>
            )}
          </Input>
        </Field>
        <div className="have-account">
          Haven't had an account yet?{" "}
          <NavLink to={"/sign-up"}>Register account</NavLink>
        </div>
        <Button
          type="submit"
          style={{
            maxWidth: 300,
            margin: "0 auto",
          }}
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Sign in
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default SignInPage;
