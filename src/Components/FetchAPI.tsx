import { PhotosResponse } from "./Interface";

export async function FetchAPI(
  API_KEY: string,
  QUERY: string,
  PAGE_NUMBER: number,
  PER_PAGE: string
) {
  const DEFAULT_QUERY = process.env.REACT_APP_DEFAULT_QUERY as string;
  let endQuery = QUERY === "" ? DEFAULT_QUERY : QUERY;

  try {
    const url = `https://api.unsplash.com/search/photos?query=${endQuery}&client_id=${API_KEY}&page=${PAGE_NUMBER}&per_page=${PER_PAGE}&`;
    const response = await fetch(url);
    const data: PhotosResponse = await response.json();

    return data.results.map((result) => ({
      id: result.id,
      url_small: result.urls.small,
      url_medium: result.urls.regular,
      url_large: result.urls.full,
      title: result.tags.find((tag) => tag.source)?.source?.title || "No Title",
      name: result.user.name,
      itemId: result.user.id,
    }));
  } catch (error) {
    console.log("Error fetching photos:", error);
    return [];
  }
}
