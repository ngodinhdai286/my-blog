import React from "react";
import ImageUpload from "components/image/ImageUpload";
import DashboardHeading from "../dashboard/DashboardHeading";
import { useForm } from "react-hook-form";
import { Radio } from "components/checkbox";
import { Label } from "components/label";
import { Input } from "components/input";
import { Field, FieldCheckboxes } from "components/field";
import { Button } from "components/button";
import { userRoles, userStatus } from "utils/constants";
import useFirebaseImage from "hooks/useFirebaseImage";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "firebase-app/firebase-config";
import {
  addDoc,
  collection,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import slugify from "slugify";
import { toast } from "react-toastify";

const UserAddNew = () => {
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    watch,
    reset,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      username: "",
      avatar: "",
      status: userStatus.ACTIVE,
      role: userRoles.USER,
      createdAt: new Date(),
    },
  });
  const watchStatus = watch("status");
  const watchRoles = watch("role");

  const {
    image,
    progress,
    handleSelectImage,
    handleDeleteImage,
    handleResetUpload,
  } = useFirebaseImage(setValue, getValues);

  const handleAddNewUser = async (values) => {
    if (!isValid) return;
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      await addDoc(collection(db, "users"), {
        fullname: values.fullname,
        email: values.email,
        password: values.password,
        username: slugify(values.username || values.fullname, {
          lower: true,
          replacement: " ",
          trim: true,
        }),
        avatar: image,
        status: Number(values.status),
        role: Number(values.role),
        createdAt: serverTimestamp(),
      });
      toast.success(`Create new user: email: ${values.email} successfully`);
      reset({
        fullname: "",
        email: "",
        password: "",
        username: "",
        avatar: "",
        status: userStatus.ACTIVE,
        role: userRoles.USER,
        createdAt: new Date(),
      });
      handleResetUpload();
    } catch (error) {
      console.log("handleAddNewUser ~~ error", error);
      toast.error("Cannot create new user");
    }
  };

  return (
    <div>
      <DashboardHeading
        title="New user"
        desc="Add new user to system"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleAddNewUser)}>
        <div className="w-[200px] h-[200px] mx-auto rounded-full mb-10">
          <ImageUpload
            className="!rounded-full h-full"
            onChange={handleSelectImage}
            progress={progress}
            image={image}
            handleDeleteImage={handleDeleteImage}
          ></ImageUpload>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Fullname</Label>
            <Input
              name="fullname"
              placeholder="Enter your fullname"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              name="username"
              placeholder="Enter your username"
              control={control}
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Email</Label>
            <Input
              name="email"
              placeholder="Enter your email"
              control={control}
              type="email"
            ></Input>
          </Field>
          <Field>
            <Label>Password</Label>
            <Input
              name="password"
              placeholder="Enter your password"
              control={control}
              type="password"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.ACTIVE}
                value={userStatus.ACTIVE}
              >
                Active
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.PENDING}
                value={userStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.BANNED}
                value={userStatus.BANNED}
              >
                Banned
              </Radio>
            </FieldCheckboxes>
          </Field>
          <Field>
            <Label>Role</Label>
            <FieldCheckboxes>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRoles) === userRoles.ADMIN}
                value={userRoles.ADMIN}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRoles) === userRoles.MOD}
                value={userRoles.MOD}
              >
                Moderator
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRoles) === userRoles.USER}
                value={userRoles.USER}
              >
                User
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          type="submit"
          kind="primary"
          className="mx-auto w-[200px]"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Add new user
        </Button>
      </form>
    </div>
  );
};

export default UserAddNew;
