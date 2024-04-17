import SignIn from "@/app/page";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Login", () => {
  it("should render the login page", () => {
    render(<SignIn />);
    const element = screen.getByRole("h2");
    expect(element).toBeInTheDocument();
  });
});
