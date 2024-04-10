"use client";

import React from "react";
import { MenuItem } from "@mui/material";
import Slider from "@mui/material/Slider";
import Radio from "@mui/material/Radio";
import { useRouter } from "next/navigation";
import SelectComponent from "@/components/SelectComponent";
import Input from "@/components/Input";
import RadioComponent from "@/components/Radio";
import RadioInput from "@/components/RadioInput";
import ShouldRender from "@/components/ShouldRender";
import Button from "@/components/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PageHeader from "@/components/PageHeader";
import { ProductType } from "@/types/entities";
import { useFormik } from "formik";
import { addProduct } from "@/api/actions/product";
import TextArea from "@/components/TextArea";
import Card from "@/components/Card";
import { GoDotFill } from "react-icons/go";
import { DISCOUNT_TYPES, PRODUCT_STATUS } from "@/utils/constants";
import { Space } from "antd";
import { createProductValidationSchema } from "@/validation/productSchemas";
import { formatErrors, notify } from "@/utils/helpers";
import { PageProps } from "@/types/pageProps";

const AddProduct: React.FC<PageProps> = ({ params }): JSX.Element => {
  const router = useRouter();
  const queryCient = useQueryClient();

  const addProductMutation = useMutation({
    mutationKey: ["add-product"],
    mutationFn: (data: ProductType) => addProduct(data),
    onSettled: () =>
      queryCient.invalidateQueries({
        queryKey: ["add-product"],
      }),
  });

  const handleSubmit = async (values: any) => {
    const { errors, message, product } = await addProductMutation.mutateAsync(
      values
    );
    if (errors) {
      formik.setErrors(formatErrors(errors));
      return;
    }
    notify(message, "success");
    router.push(`/catalog/products/edit/${product.id}`);
  };

  const formik = useFormik({
    initialValues: {
      status: "Active",
      stock: +"",
      weight: +"",
      length: +"",
      width: +"",
      height: +"",
      allowBackorders: true,
      name: "",
      description: "",
      price: +"",
      discountType: "None",
      fixedDiscount: +"",
      percentDiscount: +"",
    },
    validateOnBlur: true,
    validationSchema: createProductValidationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <PageHeader title="New Product" params={params} />
      <div className="w-full flex flex-col lg:flex-row gap-5">
        <div className="w-full lg:w-2/5 flex flex-col gap-5">
          <Card>
            <div className="flex items-center mb-5">
              <h2 className="text-[1.275rem] opacity-90 text-[#152238] flex-1">
                Status
              </h2>
              <GoDotFill
                size={40}
                className={`${
                  formik.values.status === PRODUCT_STATUS.active
                    ? "text-green-400"
                    : "text-orange-400"
                }`}
              />
            </div>
            <SelectComponent
              id="status"
              name="status"
              boxWidth="100%"
              label="status"
              variant="outlined"
              value={formik.values.status}
              onChange={formik.handleChange}
            >
              <MenuItem value={"Active"}>Active</MenuItem>
              <MenuItem value={"Inactive"}>Inactive</MenuItem>
            </SelectComponent>
            <p className="opacity-40 text-xs mt-1 font-semibold">
              Set the product status.
            </p>
          </Card>
          <Card>
            <h2 className="text-[1.275rem] opacity-90 text-[#152238] mb-5">
              Product details
            </h2>
            <div className="w-full">
              <Space direction="vertical" size={20} className="w-full">
                <Input
                  id="stock"
                  type="number"
                  name="stock"
                  value={formik.values.stock}
                  placeholder="Stock"
                  label="Stock"
                  onChange={formik.handleChange}
                  error={formik.errors.stock}
                />
                <Input
                  type="number"
                  name="weight"
                  value={formik.values.weight}
                  placeholder="Weight"
                  label="Weight"
                  onChange={formik.handleChange}
                  error={formik.errors.weight}
                />
                <Input
                  type="number"
                  name="length"
                  value={formik.values.length}
                  placeholder="Length"
                  label="Length"
                  onChange={formik.handleChange}
                  error={formik.errors.length}
                />
                <Input
                  type="number"
                  name="width"
                  value={formik.values.width}
                  placeholder="Width"
                  label="Width"
                  onChange={formik.handleChange}
                  error={formik.errors.width}
                />
                <Input
                  type="number"
                  name="height"
                  value={formik.values.height}
                  placeholder="Height"
                  label="Height"
                  onChange={formik.handleChange}
                  error={formik.errors.height}
                />
                <RadioComponent
                  id="allowBackorders"
                  name="allowBackorders"
                  formLabel="Allow back order"
                  defaultValue={`${true}`}
                  value={formik.values.allowBackorders}
                >
                  <Space direction="vertical" size={16}>
                    <RadioInput
                      value={true}
                      label="Yes"
                      onChange={formik.handleChange}
                      control={<Radio />}
                    />
                    <RadioInput
                      value={false}
                      label="No"
                      onChange={formik.handleChange}
                      control={<Radio />}
                    />
                  </Space>
                </RadioComponent>
              </Space>
            </div>
          </Card>
        </div>
        <div className="flex-1 flex flex-col gap-5">
          <Card>
            <h2 className="text-[1.275rem] opacity-90 text-[#152238] mb-5">
              General
            </h2>
            <Input
              id="name"
              name="name"
              value={formik.values.name}
              placeholder="Product Name"
              type="text"
              label="Product Name"
              required
              onChange={formik.handleChange}
              error={formik.errors.name}
            />
            <p className="opacity-40 text-xs font-semibold">
              A product name is required and recommended to be unique.
            </p>
            <div className="mt-5">
              <TextArea
                id="description"
                name="description"
                rows={5}
                placeholder="Description"
                label="Description"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.errors.description}
              />
            </div>
          </Card>
          <Card>
            <h2 className="text-[1.275rem] opacity-90 text-[#152238] mb-5">
              Pricing
            </h2>
            <Input
              id="price"
              type="text"
              name="price"
              label="Base Price"
              required
              value={formik.values.price}
              placeholder="Product Price"
              onChange={formik.handleChange}
              error={formik.errors.price}
            />
            <p className="opacity-40 text-xl mt-1 font-semibold">
              Set product price
            </p>
            <div className="mt-5 mb-4">
              <RadioComponent
                id="discountType"
                name="discountType"
                formLabel="Discount type"
                defaultValue={DISCOUNT_TYPES.none}
                value={formik.values.discountType}
              >
                <Space direction="vertical" size={16}>
                  <RadioInput
                    value={DISCOUNT_TYPES.none}
                    label="No Discount"
                    onChange={formik.handleChange}
                    control={<Radio />}
                  />
                  <RadioInput
                    value={DISCOUNT_TYPES.percentage}
                    label="Percentage"
                    onChange={formik.handleChange}
                    control={<Radio />}
                  />
                  <RadioInput
                    value={DISCOUNT_TYPES.fixed}
                    label="Fixed Price"
                    onChange={formik.handleChange}
                    control={<Radio />}
                    error={formik.errors.fixedDiscount}
                  />
                </Space>
              </RadioComponent>
            </div>
            <ShouldRender
              visible={formik.values.discountType === DISCOUNT_TYPES.fixed}
            >
              <div>
                <Input
                  id="fixedDiscount"
                  name="fixedDiscount"
                  placeholder="Discounted Price"
                  type="number"
                  label="Fixed Discounted Price"
                  value={formik.values.fixedDiscount}
                  min={0}
                  onChange={formik.handleChange}
                  error={formik.errors.fixedDiscount}
                />
                <p className="opacity-40 text-xs mt-1 font-semibold">
                  Set the discounted product price. The product will be reduced
                  at the determined fixed price
                </p>
              </div>
            </ShouldRender>
            <ShouldRender
              visible={formik.values.discountType === DISCOUNT_TYPES.percentage}
            >
              <div>
                <p className="opacity-90">Set discount Percentage</p>
                <p className="text-4xl font-bold text-center mt-3 mb-5">
                  <span>{formik.values.percentDiscount}</span>
                  <sup>%</sup>
                </p>
                <div className="mx-5 mb-5">
                  <Slider
                    color="primary"
                    name="percentDiscount"
                    className="mx-5"
                    size="medium"
                    value={formik.values.percentDiscount}
                    onChange={formik.handleChange}
                  />
                  <p className="opacity-40 text-xs mt-1">
                    Set a percentage discount to be set to this product
                  </p>
                  {formik.errors.percentDiscount && (
                    <div className="text-red-600">
                      {formik.errors.percentDiscount}
                    </div>
                  )}
                </div>
              </div>
            </ShouldRender>
          </Card>
          <div className="flex justify-end items-end">
            <Button
              type="button"
              className="mr-3 text-black hover:bg-[#f3f3f3] rounded-lg p-2 sm:p-3"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={addProductMutation.isPending}
              loading={addProductMutation.isPending}
              className="bg-[#3875d7] mr-3 hover:opacity-80 text-white rounded-lg p-2 sm:p-3"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddProduct;
