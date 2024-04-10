import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../components/Home";
import { BrowserRouter } from "react-router-dom";

describe("Home component", () => {
  test("renders without errors", () => {
    render(<Home />);
    const homeElement = screen.getByTestId("home-component");
    expect(homeElement).toBeInTheDocument();
  });

  test("displays instructions when hasUploaded is false", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const instructionsElement = screen.getByText(/instructions/i);
    expect(instructionsElement).toBeInTheDocument();
  });

  test("displays pie and total when hasUploaded is true", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const uploadButton = screen.getByRole("button", { name: /upload/i });
    userEvent.click(uploadButton);

    const pieElement = screen.getByTestId("pie-chart");
    expect(pieElement).toBeInTheDocument();

    const totalElement = screen.getByTestId("total");
    expect(totalElement).toBeInTheDocument();
  });
});