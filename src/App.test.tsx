import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, it, expect } from "vitest";
import App from "./App";

describe("App Form", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders form elements", async () => {
    render(<App />);

    // Ensure input field is rendered
    await screen.findByRole("textbox", { name: /text/i });

    // Ensure dropdown is rendered
    await screen.findByRole("combobox", { name: /dropdown/i });

    // Ensure select is rendered
    await screen.findByRole("combobox", { name: /select/i });

    // Ensure submit button is rendered
    await screen.findByRole("button", { name: /submit/i });
  });

  it("validates required fields", async () => {
    render(<App />);

    const submitButton = await screen.findByRole("button", { name: /submit/i });

    // Click submit without filling fields
    await userEvent.click(submitButton);

    // Wait for validation messages
    await screen.findByText(/text is required/i);
  });

  it("submits form with valid input", async () => {
    render(<App />);

    const textInput = await screen.findByRole("textbox", {
      name: /text/i,
    });
    const dropdown = (await screen.findByRole("combobox", {
      name: /dropdown/i,
    })) as HTMLElement;
    const select = (await screen.findByRole("combobox", {
      name: /select/i,
    })) as HTMLElement;
    const submitButton = await screen.findByRole("button", { name: /submit/i });

    // Fill text input
    await userEvent.type(textInput, "Test Input");

    // Select a dropdown value
    fireEvent(dropdown, new CustomEvent("valueChanged", { detail: "2" }));

    fireEvent.change(select, { target: { value: "2" } });

    // Click submit
    await userEvent.click(submitButton);

    const results = await screen.findByTestId("results");
    expect(results.textContent).toBe(
      JSON.stringify({
        dropdown: "2",
        text: "Test Input",
        select: "2",
      })
    );
  });
});
