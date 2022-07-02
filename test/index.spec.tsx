import Header from "../src/components/header";
import { render, screen } from "@testing-library/react";

describe("Headerコンポーネント ", () => {
  test("welcome text", () => {
    render(<Header />);
    expect(screen.getByText("Welcome to CLEAN NETWORK")).toBeTruthy();
  });
});
