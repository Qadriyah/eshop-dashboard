import Link from "next/link";
import React from "react";

const PasswordReset = () => {
  return (
    <div>
      <p className={`text-5xl text-center`}>Your password has</p>
      <p className={`text-5xl text-center my-2`}>Been changed successfully!</p>
      <p className="text-2xl my-10">
        Follow the link below to login with your new password
      </p>
      <div className="flex gap-2 justify-center">
        <p>Back to</p>
        <Link
          href="/"
          className="hover:text-blue-600 underline hover:font-bold"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default PasswordReset;
