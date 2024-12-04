// ContentListing.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import ContentListing from "./ContentListing"; // Adjust the import path as necessary

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
    const movie1 = await screen.findByText(/Movie 1/i);
    const movie2 = await screen.findByText(/Movie 2/i);
    const movie3 = await screen.findByText(/Movie 3/i);

    // Check if the movies are rendered
    expect(movie1).toBeInTheDocument();
    expect(movie2).toBeInTheDocument();
    expect(movie3).toBeInTheDocument();
  });

  it("filters movies based on search term", async () => {
    render(<ContentListing />); // Render the component

    // Wait for the items to be displayed
    await screen.findByText(/Movie 1/i);

    // Simulate user typing in search input
    const searchInput = screen.getByPlaceholderText(/Search.../i);
    searchInput.value = "Movie 1"; // Set value directly for simplicity
    searchInput.dispatchEvent(new Event("input")); // Dispatch input event

    // Check if only Movie 1 is displayed
    expect(await screen.findByText(/Movie 1/i)).toBeInTheDocument();

    // Ensure other movies are not displayed
    expect(screen.queryByText(/Movie 2/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Movie 3/i)).not.toBeInTheDocument();
  });
});
