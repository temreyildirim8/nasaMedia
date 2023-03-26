import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import ShowPage from "./ShowPage";

jest.mock("axios");

describe("ShowPage", () => {
  const mockedAxios = axios;
  const mockCollectionData = {
    title: "Mock Collection",
    location: "Mock Location",
    secondary_creator: "Mock Creator",
    description: "Mock Description",
    keywords: ["Mock Keyword"],
    date_created: "2022-03-24T00:00:00Z",
  };
  const mockSelectedImage = "https://mock-image-url.com";

  beforeEach(() => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        collection: {
          items: [
            {
              data: [mockCollectionData],
              links: [{ href: mockSelectedImage }],
            },
          ],
        },
      },
    });
  });

  it("should render the collection details and image", async () => {
    const { history } = render(
      <MemoryRouter initialEntries={["/show/123"]}>
        <Routes>
          <Route path="/show/:id" element={<ShowPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://images-api.nasa.gov/search?nasa_id=123"
    );

    await screen.findByText(mockCollectionData.title);
    expect(screen.getByText(mockCollectionData.location)).toBeInTheDocument();
    expect(screen.getByText(`Creator: ${mockCollectionData.secondary_creator}`)).toBeInTheDocument();
    expect(screen.getByText(mockCollectionData.description)).toBeInTheDocument();
    expect(screen.getByText(`Keywords: ${mockCollectionData.keywords.join(", ")}`)).toBeInTheDocument();
    expect(screen.getByText(`Date Created: ${mockCollectionData.date_created}`)).toBeInTheDocument();
    expect(screen.getByAltText(mockCollectionData.title)).toHaveAttribute("src", mockSelectedImage);

    const backButton = screen.getByRole("button", { name: "< Back to Search" });
    fireEvent.click(backButton);
  });

  it("should render nothing if there is no collection data", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        collection: {
          items: [],
        },
      },
    });

    render(
      <MemoryRouter initialEntries={["/show/123"]}>
        <Routes>
          <Route path="/show/:id" element={<ShowPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://images-api.nasa.gov/search?nasa_id=123"
    );

    const backButton = screen.getByRole("button", { name: "< Back to Search" });
    fireEvent.click(backButton);
  });
});
