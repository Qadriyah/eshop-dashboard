"use client";

import React from "react";
import ReactQuill from "react-quill";
import { SelectChangeEvent } from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import Slider from "@mui/material/Slider";
import "react-quill/dist/quill.snow.css";
import Radio from "@mui/material/Radio";
import { useRouter } from "next/navigation";
import { createProductValidationSchema } from "@/validation/createProductSchema";
import ProductCard from "@/components/ProductCard";
import SelectComponent from "@/components/SelectComponent";
import Input from "@/components/Input";
import RadioComponent from "@/components/Radio";
import RadioInput from "@/components/RadioInput.1";
import ShouldRender from "@/components/ShouldRender";
import Button from "@/components/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PageHeader from "@/components/PageHeader";
import { ProductType } from "@/types/entities";
import { useFormik } from "formik";
import { addProduct } from "@/api/actions/product";
import { FieldError, formatErrors } from "@/utils/helpers";

type PageParams = {
  params: {
    productid: string;
  };
};

type ErrorProps = {
  decriptionError?: string;
  percentageError?: string;
};

const AddProduct: React.FC<PageParams> = ({ params }): JSX.Element => {
  const navigate = useRouter();
  const [status, setStatus] = React.useState<string>("Active");
  const [product, setProduct] = React.useState<ProductType>({
    name: "",
    description: "",
    price: +"",
    discountType: "None",
    percentDiscount: 10,
    fixedDiscount: +"",
    stock: +"",
    allowBackorders: false,
    weight: +"",
    length: +"",
    width: +"",
    height: +"",
  });
  const [fieldErrors, setFieldErrors] = React.useState<ErrorProps>({
    decriptionError: "",
    percentageError: "",
  });

  const onChange = (field: string, value: any) => {
    setProduct((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSliderChange = (
    _event: Event,
    value: number | number[]
  ): void => {
    setProduct((prevState: any) => ({
      ...prevState,
      percentDiscount: value,
    }));
  };

  const queryCient = useQueryClient();

  const addProductMutation = useMutation({
    mutationKey: ["addProduct"],
    mutationFn: (data: ProductType) => addProduct(data),
    onSettled: () =>
      queryCient.invalidateQueries({
        queryKey: ["addProduct"],
      }),
  });

  const handleSubmit = async (values: ProductType) => {
    const myProduct: ProductType = {
      ...values,
      description: product.description,
      allowBackorders: product.allowBackorders,
      percentDiscount: product.percentDiscount,
      discountType: product.discountType,
    };

    if (!fieldErrors.percentageError) {
      const mutation = await addProductMutation.mutateAsync(myProduct);

      if (mutation.errors) {
        formik.setErrors(formatErrors(mutation.errors));
        const descError = mutation.errors.map((error) =>
          error.field === "description" ? error.message : ""
        );
        setFieldErrors((prevState) => ({
          ...prevState,
          decriptionError: descError[0],
        }));
      }
      if (!mutation.errors && !fieldErrors.percentageError) {
        setFieldErrors((prevState) => ({
          ...prevState,
          decriptionError: "",
        }));
        navigate.back();
      }
      console.log(mutation, "::::::");
    }
    // navigate.back();
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: +"",
      discountType: "None",
      percentDiscount: 10,
      fixedDiscount: +"",
      stock: +"",
      allowBackorders: false,
      weight: +"",
      length: +"",
      width: +"",
      height: +"",
      status,
    },
    validateOnBlur: true,
    validationSchema: createProductValidationSchema,
    onSubmit: handleSubmit,
  });

  React.useEffect(() => {
    if (product.discountType === "Percentage") {
      if (product.percentDiscount <= 0) {
        setFieldErrors((prevState) => ({
          ...prevState,
          percentageError: "Percentage discount shouldn'nt be 0",
        }));
      } else {
        setFieldErrors((prevState) => ({
          ...prevState,
          percentageError: "",
        }));
      }
    }
  }, [product.discountType, product.percentDiscount]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <PageHeader title="New Product" params={params} />
      <div className="w-full md:flex">
        <div className="mb-5 md:w-2/5">
          <ProductCard title="Status" showStatus={true}>
            <SelectComponent
              boxWidth="100%"
              label="status"
              value={status}
              handleChange={(event: SelectChangeEvent) =>
                setStatus(event.target.value as any)
              }
            >
              <MenuItem value={"Active"}>Active</MenuItem>
              <MenuItem value={"Inactive"}>Inactive</MenuItem>
            </SelectComponent>
            <p className="opacity-40 text-xs mt-1 font-semibold">
              Set the product status.
            </p>
          </ProductCard>
          <ProductCard title="Product details">
            <div>
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
                id="weight"
                type="number"
                name="weight"
                value={formik.values.weight}
                placeholder="Weight"
                label="Weight"
                onChange={formik.handleChange}
                error={formik.errors.weight}
              />
              <Input
                id="length"
                type="number"
                name="length"
                value={formik.values.length}
                placeholder="Length"
                label="Length"
                onChange={formik.handleChange}
                error={formik.errors.length}
              />
              <Input
                id="width"
                type="number"
                name="width"
                value={formik.values.width}
                placeholder="Width"
                label="Width"
                onChange={formik.handleChange}
                error={formik.errors.width}
              />
              <Input
                id="height"
                type="number"
                name="height"
                value={formik.values.height}
                placeholder="Height"
                label="Height"
                onChange={formik.handleChange}
                error={formik.errors.height}
              />
              <div className="mt-5">
                <RadioComponent
                  formLabel="Allow back order"
                  defaultValue={`${false}`}
                >
                  <RadioInput
                    value={false}
                    label="No"
                    handleClick={() => onChange("allowBackorders", false)}
                    control={<Radio />}
                  />
                  <RadioInput
                    value={true}
                    label="Yes"
                    handleClick={() => onChange("allowBackorders", true)}
                    control={<Radio />}
                  />
                </RadioComponent>
              </div>
            </div>
          </ProductCard>
        </div>
        <div className="md:w-3/5 md:ml-5">
          <ProductCard title="General">
            <Input
              id="name"
              value={formik.values.name}
              name="name"
              placeholder="Product Name"
              type="text"
              label="Product Name"
              required
              onChange={formik.handleChange}
              error={formik.errors.name}
            />
            <p className="opacity-40 text-xs mt-1 font-semibold">
              A product name is required and recommended to be unique.
            </p>
            <div className="mt-5 h-[250px]">
              <label className="text-gray-500">Description</label>
              <ReactQuill
                theme="snow"
                id="description"
                onChange={(value: any) => onChange("description", value)}
                value={product.description}
                className="rounded-lg h-[140px]"
                placeholder="Set a description to the product for better visibility."
              />
              {/* <p className="opacity-40 text-xs md:mt-16 lg:mt-8mt-3 h-[40px]"></p> */}
              <p className="text-sm text-red-500">
                {fieldErrors?.decriptionError}
              </p>
            </div>
          </ProductCard>
          <ProductCard title="Pricing">
            <Input
              name="price"
              id="price"
              value={formik.values.price}
              placeholder="Product Price"
              type="number"
              label="Base Price"
              required
              onChange={formik.handleChange}
              min={1}
              error={formik.errors.price}
            />
            <p className="opacity-40 text-xs mt-1 font-semibold">
              Set product price
            </p>
            <div className="mt-5 mb-4">
              <RadioComponent formLabel="Discount type" defaultValue="None">
                <RadioInput
                  value="None"
                  label="No Discount"
                  handleClick={() => onChange("discountType", "None")}
                  control={<Radio />}
                />
                <RadioInput
                  value="Percentage"
                  label="Percentage"
                  handleClick={() => onChange("discountType", "Percentage")}
                  control={<Radio />}
                />
                <RadioInput
                  value="Fixed"
                  label="Fixed Price"
                  handleClick={() => onChange("discountType", "Fixed")}
                  control={<Radio />}
                />
              </RadioComponent>
            </div>
            <ShouldRender visible={product.discountType === "Fixed"}>
              <div>
                <Input
                  id="fixedDiscount"
                  value={formik.values.fixedDiscount}
                  name="fixedDiscount"
                  placeholder="Discounted Price"
                  type="number"
                  label="Fixed Discounted Price"
                  required
                  onChange={formik.handleChange}
                />
                <p className="opacity-40 text-xs mt-1 font-semibold">
                  Set the discounted product price. The product will be reduced
                  at the determined fixed price
                </p>
              </div>
            </ShouldRender>
            <ShouldRender visible={product.discountType === "Percentage"}>
              <div>
                <p className="opacity-90 text-base font-medium">
                  Set discount Percentage
                </p>
                <p className="text-4xl font-bold text-center mt-3 mb-5">
                  <span>{product.percentDiscount}</span>
                  <sup>%</sup>
                </p>
                <Slider
                  color="primary"
                  name="percentDiscount"
                  value={product.percentDiscount}
                  onChange={handleSliderChange}
                />
                <p className="text-sm text-red-500">
                  {fieldErrors.percentageError}
                </p>
                <p className="opacity-40 text-xs mt-1 font-semibold">
                  Set a percentage discount to be set to this product
                </p>
              </div>
            </ShouldRender>
          </ProductCard>
          <div className="flex justify-end items-end">
            <Button
              type="button"
              className="w-[100px] mr-3 text-black opacity-60 hover:bg-[#f3f3f3] rounded-lg p-2 sm:p-3"
              onClick={() => navigate.push("/dashboard/products")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-[140px] bg-[#3875d7] mr-3 hover:opacity-80 text-white opacity-60 rounded-lg p-2 sm:p-3"
            >
              Create
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddProduct;
