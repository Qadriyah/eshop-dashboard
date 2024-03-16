"use client";

import React from "react";
import Radio from "@mui/material/Radio";
import { PiImagesSquareDuotone } from "react-icons/pi";
import { Formik, Form } from "formik";
import { MenuItem } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { MdOutlineUploadFile } from "react-icons/md";
import Slider from "@mui/material/Slider";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import SelectComponent from "@/components/SelectComponent";
import Input from "@/components/Input";
import RadioComponent from "@/components/Radio";
import RadioInput from "@/components/RadioInput";
import ShouldRender from "@/components/ShouldRender";
import Button from "@/components/Button";
import { useParams } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getApi, updateApi } from "@/api";

interface Product_ {
  discountType: string;
  percentDiscount: number | number[];
  fixedDiscount: string | number;
  name: string;
  price: number | string;
  discount?: string | number;
  description?: any;
  // quantity?: number;
  stock?: number;
  allowBackorders?: boolean;
  weight?: number;
  length?: number;
  width?: number;
  height?: number;
  icon?: string;
  images?: string[];
  status?: string;
}

const EditProduct: React.FC<{}> = (): JSX.Element => {
  const navigate = useRouter();
  const params = useParams<{ productId: string }>();
  const productId = params?.productId;

  const { data }: any = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getApi({ url: `/products/${productId}` }),
  });

  // console.log(data?.product, "::::::");

  const [productToBeEdited] = React.useState<Product_>(data?.product);
  const [status, setStatus] = React.useState(productToBeEdited?.status);
  const [myProduct, setMyProduct] = React.useState<Product_>({
    name: productToBeEdited?.name,
    description: productToBeEdited?.description,
    price: productToBeEdited?.price,
    discountType: productToBeEdited?.discountType,
    percentDiscount: productToBeEdited?.percentDiscount,
    fixedDiscount: productToBeEdited?.fixedDiscount,
    // quantity: productToBeEdited?.quantity,
    stock: productToBeEdited?.stock,
    allowBackorders: false,
    weight: productToBeEdited?.weight,
    length: productToBeEdited?.length,
    width: productToBeEdited?.width,
    height: productToBeEdited?.height,
    icon: productToBeEdited?.icon,
    images: productToBeEdited?.images,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setMyProduct((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));

  const handleSliderChange = (event: Event, newValue: number | number[]) =>
    setMyProduct((prevState) => ({
      ...prevState,
      percentageDisc: newValue as number,
    }));

  const onChange = (field: string, value: any) =>
    setMyProduct((prevState) => ({ ...prevState, [field]: value }));

  // images
  const [thumbnail, setThumbnail] = React.useState<string>(
    `${productToBeEdited?.icon}`
  );
  const handleThumbnailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const myFiles = event.target.files as FileList;
    setThumbnail(`/assets/images/${myFiles[0].name}`);
  };

  const mutation = useMutation({
    mutationKey: ["products", productId],
    mutationFn: (data: any) =>
      updateApi({ url: `/products/${productId}`, data }),
  });
  const handleSubmit = (): void => {
    mutation.mutate(myProduct);
    if (mutation.isError) {
      console.log(mutation.error, ">>>>>");
    }
    console.log(mutation.data, "::::");
    navigate.push("/dashboard/products");
  };

  return (
    <Formik initialValues={myProduct} onSubmit={handleSubmit}>
      <Form>
        <h2 className="text-2xl font-bold mb-4 opacity-90 text-[#152238]">
          Product Form
        </h2>
        <div className="w-full md:flex">
          <div className="mb-5 md:w-2/5">
            <ProductCard title="Thumbnail">
              <div className="label-shadow w-[150px] rounded-lg p-5 mx-auto">
                <label htmlFor="thumbnail" className="cursor-pointer">
                  <input
                    type="file"
                    id="thumbnail"
                    name="thumbnails"
                    className="hidden"
                    onChange={handleThumbnailChange}
                  />
                  {!thumbnail ? (
                    <PiImagesSquareDuotone
                      fill="gray"
                      className="opacity-80 w-full h-[100px]"
                    />
                  ) : (
                    <img src={thumbnail} alt="" className="w-full h-[100px]" />
                  )}
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
                <MenuItem value={"Active"}>Active</MenuItem>
                <MenuItem value={"Inactive"}>Inactive</MenuItem>
              </SelectComponent>
              <p className="opacity-40 text-xs mt-1 font-semibold">
                Set the product status.
              </p>
            </ProductCard>
            <ProductCard title="Product details">
              <div>
                {/* <Input
                  type="number"
                  name="quantity"
                  value={myProduct.quantity}
                  placeholder="Quantity"
                  label="Quantity"
                  required
                  onChange={handleChange}
                /> */}
                <Input
                  type="number"
                  name="stock"
                  value={myProduct.stock}
                  placeholder="Stock"
                  label="Stock"
                  required
                  onChange={handleChange}
                />
                <Input
                  type="number"
                  name="weight"
                  value={myProduct.weight}
                  placeholder="Weight"
                  label="Weight"
                  required
                  onChange={handleChange}
                />
                <Input
                  type="number"
                  name="length"
                  value={myProduct.length}
                  placeholder="Length"
                  label="Length"
                  required
                  onChange={handleChange}
                />
                <Input
                  type="number"
                  name="width"
                  value={myProduct.width}
                  placeholder="Width"
                  label="Width"
                  required
                  onChange={handleChange}
                />
                <Input
                  type="number"
                  name="height"
                  value={myProduct.height}
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
              </div>
            </ProductCard>
          </div>
          <div className="md:w-3/5 md:ml-5">
            <ProductCard title="General">
              <Input
                name="name"
                value={myProduct.name}
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
                  onChange={(value) => onChange("desc", value)}
                  value={myProduct.description}
                  className="rounded-lg h-[140px]"
                  placeholder="Set a description to the product for better visibility."
                />
                <p className="opacity-40 text-xs md:mt-16 lg:mt-8 font-semibold mt-3 h-[40px]"></p>
              </div>
            </ProductCard>
            <ProductCard title="Media">
              <div className="border-dashed border cursor-pointer bg-[#d6e9fc] border-[dodgerblue] rounded-lg w-full p-2">
                <label htmlFor="uploads" className="w-full flex cursor-pointer">
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
              <label className="text-gray-500 font-semibold">
                Base Price{" "}
                <span className="text-red-500 font-bold text-sm ">*</span>
                <Input
                  type="text"
                  name="price"
                  value={myProduct.price}
                  placeholder="Product Price"
                  onChange={handleChange}
                />
              </label>
              <p className="opacity-40 text-xs mt-1 font-semibold">
                Set product price
              </p>
              <div className="mt-5 mb-4">
                <RadioComponent
                  formLabel="Discount type"
                  defaultValue="No Discount"
                >
                  <RadioInput
                    value="No Discount"
                    label="No Discount"
                    handleClick={() => onChange("discountType", "No Discount")}
                    control={<Radio />}
                  />
                  <RadioInput
                    value="Percentage"
                    label="Percentage"
                    handleClick={() => onChange("discountType", "Percentage")}
                    control={<Radio />}
                  />
                  <RadioInput
                    value="Fixed Price"
                    label="Fixed Price"
                    handleClick={() => onChange("discountType", "Fixed Price")}
                    control={<Radio />}
                  />
                </RadioComponent>
              </div>
              <ShouldRender visible={myProduct.discountType === "Fixed Price"}>
                <div>
                  <Input
                    value={myProduct.fixedDiscount}
                    name="fixedDisc"
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
              <ShouldRender visible={myProduct.discountType === "Percentage"}>
                <div>
                  <p className="opacity-90 text-base font-medium">
                    Set discount Percentage
                  </p>
                  <p className="text-4xl font-bold text-center mt-3 mb-5">
                    <span>{myProduct.percentDiscount}</span>
                    <sup>%</sup>
                  </p>
                  <Slider
                    color="primary"
                    value={+myProduct.percentDiscount}
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
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default EditProduct;
