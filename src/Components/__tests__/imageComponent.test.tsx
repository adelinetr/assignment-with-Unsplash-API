import { cleanup, render, screen } from "@testing-library/react";
import ImageComponent from "../ImageComponent/ImageComponent";
import { Photo } from "../Interface";

afterEach(() => {
  cleanup();
});

describe("Image Component", () => {
  const photo: Photo = {
    id: "1",
    url_small: "URL",
    url_medium: "URL",
    url_large: "URL",
    title: "Title",
    name: "Emily",
    itemId: "id1",
  };
  const renderComponent = () => render(<ImageComponent photo={photo} />);
  test("renders image", () => {
    renderComponent();
    const imageEl = screen.getByTestId("image");
    expect(imageEl).toBeInTheDocument();
  });

  test("renders image-container", () => {
    renderComponent();
    const imageContainer = screen.getByTestId("image-container");
    expect(imageContainer).toBeInTheDocument();
  });
});
