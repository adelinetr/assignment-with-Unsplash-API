export interface PhotosResponse {
  results: {
    id: string;
    urls: {
      full: string;
      regular: string;
      small: string;
    };
    user: {
      id: string;
      name: string;
    };
    tags: {
      source?: {
        title: string;
      };
    }[];
  }[];
}

export interface Photo {
  id: string;
  url_small: string;
  url_medium: string;
  url_large: string;
  title: string;
  name: string;
  itemId: string;
}
