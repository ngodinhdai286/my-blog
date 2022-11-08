import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DashboardHeading from "components/module/dashboard/DashboardHeading";
import { Field, FieldCheckboxes } from "components/field";
import { Label } from "components/label";
import { Input } from "components/input";
import { Radio } from "components/checkbox";
import { Button } from "components/button";
import { useForm } from "react-hook-form";
import { categoryStatus } from "utils/constants";
import { useEffect } from "react";
import { db } from "../../../firebase-app/firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import slugify from "slugify";
import { toast } from "react-toastify";

const CategoryUpdate = () => {
  const [params] = useSearchParams();
  const categoryId = params.get("id");
  const navigate = useNavigate();
  const {
    control,
    watch,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {},
  });
  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, "categories", categoryId);
      const singleDoc = await getDoc(colRef);
      reset(singleDoc.data());
    }
    fetchData();
  }, [categoryId, reset]);

  if (!categoryId) return null;
  const watchStatus = watch("status");
  const handleUpdateCategory = async (values) => {
    const colRef = doc(db, "categories", categoryId);
    await updateDoc(colRef, {
      name: values.name,
      slug: slugify(values.slug || values.name, { lower: true }),
      status: values.status,
    });
    toast.success("Update category successfully!");
    navigate("/manage/category");
  };

  return (
    <div>
      <DashboardHeading
        title="Update category"
        desc={`Update your category id: ${categoryId}`}
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateCategory)}>
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
          kind="primary"
          className="mx-auto w-[250px]"
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Update category
        </Button>
      </form>
    </div>
  );
};

export default CategoryUpdate;
