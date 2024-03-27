import React from "react";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

export default function withAuth(WrappedComponent: any) {
  return function NewComponent(props: any) {
    const session = Cookies.get("_session-token");

    React.useEffect(() => {
      if (!session) {
        return redirect("/");
      }
    }, [session]);

    return <WrappedComponent {...props} isAuthenticated={session} />;
  };
}
