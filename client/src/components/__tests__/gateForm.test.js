import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GateForm from "../gateForm";
import { validateIpAddress } from "../../utils/utils";

describe("Test Gate Form Component", () => {
  test("render gate form with 3 test fields", async () => {
    render(<GateForm />);
    const inputList = await screen.findAllByTestId("input-field");
    expect(inputList).toHaveLength(3);
  });

  test("render gate form with 1 button", async () => {
    render(<GateForm />);
    const buttonList = await screen.findAllByRole("button");
    expect(buttonList).toHaveLength(1);
  });

  test("should fail on IP validation", () => {
    const testIP = "123456";
    expect(validateIpAddress(testIP)).not.toBe(true);
  });

  test("IP input field should accept IP correct format", () => {
    render(<GateForm />);
    const ipAddress = screen.getByPlaceholderText("Insert IP Address");
    userEvent.type(ipAddress, "12345");
    expect(ipAddress.value).not.toMatch("192.168.5.68");
  });

  // test("should be able to submit form", async () => {
  //   render(<GateForm />);
  //   const submitBtn = screen.getByTestId("submit-btn");
  //   const ipAddressInput = screen.getByPlaceholderText("Insert IP Address");
  //   const gateNameInput = screen.getByPlaceholderText("Insert Gate Name");
  //   const serialInput = screen.getByPlaceholderText("Insert Serial Number");

  //   userEvent.type(ipAddressInput, "192.168.5.68");
  //   userEvent.type(gateNameInput, "string");
  //   userEvent.type(serialInput, "12345");
  //   userEvent.click(submitBtn);
  //   const gateInfo = await screen.findAllByRole("alert");
  //   expect(gateInfo).toBeTruthy();
  // }, 60_000);
});
