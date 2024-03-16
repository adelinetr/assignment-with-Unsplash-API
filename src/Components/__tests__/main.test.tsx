/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import * as FetchAPI from "../FetchAPI";
import MainSection from "../MainSection";

describe("Main Section", () => {
  const API_KEY = process.env.REACT_APP_API_KEY as string;
  const PER_PAGE = process.env.REACT_APP_PER_PAGE as string;
  const DEFAULT_QUERY = "";
  let fetchAPISpy: jest.SpyInstance;

  beforeEach(() => {
    cleanup();
    fetchAPISpy = jest.spyOn(FetchAPI, "FetchAPI");
  });

  afterEach(() => {
    fetchAPISpy.mockRestore();
  });

  test("renders main section and checks that the api loaded 10 images", async () => {
    const mainSection = <MainSection />;
    ({ getByTestId } = render(mainSection));

    expect(screen.getByTestId("main-section")).toBeInTheDocument();

    await waitFor(async () => {
      expect(fetchAPISpy).toHaveBeenCalledTimes(1);
      expect(fetchAPISpy).toHaveBeenCalledWith(
        API_KEY,
        DEFAULT_QUERY,
        0,
        PER_PAGE
      );
      const imageComponents = screen.getAllByTestId("image-container");
      expect(imageComponents.length).toBeGreaterThan(0);
      expect(imageComponents.length).toBeLessThan(13);
    });
  });

  test("loads new data at page 0 when a query is added and search button is clicked", async () => {
    const { getByTestId } = render(<MainSection />);

    const searchInput = getByTestId("search-input");
    const searchButton = getByTestId("search-button");

    await waitFor(() => {
      expect(fetchAPISpy).toHaveBeenCalledTimes(1);
      expect(fetchAPISpy).toHaveBeenCalledWith(API_KEY, "", 0, PER_PAGE);
    });
    fireEvent.change(searchInput, { target: { value: "cats" } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(fetchAPISpy).toHaveBeenCalledTimes(2);
      expect(fetchAPISpy).toHaveBeenCalledWith(API_KEY, "cats", 0, PER_PAGE);
    });
  });

  test("fetches new data when scrolled to the bottom of the list", async () => {
    const mainSection = <MainSection />;
    ({ getByTestId } = render(mainSection));
    const photoList = screen.getByTestId("photo-list");
    photoList.style.height = "300px";
    photoList.style.overflowY = "scroll";

    expect(fetchAPISpy).toHaveBeenCalledWith(
      API_KEY,
      DEFAULT_QUERY,
      0,
      PER_PAGE
    );

    await fireEvent.scroll(photoList, {
      target: { scrollY: photoList.scrollHeight },
    });

    console.log("Scroll position after scrolling:", window.scrollY);
    /*
      Worked on this for a whole day trying to make it work, but realised that
      during these regular react tests layout is not fully rendered as expected on the browser
    */
    await waitFor(() => {
      expect(fetchAPISpy).toHaveBeenCalledTimes(2);
      expect(fetchAPISpy).toHaveBeenCalledWith(
        API_KEY,
        DEFAULT_QUERY,
        1,
        PER_PAGE
      );
    });
  });
});
