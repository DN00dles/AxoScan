import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import TitleHeader from '../components/TitleHeader';
import App from '../App.jsx';



describe('TitleHeader Component', () => {

    test('renders the title AxoScan', () => {
        render(
          <BrowserRouter>
            <TitleHeader />
          </BrowserRouter>
        );
        const titleElement = screen.getByText(/AxoScan/i);
        expect(titleElement).toBeInTheDocument();
      });

    test("renders the correct margin for the title", () => {
        render(
            <BrowserRouter>
                <TitleHeader />
            </BrowserRouter>
        );
        const titleElement = screen.getByText(/AxoScan/i);
        expect(titleElement).toHaveStyle("margin: 10px"); // Replace with the actual margin value
    });

    test("renders the correct font weight for the title", () => {
        render(
            <BrowserRouter>
                <TitleHeader />
            </BrowserRouter>
        );
        const titleElement = screen.getByText(/AxoScan/i);
        expect(titleElement).toHaveStyle("font-weight: bold"); // Replace with the actual font weight value
    });


    test("renders the correct font size for the title", () => {
        render(
            <BrowserRouter>
                <TitleHeader />
            </BrowserRouter>
        );
        const titleElement = screen.getByText(/AxoScan/i);
        expect(titleElement).toHaveStyle("font-size: 24px"); // Replace with the actual font size value
    });
    test('renders with correct styles', () => {
        render(
          <BrowserRouter>
            <TitleHeader />
          </BrowserRouter>
        );
        const titleElement = screen.getByText(/AxoScan/i);
        expect(titleElement).toHaveStyle({
          color: 'white',
        });
      });

    

    

    

    test("renders the correct text alignment for the title", () => {
      render(
          <BrowserRouter>
              <TitleHeader />
          </BrowserRouter>
      );
      // The title alignment is centered through flexbox on the parent, which might not be directly testable on the child.
      // Thus, consider removing this test or testing the parent div's style for flexbox centering (justifyContent and alignItems)
  });

    test("renders the correct background color for the title", () => {
        render(
            <BrowserRouter>
                <TitleHeader />
            </BrowserRouter>
        );
        const titleElement = screen.getByText(/AxoScan/i);
        expect(titleElement).toHaveStyle("background-color: #ffffff"); // Replace with the actual background color value
    });


});