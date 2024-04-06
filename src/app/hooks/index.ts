import React from "react";

export const useComponentWillMount = (callback: () => string | null) => {
  const session = React.useRef<string | null>(null);
  if (!session.current) {
    const sessionId = callback();
    session.current = sessionId;
  }

  return session.current;
};
