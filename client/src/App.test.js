import { render, screen } from "@testing-library/react";
import App from "./App";

test("render Gateways", () => {
  render(<App />);
  const linkElement = screen.getByText("Gateways");
  expect(linkElement).toBeInTheDocument();
});
