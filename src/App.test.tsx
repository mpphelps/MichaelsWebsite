import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MantineProvider, createTheme } from "@mantine/core";
import App from "./App";

const theme = createTheme({
  // your theme configuration
});

describe("App", () => {
  it("renders hello message", () => {
    render(
      <MantineProvider theme={theme}>
        <App />
      </MantineProvider>,
    );
    expect(screen.getByText("Hello Michael")).toBeInTheDocument();
  });
});
