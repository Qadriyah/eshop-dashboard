import React from "react";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import { useComponentWillMount } from "./hooks";
import { getItem } from "@/api/localstorage";

export default function withAuth(WrappedComponent: any) {
  return function NewComponent(props: any) {
    const session = useComponentWillMount(() => {
      const sessionId = Cookies.get("_session-token");
      const user = getItem("user");
      if (!sessionId && !user) {
        return redirect("/");
      }
      return sessionId;
    });

    return <WrappedComponent {...props} isAuthenticated={session} />;
  };
}
