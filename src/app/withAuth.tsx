import React from "react";
import { useComponentWillMount } from "./hooks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getUser } from "@/lib/features/user";
import { GetProfile } from "@/api/actions/profile";

export default function withAuth(WrappedComponent: any) {
  return function NewComponent(props: any) {
    const session = React.useRef<string | null>(null);
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user.user);

    useComponentWillMount(() => {
      dispatch(getUser()).then((action) => {
        const payload = action.payload as GetProfile;
        session.current = payload.profile?.id!;
      });
      return session.current!;
    });

    return <WrappedComponent {...props} sessionId={session.current} />;
  };
}
