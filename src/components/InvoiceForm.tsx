import React from "react";

type InvoiceFormProps = {
  nameName: string;
  nameValue: string;
  textareaName: string;
  textareaValue: string;
  emailName: string;
  emailValue: string;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  label: string;
  textareaPlaceholder: string;
};

const InvoiceForm: React.FC<InvoiceFormProps> = ({
  nameName,
  nameValue,
  textareaName,
  textareaValue,
  emailName,
  emailValue,
  handleChange,
  label,
  textareaPlaceholder,
}): JSX.Element => {
  return (
    <>
      <label className="font-semibold text-sm opacity-75">{label}</label>
      <input
        type="text"
        name={nameName}
        value={nameValue}
        onChange={handleChange}
        placeholder="Name"
        className="border font-[400] opacity-80 border-[#f3f3f3] rounded-md mt-3 outline-none p-3 w-full"
      />
      <input
        type="email"
        name={emailName}
        value={emailValue}
        onChange={handleChange}
        placeholder="email"
        className="border font-[400] opacity-80 border-[#f3f3f3] rounded-md mt-3 outline-none p-3 w-full"
      />
      <textarea
        name={textareaName}
        value={textareaValue}
        onChange={handleChange}
        placeholder={textareaPlaceholder}
        className="border font-[400] opacity-70 border-[#f3f3f3] rounded-md mt-3 outline-none p-3 w-full"
        rows={3}
      ></textarea>
    </>
  );
};

export default InvoiceForm;
