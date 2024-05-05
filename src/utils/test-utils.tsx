import React from "react";
import { RenderOptions, render } from "@testing-library/react";
import { AppRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import mockRouter from "next-router-mock";
import StoreProvider from "@/app/StoreProvider";
import QueryProvider from "@/app/QueryProvider";

const AllTheProviders: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <AppRouterContext.Provider value={mockRouter as any}>
      <StoreProvider>
        <QueryProvider>{children}</QueryProvider>
      </StoreProvider>
    </AppRouterContext.Provider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
