import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../components/Home";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from '../store.js';

describe("Home component", () => {

  let home;

  // RUNS CLEANUP BEFORE EACH TEST FOR REACT TESTING LIBRARY, SO USE BEFOREEACH HERE
  beforeEach(() => {
    home = render(
      <Provider store = {store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );
  });

  // test("renders without errors", () => {
  //   const homeElement = screen.getByTestId("home-component");
  //   expect(homeElement).toBeInTheDocument();
  // });

  test("renders titleHeader", () => {
    const homeElement = screen.getByTestId("header");
    expect(homeElement).toBeInTheDocument();
  });

  // test("displays instructions when hasUploaded is false", () => {
  //   const instructionsElement = screen.getByText(/instructions/i);
  //   expect(instructionsElement).toBeInTheDocument();
  // });

  // test("displays pie and total when hasUploaded is true", () => {
  //   const uploadButton = screen.getByRole("button", { name: /upload/i });
  //   userEvent.click(uploadButton);

  //   const pieElement = screen.getByTestId("pie-chart");
  //   expect(pieElement).toBeInTheDocument();

  //   const totalElement = screen.getByTestId("total");
  //   expect(totalElement).toBeInTheDocument();
  // });
});