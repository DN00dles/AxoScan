import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import "@testing-library/jest-dom/extend-expect"; // Add this import for expect

jest.mock("axios");

describe("DragAndDrop", () => {
  beforeEach(() => {
    render(<DragAndDrop />);
  });

  test("renders drag and drop area", () => {
    const dragAndDropText = screen.getByText(
      /Click or drag file to this area to upload/i
    );
    expect(dragAndDropText).toBeInTheDocument();
  });

  test("uploads file successfully", async () => {
    const file = new File(["dummy content"], "dummy.txt", {
      type: "text/plain",
    });
    const uploadInput = screen.getByLabelText(/file/i);

    fireEvent.change(uploadInput, { target: { files: [file] } });

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      "/api/upload",
      expect.any(FormData)
    );

    // Simulate successful response from the server
    const response = { data: ["line item 1", "line item 2"] };
    axios.post.mockResolvedValueOnce(response);

    // Wait for the success message to appear
    const successMessage = await screen.findByText(
      /file uploaded successfully/i
    );
    expect(successMessage).toBeInTheDocument();

    // Verify that the line items are set
    const lineItems = screen.getByTestId("line-items");
    expect(lineItems).toHaveTextContent("line item 1");
    expect(lineItems).toHaveTextContent("line item 2");
  });

  test("displays error message on upload failure", async () => {
    const file = new File(["dummy content"], "dummy.txt", {
      type: "text/plain",
    });npm install --save-dev @testing-library/jest-domnpm install --save-dev @testing-library/jest-dom
    const uploadInput = screen.getByLabelText(/file/i);

    fireEvent.change(uploadInput, { target: { files: [file] } });

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      "/api/upload",
      expect.any(FormData)
    );

    // Simulate error response from the server
    const error = new Error("Upload failed");
    axios.post.mockRejectedValueOnce(error);

    // Wait for the error message to appear
    const errorMessage = await screen.findByText(/file upload failed/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
