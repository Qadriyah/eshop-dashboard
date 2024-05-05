import "@testing-library/jest-dom";
import SignIn from "@/app/page";
import { render, screen } from "../src/utils/test-utils";

describe("Login", () => {
  it("should render the login page", () => {
    render(<SignIn />);
    const element = screen.getByRole("heading", { name: "Sign In" });
    expect(element).toBeInTheDocument();
  });

  it("should contain a google login button", () => {
    render(<SignIn />);
    const element = screen.getByRole("button", { name: "Sign in with Google" });
    expect(element).toBeInTheDocument();
  });
});
