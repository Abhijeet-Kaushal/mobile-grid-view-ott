// ContentListing.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'; // Import jest-dom for additional matchers
import ContentListing from "./ContentListing";

// Mock data to be used in tests
const mockData = [
  { name: "The Birds", "poster-image": "poster1.jpg" },
  { name: "Rear Window", "poster-image": "poster2.jpg" },
  { name: "Family Pot", "poster-image": "poster3.jpg" },
];

describe("ContentListing", () => {
  // Mock fetch to return our mock data
  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            page: {
              "content-items": {
                content: mockData,
              },
            },
          }),
      })
    );
  });

  afterAll(() => {
    jest.restoreAllMocks(); // Restore original implementation after all tests
  });

  it("renders movies correctly", async () => {
    render(<ContentListing />); // Rendering the component

    // Waiting for the items to be displayed
    const movie1 = await screen.findByText(/The Birds/i);
    const movie2 = await screen.findByText(/Rear Window/i);
    const movie3 = await screen.findByText(/Family Pot/i);

    // Check if the movies are rendered
    expect(movie1).toBeInTheDocument();
    expect(movie2).toBeInTheDocument();
    expect(movie3).toBeInTheDocument();
  });
});