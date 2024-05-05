import "@testing-library/jest-dom";
import { userEvent } from "@testing-library/user-event";
import SignIn from "@/app/page";
import { render, screen } from "../src/utils/test-utils";
import Input from "@/components/Input";

describe("Login", () => {
  it("should render the login page", () => {
    render(<SignIn />);
    const element = screen.getByRole("heading", { name: "Sign In" });
    expect(element).toBeInTheDocument();
  });

  it("should render the google login button", () => {
    render(<SignIn />);
    const element = screen.getByRole("button", { name: "Sign in with Google" });
    expect(element).toBeInTheDocument();
  });

  describe("Email Input", () => {
    it("should render the input element", () => {
      render(
        <Input id="email" name="email" type="email" placeholder="Email" />
      );
      const element = screen.getByPlaceholderText(/email/i);
      expect(element).toBeInTheDocument();
    });

    it("should display error message on the input element", () => {
      render(
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          error="Email is required"
        />
      );
      const element = screen.getByText(/Email is required/i);
      expect(element).toBeInTheDocument();
      expect(element).toHaveClass("text-red-600");
    });

    it("should change the input element border to red with an error present", () => {
      render(
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          error="Email is required"
        />
      );
      const element = screen.getByPlaceholderText(/email/i);
      expect(element).toHaveClass("text-red-600");
    });

    it("should display a label on the input element", () => {
      render(
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          label="Email"
        />
      );
      const element = screen.getByText("Email");
      expect(element).toBeInTheDocument();
    });

    it('should show "*" for a required input element', () => {
      render(
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          label="Email"
          required
        />
      );
      const element = screen.getByText("*");
      expect(element).toBeVisible();
    });

    it("should not show '*' for a non-required input element", () => {
      render(
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          label="Email"
        />
      );
      const element = screen.queryByText("*");
      expect(element).not.toBeInTheDocument();
    });

    it("should be able to type into the input element", async () => {
      const user = userEvent.setup();
      render(
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          label="Email"
        />
      );
      const element = screen.getByPlaceholderText(/email/i);
      await user.type(element, "baker@gmail.com");
      expect(element).toHaveValue("baker@gmail.com");
    });
  });
});
