import "@testing-library/jest-dom";
import { userEvent } from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import SignIn from "@/app/page";
import { act, render, screen, waitFor } from "../src/utils/test-utils";
import Input from "@/components/Input";

describe("Login", () => {
  it("should render the login page", () => {
    render(<SignIn />);
    const element = screen.getByRole("heading", { name: "Sign In" });
    expect(element).toBeInTheDocument();
  });

  it("should render the google login button", () => {
    render(<SignIn />);
    const element = screen.getByRole("button", {
      name: /Sign in with Google/i,
    });
    expect(element).toBeInTheDocument();
  });

  it("should render the submit button", () => {
    render(<SignIn />);
    const element = screen.getByRole("button", { name: /login/i });
    expect(element).toBeInTheDocument();
  });

  it("should render the 'Forgot Password' link", () => {
    render(<SignIn />);
    const element = screen.getByRole("link", { name: "Forgot Password?" });
    expect(element).toBeInTheDocument();
  });

  it("should render the logo", () => {
    render(<SignIn />);
    const element = screen.getByRole("img", { name: "logo2" });
    expect(element).toBeInTheDocument();
  });

  it("should display empty fields validation errors", async () => {
    const user = userEvent.setup();
    render(<SignIn />);
    const button = screen.getByRole("button", { name: /login/i });
    await act(() => {
      user.click(button);
    });

    await waitFor(() => {
      const emailError = screen.getByText(/email is required/i);
      expect(emailError).toBeInTheDocument();
    });
    await waitFor(() => {
      const passwordError = screen.getByText(/password is required/i);
      expect(passwordError).toBeInTheDocument();
    });
  });

  it("should navigate to forgot password page", async () => {
    const user = userEvent.setup();
    render(<SignIn />);
    const link = screen.getByRole("link", { name: "Forgot Password?" });
    await act(() => {
      user.click(link);
    });

    await waitFor(() => {
      expect(mockRouter.asPath).toEqual("/forgot-password");
    });
  });
});
