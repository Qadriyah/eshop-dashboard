"use client";

import React from "react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Input from "@/components/Input";
import PageHeader from "@/components/PageHeader";
import RadioComponent from "@/components/Radio";
import RadioInput from "@/components/RadioInput";
import SelectComponent from "@/components/SelectComponent";
import ShouldRender from "@/components/ShouldRender";
import { MenuItem, Radio, Slider } from "@mui/material";
import { CiEdit } from "react-icons/ci";
import { MdOutlineUploadFile } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { Space } from "antd";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import Media from "./Media";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProduct } from "@/api/actions/product";
import { ProductType } from "@/types/entities";
import { DISCOUNT_TYPES, PRODUCT_STATUS } from "@/utils/constants";
import { uploadProductIcon } from "@/api/actions/files";
import Loader from "@/components/Loader";
import { notify } from "@/utils/helpers";
import { useFormik } from "formik";
import { updateProductValidationSchema } from "@/validation/productSchemas";
import TextArea from "@/components/TextArea";

type PageParams = {
  params: {
    productid: string;
  };
};

const EditProduct: React.FC<PageParams> = ({ params }) => {
  const router = useRouter();
  const [files, setFiles] = React.useState<any[]>([]);
  const [previews, setPreviews] = React.useState<any[]>([]);
  const [product, setProduct] = React.useState<ProductType | null>(null);
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 10,
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
      setPreviews((prevState) => {
        const images = acceptedFiles.map((file) => {
          const src = URL.createObjectURL(file);
          return (
            <Media
              key={file.name}
              imageSrc={src}
              onDeleteImage={onDeleteImage}
            />
          );
        });
        return [...prevState, ...images];
      });
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["get-products"],
    queryFn: () => getProduct(params.productid),
  });

  const productIconMutation = useMutation({
    mutationKey: ["product-icon"],
    mutationFn: (image: FormData) => uploadProductIcon(params.productid, image),
  });

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { files } = event.target;
    if (!files) {
      return;
    }
    if (!product) {
      return;
    }

    const formData = new FormData();
    const file = files[0];
    formData.append("image", file);
    setProduct(
      (prevState) =>
        ({
          ...prevState,
          icon: URL.createObjectURL(file),
        } as ProductType)
    );

    const { errors } = await productIconMutation.mutateAsync(formData);
    if (errors) {
      notify(errors[0].message, "error");
    }
  };

  const onDeleteImage = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    console.log("Clicked");
  };

  const onChangeStatus = () => {};

  const handleSubmit = (values: any) => {
    console.log(values, "|||||", product);
  };

  const formik = useFormik({
    initialValues: {
      status: "",
      stock: +"",
      weight: +"",
      length: +"",
      width: +"",
      height: +"",
      allowBackorders: true,
      name: "",
      description: "",
      price: +"",
      discountType: "",
      fixedDiscount: +"",
      percentDiscount: +"",
    },
    validateOnBlur: true,
    validationSchema: updateProductValidationSchema,
    onSubmit: handleSubmit,
  });

  React.useEffect(() => {
    if (data?.product) {
      formik.setValues({
        status: data.product.status,
        stock: data.product.stock,
        weight: data.product.weight,
        length: data.product.length,
        width: data.product.width,
        height: data.product.height,
        allowBackorders: data.product.allowBackorders,
        name: data.product.name,
        description: data.product.description,
        price: data.product.price,
        discountType: data.product.discountType,
        fixedDiscount: data.product.fixedDiscount,
        percentDiscount: data.product.percentDiscount,
      });
      setProduct(data.product);
      setPreviews(() =>
        data.product.images.map((image) => (
          <Media key={image} imageSrc={image} onDeleteImage={onDeleteImage} />
        ))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.product]);

  const quillRef = React.useRef();

  return (
    <form onSubmit={formik.handleSubmit}>
      <PageHeader title="Edit Product" params={params} />
      <div className="w-full flex flex-col lg:flex-row gap-5">
        <div className="w-full lg:w-2/5 flex flex-col gap-5">
          <Card>
            <h2 className="text-2xl mb-4 opacity-90 text-[#152238]">
              Thumbnail
            </h2>
            <div className="label-shadow w-[150px] h-[150px] rounded-lg p-5 mb-5 mx-auto my-auto">
              <div
                className={`${product?.icon ? "opacity-100" : "opacity-50"}`}
                style={{
                  backgroundImage: `url(${
                    product?.icon || "/assets/images/picture.png"
                  })`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  width: 110,
                  height: 110,
                }}
              />
              <label htmlFor="thumbnail">
                <div className="border border-gray-200 p-1 rounded-full bg-gray-200 cursor-pointer hover:bg-gray-400 hover:text-white flex justify-center items-center h-10 w-10 relative -top-[145px] -right-[105px]">
                  <CiEdit />
                </div>
                <input
                  type="file"
                  id="thumbnail"
                  name="thumbnails"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".png, .jpg, .webp, .jpeg"
                />
              </label>
              <ShouldRender visible={productIconMutation.isPending}>
                <div className="relative -top-[150px] flex justify-center items-center h-[110px] opacity-50 bg-gray-300">
                  <Loader color="black" />
                </div>
              </ShouldRender>
            </div>
          </Card>
          <Card>
            <div className="flex items-center mb-5">
              <h2 className="text-2xl opacity-90 text-[#152238] flex-1">
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
            <h2 className="text-2xl opacity-90 text-[#152238] mb-5">
              Product details
            </h2>
            <div>
              <Space direction="vertical" size={20}>
                <Input
                  id="stock"
                  type="number"
                  name="stock"
                  value={formik.values.stock}
                  placeholder="Stock"
                  label="Stock"
                  onChange={formik.handleChange}
                />
                <Input
                  type="number"
                  name="weight"
                  value={formik.values.weight}
                  placeholder="Weight"
                  label="Weight"
                  onChange={formik.handleChange}
                />
                <Input
                  type="number"
                  name="length"
                  value={formik.values.length}
                  placeholder="Length"
                  label="Length"
                  onChange={formik.handleChange}
                />
                <Input
                  type="number"
                  name="width"
                  value={formik.values.width}
                  placeholder="Width"
                  label="Width"
                  onChange={formik.handleChange}
                />
                <Input
                  type="number"
                  name="height"
                  value={formik.values.height}
                  placeholder="Height"
                  label="Height"
                  onChange={formik.handleChange}
                />
                <RadioComponent
                  id="allowBackorders"
                  name="allowBackorders"
                  formLabel="Allow back order"
                  defaultValue={`${true}`}
                  value={formik.values.allowBackorders}
                >
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
                </RadioComponent>
              </Space>
            </div>
          </Card>
        </div>
        <div className="flex-1 flex flex-col gap-5">
          <Card>
            <h2 className="text-2xl opacity-90 text-[#152238] mb-5">General</h2>
            <Input
              id="name"
              name="name"
              value={formik.values.name}
              placeholder="Product Name"
              type="text"
              label="Product Name"
              required
              onChange={formik.handleChange}
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
                required
                value={formik.values.description}
                onChange={formik.handleChange}
              />
            </div>
          </Card>
          <Card>
            <h2 className="text-2xl opacity-90 text-[#152238] mb-5">Media</h2>
            <div
              {...getRootProps({
                className:
                  "border-dashed border cursor-pointer bg-[#d6e9fc] border-[dodgerblue] rounded-lg w-full p-5 flex flex-wrap gap-5 justify-center",
              })}
            >
              <input {...getInputProps()} />
              {previews.length === 0 ? (
                <>
                  <MdOutlineUploadFile
                    fill="dodgerblue"
                    className="w-[60px] h-[100px] mr-2"
                  />
                  <span className="mt-6">
                    <p className="mb-1 text-sm">
                      Drop files here or click her to upload
                    </p>
                    <p className="opacity-40 text-xs">Upload up to 10 files</p>
                  </span>
                </>
              ) : (
                previews
              )}
            </div>
            <p className="opacity-40 text-xs mt-1 font-semibold">
              Set the product media gallery
            </p>
          </Card>
          <Card>
            <h2 className="text-2xl opacity-90 text-[#152238] mb-5">Pricing</h2>
            <Input
              id="price"
              type="text"
              name="price"
              label="Base Price"
              required
              value={formik.values.price}
              placeholder="Product Price"
              onChange={formik.handleChange}
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
                />
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
              className="bg-[#3875d7] mr-3 hover:opacity-80 text-white rounded-lg p-2 sm:p-3"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditProduct;
