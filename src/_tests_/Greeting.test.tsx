import { render, screen } from "@testing-library/react";
import Greeting from "@/components/Greeting";


describe("Greeting component", () => {

  // Test correct rendering
  test("renders user name", () => {
    render(<Greeting name="Damian" />);

    expect(
      screen.getByText("Hell Damian")
    ).toBeInTheDocument();
  });

});