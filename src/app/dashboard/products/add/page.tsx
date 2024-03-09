"use client";

import React from "react";
import ReactQuill from "react-quill";
import { PiImagesSquareDuotone } from "react-icons/pi";
import { SelectChangeEvent } from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import { Formik, Form } from "formik";
import Slider from "@mui/material/Slider";
import { MdOutlineUploadFile } from "react-icons/md";
import "react-quill/dist/quill.snow.css";
import Radio from "@mui/material/Radio";
import { useRouter } from "next/navigation";
import { useDispatchHook } from "@/redux/hooks/hooks";
import isValid from "@/validation/validateRequest";
import { createProductValidationSchema } from "@/validation/createProductSchema";
import { createProduct } from "@/redux/slices/products";
import ProductCard from "@/components/ProductCard";
import SelectComponent from "@/components/SelectComponent";
import Input from "@/components/Input";
import RadioComponent from "@/components/Radio";
import RadioInput from "@/components/RadioInput";
import ShouldRender from "@/components/ShouldRender";
import Button from "@/components/Button";

type Product = {
  discountType: string;
  percentDiscount: number | number[];
  fixedDiscount: string | number;
  productName: string;
  price: number | string;
  discount?: string | number;
  description?: any;
  quantity?: number;
  stock?: number;
  allowBackorders?: boolean;
  weight?: number;
  length?: number;
  width?: number;
  height?: number;
  image?: string;
  images?: string[];
};

const AddProduct: React.FC<{}> = (): JSX.Element => {
  const navigate = useRouter();
  const [status, setStatus] = React.useState<string>("");
  const [product, setProduct] = React.useState<Product>({
    productName: "",
    description: "",
    price: "",
    discountType: "None",
    percentDiscount: 10,
    fixedDiscount: "",
    quantity: +"",
    stock: +"",
    allowBackorders: false,
    weight: +"",
    length: +"",
    width: +"",
    height: +"",
    image: "",
    images: [],
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onChange = (field: string, value: any) => {
    setProduct((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSliderChange = (_event: Event, value: number | number[]) => {
    setProduct((prevState) => ({
      ...prevState,
      percentDiscount: value,
    }));
  };

  const dispatch = useDispatchHook();

  const handleSubmit = async () => {
    const parsedRequest = await isValid(createProductValidationSchema, product);
    const { errors } = parsedRequest;

    if (!errors || errors === "" || errors === undefined) {
      dispatch(
        createProduct({
          ...product,
          key: `${Math.round(Math.random() * 10000)}`,
          productId: `${Math.round(Math.random() * 10000)}`,
          status,
          image: "/assets/images/man_image.png",
        })
      );

      navigate.push("/dashboard/products");
    }

    errors && console.log(errors);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 opacity-90 text-[#152238]">
        Product Form
      </h2>
      <div className="w-full md:flex">
        <div className="mb-5 md:w-2/5">
          <ProductCard title="Thumbnail">
            <div className="label-shadow w-[150px] rounded-lg p-5 mx-auto">
              <label htmlFor="thumbnail" className="cursor-pointer">
                <input type="file" id="thumbnail" className="hidden" />
                <PiImagesSquareDuotone
                  fill="gray"
                  className="opacity-80 w-full h-[100px]"
                />
              </label>
            </div>
            <div>
              <p className="opacity-40 text-xs mt-3 text-center font-semibold">
                Set the product thumbnail image. Only *.png, *.jpg and *.jpeg
                image files are accepted
              </p>
            </div>
          </ProductCard>
          <ProductCard title="Status" showStatus={true}>
            <SelectComponent
              boxWidth="100%"
              label="status"
              value={status}
              handleChange={(event: SelectChangeEvent) =>
                setStatus(event.target.value as string)
              }
            >
              <MenuItem value={"published"} selected>
                Published
              </MenuItem>
              <MenuItem value={"scheduled"}>Scheduled</MenuItem>
              <MenuItem value={"draft"}>Draft</MenuItem>
              <MenuItem value={"inactive"}>Inactive</MenuItem>
            </SelectComponent>
            <p className="opacity-40 text-xs mt-1 font-semibold">
              Set the product status.
            </p>
          </ProductCard>
          <ProductCard title="Product details">
            <Formik
              validateOnBlur={false}
              validateOnMount={false}
              initialValues={{
                productName: "",
              }}
              onSubmit={() => {}}
            >
              <form>
                <Input
                  type="number"
                  name="quantity"
                  value={product.quantity}
                  placeholder="Quantity"
                  label="Quantity"
                  required
                  onChange={handleChange}
                />
                <Input
                  type="number"
                  name="stock"
                  value={product.stock}
                  placeholder="Stock"
                  label="Stock"
                  required
                  onChange={handleChange}
                />
                <Input
                  type="number"
                  name="weight"
                  value={product.weight}
                  placeholder="Weight"
                  label="Weight"
                  required
                  onChange={handleChange}
                />
                <Input
                  type="number"
                  name="length"
                  value={product.length}
                  placeholder="Length"
                  label="Length"
                  required
                  onChange={handleChange}
                />
                <Input
                  type="number"
                  name="width"
                  value={product.width}
                  placeholder="Width"
                  label="Width"
                  required
                  onChange={handleChange}
                />
                <Input
                  type="number"
                  name="height"
                  value={product.height}
                  placeholder="Height"
                  label="Height"
                  required
                  onChange={handleChange}
                />
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
              </form>
            </Formik>
          </ProductCard>
        </div>
        <div className="md:w-3/5 md:ml-5">
          <Formik
            validateOnBlur={false}
            validateOnMount={false}
            initialValues={{
              productName: "",
            }}
            onSubmit={handleSubmit}
          >
            <Form>
              <ProductCard title="General">
                <Input
                  value={product.productName}
                  name="productName"
                  placeholder="Product Name"
                  type="text"
                  label="Product Name"
                  required
                  onChange={handleChange}
                />
                <p className="opacity-40 text-xs -mt-2 font-semibold">
                  A product name is required and recommended to be unique.
                </p>
                <div className="mt-5 h-[250px]">
                  <label className="text-gray-500 font-semibold">
                    Description
                  </label>
                  <ReactQuill
                    theme="snow"
                    id="description"
                    onChange={(value) => onChange("description", value)}
                    value={product.description}
                    className="rounded-lg h-[140px]"
                    placeholder="Set a description to the product for better visibility."
                  />
                  <p className="opacity-40 text-xs md:mt-16 lg:mt-8 font-semibold mt-3 h-[40px]"></p>
                </div>
              </ProductCard>
              <ProductCard title="Media">
                <div className="border-dashed border cursor-pointer bg-[#d6e9fc] border-[dodgerblue] rounded-lg w-full p-2">
                  <label
                    htmlFor="uploads"
                    className="w-full flex cursor-pointer"
                  >
                    <MdOutlineUploadFile
                      fill="dodgerblue"
                      className="w-[60px] h-[100px] mr-3"
                    />
                    <span className="mt-6">
                      <p className="font-bold mb-1">
                        Drop files here or click her to upload
                      </p>
                      <p className="opacity-40 text-xs font-semibold">
                        Upload up to 10 files
                      </p>
                    </span>
                    <input type="file" className="hidden" id="uploads" />
                  </label>
                </div>
                <p className="opacity-40 text-xs mt-1 font-semibold">
                  Set the product media gallery
                </p>
              </ProductCard>
              <ProductCard title="Pricing">
                <Input
                  value={product.price}
                  name="price"
                  placeholder="Product Price"
                  type="number"
                  label="Base Price"
                  required
                  onChange={handleChange}
                  min={0}
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
                      value={product.fixedDiscount}
                      name="fixedDiscount"
                      placeholder="Discounted Price"
                      type="number"
                      label="Fixed Discounted Price"
                      required
                      onChange={handleChange}
                    />
                    <p className="opacity-40 text-xs mt-1 font-semibold">
                      Set the discounted product price. The product will be
                      reduced at the determined fixed price
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
                      value={product.percentDiscount}
                      onChange={handleSliderChange}
                    />
                    <p className="opacity-40 text-xs mt-1 font-semibold">
                      Set a percentage discount to be set to this product
                    </p>
                  </div>
                </ShouldRender>
              </ProductCard>
              <div className="flex justify-end items-end">
                <Button
                  type="button"
                  className="w-[100px] mr-3 text-black opacity-60 font-semibold hover:bg-[#f3f3f3] rounded-lg p-2 sm:p-3"
                  onClick={() => navigate.push("/dashboard/products")}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="w-[140px] bg-[#3875d7] mr-3 hover:opacity-80 text-white opacity-60 font-semibold rounded-lg p-2 sm:p-3"
                  onClick={handleSubmit}
                >
                  Create
                </Button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
