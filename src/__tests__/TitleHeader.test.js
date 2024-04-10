import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import TitleHeader from "../components/TitleHeader.jsx";
import App from "../App.jsx";


describe("TitleHeader Component", () => {

  let header;

  // RUNS CLEANUP BEFORE EACH TEST FOR REACT TESTING LIBRARY, SO USE BEFOREEACH HERE
  beforeEach(() => {
    header = render(
      <BrowserRouter>
        <TitleHeader />
      </BrowserRouter>
    );
  });

  test("renders the title AxoScan", () => {
    const titleElement = screen.getByText(/AxoScan/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders a link to home page", () => {
    const linkElement = screen.getByText('Home');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('id', 'link');
  })

  test("renders a link to profile page", () => {
    const linkElement = screen.getByText('Profile');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('id', 'link');
  })

  // test("renders the correct margin for the title", () => {
  //   const titleElement = screen.getByText(/AxoScan/i);
  //   expect(titleElement).toHaveStyle("margin: 10px"); // Replace with the actual margin value
  // });

  // test("renders the correct font weight for the title", () => {
  //   const titleElement = screen.getByText(/AxoScan/i);
  //   expect(titleElement).toHaveStyle("font-weight: bold"); // Replace with the actual font weight value
  // });

  // test("renders the correct font size for the title", () => {
  //   const titleElement = screen.getByText(/AxoScan/i);
  //   expect(titleElement).toHaveStyle("font-size: 24px"); // Replace with the actual font size value
  // });

  // test("renders with correct styles", () => {
  //   const titleElement = screen.getByText(/AxoScan/i);
  //   expect(titleElement).toHaveStyle({
  //     color: "white",
  //   });
  // });

  // test("renders the correct text alignment for the title", () => {
  //   // The title alignment is centered through flexbox on the parent, which might not be directly testable on the child.
  //   // Thus, consider removing this test or testing the parent div's style for flexbox centering (justifyContent and alignItems)
  // });

  // test("renders the correct background color for the title", () => {
  //   const titleElement = screen.getByText(/AxoScan/i);
  //   expect(titleElement).toHaveStyle("background-color: #272727");
  // });
});




