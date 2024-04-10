import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer.jsx";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";


describe("Footer", () => {

  let footer;

  beforeEach(() => {
    footer = render(
        <Footer />
    )
  });


  test("renders the DNoodle heading", () => {
    //const footerElement = screen.getByText("AxoGroup");
    const footerElement = screen.getByText('DNoodle');
    expect(footerElement).toBeInTheDocument();
  });

  test("renders the design team heading", () => {
    const footerElement = screen.getByText("Design Team:");
    expect(footerElement).toBeInTheDocument();
  });

  test("renders the names and GitHub links of the design team members", () => {
    const names = ["Jofia", "Jesse", "Jed", "Joseph", "Jack"];
    const urls = [
      "https://github.com/sarhiri",
      "https://github.com/JesseWowczuk",
      "https://github.com/TedPham397",
      "https://github.com/joeahn95",
      "https://github.com/ZackVandiver",
    ];

    for (let i = 0; i < names.length; i++) {
      // grab p tag element that has name
      const nameElement = screen.getByText(names[i]);
      expect(nameElement).toBeInTheDocument();

      // its sibling will be the corresponding persons github link
      const linkElement = nameElement.nextSibling;

      // check if github link exists AND is correct link
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute('href', urls[i]);
    }

  });
});
