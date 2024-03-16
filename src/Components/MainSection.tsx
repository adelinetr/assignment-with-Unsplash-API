import ImageComponent from "./ImageComponent/ImageComponent";
import "./_styles/Styles.css";
import { useEffect, useRef, useState } from "react";
import { Photo } from "./Interface";
import Header from "./ImageComponent/Header";
import { FetchAPI } from "./FetchAPI";

export default function MainSection() {
  const API_KEY = process.env.REACT_APP_API_KEY as string;
  const PER_PAGE = process.env.REACT_APP_PER_PAGE as string;
  
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isLoading, setLoading] = useState(false);
  const bottomPageRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchPhotos(true);
  }, []);
  
  const fetchPhotos = async (loadNewList: boolean) => {
    try {
      setLoading(true);
      if (loadNewList) {
        const photos = await FetchAPI(API_KEY, searchQuery, 0, PER_PAGE);
        setPhotos(photos);
        setCurrentPage(1);
      } else {
        const newPage = currentPage + 1;
        const nextPagePhotos = await FetchAPI(
          API_KEY,
          searchQuery,
          newPage,
          PER_PAGE
        );
        setPhotos((prevPage) => [...prevPage, ...nextPagePhotos]);
        setCurrentPage(newPage);
      }
      console.log(currentPage);
    } catch (error) {
      console.log("Error fetching photos: ", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchQuery = () => {
    fetchPhotos(true);
  };

  const handleScroll = () => {
    if (
      bottomPageRef.current &&
      bottomPageRef.current.getBoundingClientRect().bottom <=
        window.innerHeight &&
      !isLoading
    ) {
      fetchPhotos(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentPage, isLoading]);

  return (
    <section data-testid="main-section">
      <div className="main-section">
        <Header
          searchQuery={searchQuery}
          onEnter={handleSearchQuery}
          onSearchClick={handleSearchQuery}
          onInputChanged={(searchQuery) => {
            setSearchQuery(searchQuery);
          }}
        />
        <div
          data-testid="photo-list"
          className="images-list"
          ref={bottomPageRef}
        >
          {photos.map((photo) => (
            <ImageComponent photo={photo} />
          ))}
        </div>
        {isLoading && <p>Loading...</p>}
      </div>
    </section>
  );
}
