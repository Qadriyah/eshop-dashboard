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
import { MdOutlineUploadFile } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { Space } from "antd";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import type { NextPage } from "next";
import Media from "../../Media";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProduct, updateProduct } from "@/api/actions/product";
import { ProductType } from "@/types/entities";
import { DISCOUNT_TYPES, PRODUCT_STATUS } from "@/utils/constants";
import {
  deleteProductImage,
  uploadProductIcon,
  uploadProductImage,
} from "@/api/actions/files";
import { formatErrors, notify } from "@/utils/helpers";
import { useFormik } from "formik";
import { updateProductValidationSchema } from "@/validation/productSchemas";
import TextArea from "@/components/TextArea";
import ConfirmationModal from "@/modals/ConfirmationModal";
import ProductIcon from "../../ProductIcon";
import Suspense from "@/components/Suspense";
import Loader from "@/components/Loader";
import { PageProps } from "@/types/pageProps";

const EditProduct: NextPage<PageProps> = ({ params }) => {
  const router = useRouter();
  const [previews, setPreviews] = React.useState<any[]>([]);
  const [showDeleteImageModal, setShowDeleteImageModal] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState("");
  const [product, setProduct] = React.useState<ProductType | null>(null);
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 10,
    onDrop: async (acceptedFiles) => {
      setPreviews((prevState) => {
        const images = acceptedFiles.map((file) => {
          const src = URL.createObjectURL(file);
          return (
            <Media
              key={file.name}
              imageSrc={src}
              onDeleteImage={onDeleteImage}
              loading={uploadImageMutation.isPending}
            />
          );
        });
        return [...prevState, ...images];
      });
      await handleImageUpload(acceptedFiles);
    },
  });

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["get-products"],
    queryFn: () => getProduct(params.productid),
  });

  const productIconMutation = useMutation({
    mutationKey: ["product-icon"],
    mutationFn: (image: FormData) => uploadProductIcon(params.productid, image),
  });

  const uploadImageMutation = useMutation({
    mutationKey: ["product-image"],
    mutationFn: (image: FormData) =>
      uploadProductImage(params.productid, image),
  });

  const deleteImageMutation = useMutation({
    mutationKey: ["delete-image"],
    mutationFn: (filePath: string) =>
      deleteProductImage(params.productid, filePath),
  });

  const updateProductMutation = useMutation({
    mutationKey: ["update-product"],
    mutationFn: (data: ProductType) => updateProduct(params.productid, data),
  });

  const handleImageUpload = async (acceptedFiles: any) => {
    for (const file of acceptedFiles) {
      const formData = new FormData();
      formData.append("image", file);
      await uploadImageMutation.mutateAsync(formData);
    }
  };

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

  const onDeleteImage = (
    event: React.MouseEvent<HTMLDivElement> & {
      target: HTMLDivElement | HTMLImageElement;
    }
  ) => {
    event.stopPropagation();
    const { id } = event.target;
    setSelectedImage(id);
    setShowDeleteImageModal(true);
  };

  const confirmDeleteImage = async () => {
    const { errors } = await deleteImageMutation.mutateAsync(selectedImage);
    if (errors) {
      notify(errors[0].message, "error");
      return;
    }
    refetch();
    setShowDeleteImageModal(false);
    notify("Image has been deleted successfully", "success");
  };

  const handleSubmit = async (values: any) => {
    const { errors, message } = await updateProductMutation.mutateAsync(values);
    if (errors) {
      formik.setErrors(formatErrors(errors));
      return;
    }
    notify(message, "success");
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

  return (
    <Suspense
      fallback={
        <div className="p-20 w-full flex items-center justify-center">
          <Loader color="black" />
        </div>
      }
      loading={isLoading}
    >
      <form onSubmit={formik.handleSubmit}>
        <PageHeader title="Edit Product" params={params} />
        <div className="w-full flex flex-col lg:flex-row gap-5">
          <div className="w-full lg:w-2/5 flex flex-col gap-5">
            <ProductIcon
              icon={data?.product?.icon}
              loading={productIconMutation.isPending}
              handleFileChange={handleFileChange}
            />
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
              <div>
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
                Media
              </h2>
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
                      <p className="opacity-40 text-xs">
                        Upload up to 10 files
                      </p>
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
                    Set the discounted product price. The product will be
                    reduced at the determined fixed price
                  </p>
                </div>
              </ShouldRender>
              <ShouldRender
                visible={
                  formik.values.discountType === DISCOUNT_TYPES.percentage
                }
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
                disabled={updateProductMutation.isPending}
                loading={updateProductMutation.isPending}
                className="bg-[#3875d7] mr-3 hover:opacity-80 text-white rounded-lg p-2 sm:p-3"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
        <ShouldRender visible={showDeleteImageModal}>
          <ConfirmationModal
            title="Delete Image"
            message="Are you sure you want to delete this image?"
            open={showDeleteImageModal}
            handleOk={confirmDeleteImage}
            handleClose={() => setShowDeleteImageModal(false)}
            loading={deleteImageMutation.isPending}
          />
        </ShouldRender>
      </form>
    </Suspense>
  );
};

export default EditProduct;
