// TitleHeader.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TitleHeader from "../components/TitleHeader";

describe("TitleHeader Component", () => {
  test('renders the title "AxoScan"', () => {
    render(<TitleHeader />);
    const titleElement = screen.getByText(/AxoScan/i);
    expect(titleElement).toBeInTheDocument();
  });

  xtest("renders the correct title color", () => {
    render(<TitleHeader />);
    const titleElement = screen.getByText(/AxoScan/i);
    expect(titleElement).toHaveStyle("color: #000000"); // Replace with the actual color value
  });

  xtest("renders the correct font size for the title", () => {
    render(<TitleHeader />);
    const titleElement = screen.getByText(/AxoScan/i);
    expect(titleElement).toHaveStyle("font-size: 24px"); // Replace with the actual font size value
  });

  test("renders the correct font weight for the title", () => {
    render(<TitleHeader />);
    const titleElement = screen.getByText(/AxoScan/i);
    expect(titleElement).toHaveStyle("font-weight: bold"); // Replace with the actual font weight value
  });

  xtest("renders the correct margin for the title", () => {
    render(<TitleHeader />);
    const titleElement = screen.getByText(/AxoScan/i);
    expect(titleElement).toHaveStyle("margin: 10px"); // Replace with the actual margin value
  });
});
