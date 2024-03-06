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
import { useDispatchHook, useSelectorHook } from "@/redux/hooks/hooks";
import { RootState } from "@/redux/store/store";
import { editProduct } from "@/redux/slices/products";
import ProductCard from "@/components/ProductCard";
import SelectComponent from "@/components/SelectComponent";
import Input from "@/components/Input";
import RadioComponent from "@/components/Radio";
import RadioInput from "@/components/RadioInput";
import ShouldRender from "@/components/ShouldRender";
import Button from "@/components/Button";
import { useParams } from "next/navigation";

const EditProduct: React.FC<{}> = (): JSX.Element => {
  const navigate = useRouter();
  const products = useSelectorHook((state: RootState) => state.products);
  const dispatch = useDispatchHook();
  const params = useParams<{ productId: string }>();
  const id = params?.productId;

  const productToBeEdited = products.find(
    (product) => product.productId === id
  );
  // console.log(productToBeEdited, "???????");
  const [status, setStatus] = React.useState<string>("");

  interface Product_ {
    name: string;
    desc: any;
    price: string | number;
    discountType: string;
    percentageDisc: number | string;
    fixedDisc: number | string;
  }
  const [myProduct, setMyProduct] = React.useState<Product_>({
    name: `${productToBeEdited?.productName}`,
    desc: `${!productToBeEdited?.description && ""}`,
    price: `${productToBeEdited?.price}`,
    discountType: "None",
    percentageDisc: `${!productToBeEdited?.description && 0}`,
    fixedDisc: "",
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
    `${productToBeEdited?.image}`
  );
  const handleThumbnailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const myFiles = event.target.files as FileList;
    setThumbnail(`/assets/images/${myFiles[0].name}`);
  };
  const handleSubmit = (): void => {
    dispatch(
      editProduct({
        productId: id as string,
        productName: myProduct.name,
        price: myProduct.price,
        status: status,
        discountType: myProduct.discountType,
        description: myProduct.desc,
        image: thumbnail,
      })
    );

    navigate.push("/dashboard/products");
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
        </div>
        <div className="md:w-3/5 md:ml-5">
          <Formik
            validateOnBlur={false}
            validateOnMount={false}
            initialValues={{
              name: "",
              desc: "",
              price: "",
              discountType: "",
              percentageDisc: "",
            }}
            onSubmit={() => {}}
          >
            <Form>
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
                    value={myProduct.desc}
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
                      handleClick={() =>
                        onChange("discountType", "No Discount")
                      }
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
                      handleClick={() =>
                        onChange("discountType", "Fixed Price")
                      }
                      control={<Radio />}
                    />
                  </RadioComponent>
                </div>
                <ShouldRender
                  visible={myProduct.discountType === "Fixed Price"}
                >
                  <div>
                    <Input
                      value={myProduct.fixedDisc}
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
                      <span>{myProduct.percentageDisc}</span>
                      <sup>%</sup>
                    </p>
                    <Slider
                      color="primary"
                      value={+myProduct.percentageDisc}
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
                  Save Changes
                </Button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
