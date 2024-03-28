import React from "react";

export const useComponentWillMount = (callback: () => string | undefined) => {
  const session = React.useRef<string>();
  if (!session.current) {
    const sessionId = callback();
    session.current = sessionId;
  }

  return session.current;
};
