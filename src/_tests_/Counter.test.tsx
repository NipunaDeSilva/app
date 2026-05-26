import {render, screen, fireEvent} from "@testing-library/react";
import Counter from "@/components/Counter";

describe("Counter component", () => {

    test("counter component", () => {
        render(<Counter />);

        const button = screen.getByText("Increase");
        fireEvent.click(button);

        expect(
            screen.getByText("1")
        ).toBeInTheDocument();
    });
});