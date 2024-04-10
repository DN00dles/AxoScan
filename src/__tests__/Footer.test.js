import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

describe("Footer", () => {
  test("renders the footer component", () => {
    render(<Footer />);
    const footerElement = screen.getByTestId("footer");
    expect(footerElement).toBeInTheDocument();
  });

  test("renders the AxoGroup heading", () => {
    render(<Footer />);
    const headingElement = screen.getByText("AxoGroup");
    expect(headingElement).toBeInTheDocument();
  });

  test("renders the design team heading", () => {
    render(<Footer />);
    const headingElement = screen.getByText("Design Team:");
    expect(headingElement).toBeInTheDocument();
  });

  test("renders the names and GitHub links of the design team members", () => {
    render(<Footer />);
    const names = ["Sofia", "Aiden", "Austin", "Sean", "Dylan"];
    const urls = [
      "https://github.com/orgs/AxoGroup/people/sarhiri",
      "https://github.com/orgs/AxoGroup/people/AidenCarere",
      "https://github.com/orgs/AxoGroup/people/InvectivusTaco",
      "https://github.com/orgs/AxoGroup/people/sfryan95",
      "https://github.com/orgs/AxoGroup/people/dsterling7",
    ];

    for (let i = 0; i < names.length; i++) {
      const nameElement = screen.getByText(names[i]);
      expect(nameElement).toBeInTheDocument();

      const linkElement = screen.getByRole("link", { name: names[i] });
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute("href", urls[i]);
    }
  });
});
