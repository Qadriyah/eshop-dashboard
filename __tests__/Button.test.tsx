import "@testing-library/jest-dom";
import { render, screen } from "../src/utils/test-utils";
import Button from "@/components/Button";

describe("Button", () => {
  it("should render the button", () => {
    render(<Button>Click me</Button>);
    const element = screen.getByRole("button", { name: /click me/i });
    expect(element).toBeInTheDocument();
  });

  it("should show the spinner on the buttoon", () => {
    render(<Button loading={true}>Click me</Button>);
    const element = screen.getByRole("status");
    expect(element).toBeInTheDocument();
  });

  it("should disable the button", () => {
    render(<Button loading={true}>Click me</Button>);
    const element = screen.getByRole("button", { name: /click me/i });
    expect(element).toBeDisabled();
  });

  it("should change the button styles", () => {
    render(<Button className="bg-green-500">Click me</Button>);
    const element = screen.getByRole("button", { name: /click me/i });
    expect(element).toHaveClass("bg-green-500");
  });
});
