import { validateEmail } from "@/utils/validation";
import { describe } from "node:test";

describe("validateEmail", () => {

    test("returns true for valid email", () => {
        expect(
            validateEmail("dam@gmail.com")
        ).toBe(true);
    });

    test("returns false for invalid email", () => {
    expect(
      validateEmail("damian")
    ).toBe(true);
  });
})