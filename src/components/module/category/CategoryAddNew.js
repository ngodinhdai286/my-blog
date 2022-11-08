import React from "react";
import DashboardHeading from "components/module/dashboard/DashboardHeading";
import { useForm } from "react-hook-form";
import { Radio } from "components/checkbox";
import { Label } from "components/label";
import { Input } from "components/input";
import { Field, FieldCheckboxes } from "components/field";
import { Button } from "components/button";
import slugify from "slugify";
import { categoryStatus } from "utils/constants";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../../firebase-app/firebase-config";
import { useNavigate } from "react-router-dom";

const CategoryAddNew = () => {
  const navigate = useNavigate();
  const {
    control,
    watch,
    reset,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: 1,
      createdAt: new Date(),
    },
  });

  const handleAddNewCategory = async (values) => {
    if (!isValid) return;
    const newValues = { ...values };
    newValues.slug = slugify(newValues.name || newValues.slug, {
      lower: true,
    });
    newValues.status = Number(newValues.status);

    const colRef = collection(db, "categories");
    try {
      await addDoc(colRef, {
        ...newValues,
        createdAt: serverTimestamp(),
      });
      toast.success("Create new category successfully");
      navigate("/manage/category");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      reset({ name: "", slug: "", status: 1, createdAt: new Date() });
    }
  };

  const watchStatus = watch("status");

  return (
    <div>
      <DashboardHeading
        title="New category"
        desc="Add new category"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleAddNewCategory)}>
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug"
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
                checked={Number(watchStatus) === categoryStatus.APPROVED}
                value={categoryStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.DISAPPROVED}
                value={categoryStatus.DISAPPROVED}
              >
                Unapproved
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          type="submit"
          kind="primary"
          className="w-[200px]"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Add new category
        </Button>
      </form>
    </div>
  );
};

export default CategoryAddNew;
