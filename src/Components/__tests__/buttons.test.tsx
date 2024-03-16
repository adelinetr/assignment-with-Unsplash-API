import { fireEvent, render, screen } from "@testing-library/react";
import Button from "../Button";
import FavouritedBtn from "../ImageComponent/FavouritedBtn";

describe("Button Component", () => {
  const renderButton = () =>
    render(<Button className="btn" onClick={() => {}} name="Button" />);

  test("renders button", () => {
    renderButton();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});

describe("Favourite Button", () => {
  test("calls onClick function when clicked", () => {
    const handleFavouriteButton = jest.fn();
    render (<FavouritedBtn onClick={handleFavouriteButton} isFavourited={true} />)
    fireEvent.click(screen.getByTestId('favourite-btn'))
    expect(handleFavouriteButton).toHaveBeenCalled();
  }) 
});
