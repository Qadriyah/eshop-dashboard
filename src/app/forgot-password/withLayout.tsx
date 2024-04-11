"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function withLayout<T>(WrappedComponent: any) {
  return function NewComponent(props: T) {
    const router = useRouter();

    return (
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <div
            className="cursor-pointer md:hidden mt-20"
            onClick={() => router.push("/")}
          >
            <Image
              src="/assets/images/dlogo.png"
              width={70}
              height={40}
              alt="logo"
              className="mx-auto"
            />
            <div className="text-black text-center mt-5 text-xl opacity-90 font-bold">
              Delightful Beauty
            </div>
          </div>
          <div className="sm:w-[450px] md:w-full max-w-[550px] sm:mx-auto md:pl-10 md:pr-10">
            <p className="font-semibold opacity-70 text-center mt-14 mb-20 hidden md:block">
              Already a member?{" "}
              <Link href="/" className="text-[#4081e9]">
                Sign In
              </Link>
            </p>
            <div className="p-5">
              <h2 className="text-2xl font-semibold opacity-80 sm:text-3xl lg:text-4xl">
                Forgot Password?
              </h2>
            </div>
            <WrappedComponent {...props} />
          </div>
        </div>
        <div className="hidden md:block bg-[#4081e9] min-h-screen p-10 lg:p-20">
          <div className="cursor-pointer" onClick={() => router.push("/")}>
            <Image
              src="/assets/images/dlogo.png"
              width={70}
              height={40}
              alt="logo"
              className="mx-auto"
            />
            <div className="text-white text-center mt-5 text-3xl font-bold">
              Delightful Beauty
            </div>
          </div>
          <Image
            src="/assets/images/auth-screens.png"
            width={450}
            height={450}
            alt=""
            className="mx-auto my-20"
          />
          <p className="text-4xl text-white font-bold mt-8 text-center">
            Fast, Efficient and Reliable
          </p>
        </div>
      </div>
    );
  };
}
