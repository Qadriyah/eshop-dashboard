import Link from "next/link";
import React from "react";

const SendInstructions = () => {
  return (
    <div>
      <p className={`text-5xl text-center leading-[60px]`}>
        Please check the email address you provided for instructions on how you
        can change your password!
      </p>
      <p className="text-2xl my-10 text-center">Thank you</p>
    </div>
  );
};

export default SendInstructions;
