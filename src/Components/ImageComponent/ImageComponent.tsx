import { useEffect, useState } from "react";
import "../_styles/Styles.css";
import FavouritedBtn from "./FavouritedBtn";
import { Photo } from "../Interface";

interface ImageProps {
  photo: Photo;
}

export default function ImageComponent(props: ImageProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [favouriteItem, setFavouriteItem] = useState<boolean>(false);
  const { photo } = props;

  const handleHoverState = () => {
    setIsHovered(!isHovered);
  };

  const handleLoadedImages = () => {
    setLoaded(!loaded);
  };

  useEffect(() => {
    const isItemFavourited = localStorage.getItem(photo.id);
    setFavouriteItem(!!isItemFavourited);
  }, [photo.id]);

  /*
    Saves favourited item to Local Storage.
    The whole item is saved for potential implementation of 
    showing the list of only favourited items.
  */
  const saveFavouriteItem = () => {
    if (!favouriteItem) {
      localStorage.setItem(photo.id, JSON.stringify(photo));
    } else {
      localStorage.removeItem(photo.id);
    }
    setFavouriteItem(!favouriteItem);
  };

  return (
    <div className="image-component" data-testid="image-container">
      <div
        id={photo.id}
        onMouseEnter={handleHoverState}
        onMouseLeave={handleHoverState}
        className="image-container"
      >
        <img
          data-testid="image"
          loading="lazy"
          key={photo.id}
          className={`${loaded ? "loaded" : ""} image`}
          src={photo.url_small}
          srcSet={`${photo.url_small} 300w, ${photo.url_medium} 700w`}
          sizes="(max-width: 300px) 80vw, (max-width: 660px) 60vw, (max-width: 1050px) 40vw, 33.333vw"
          onLoad={handleLoadedImages}
          alt=""
        />
        <div className={`${isHovered ? "hover-component" : "hidden"}`}>
          <h5>{photo.title}</h5>
          <span></span>
          <h6>{photo.name}</h6>
          <FavouritedBtn
            onClick={saveFavouriteItem}
            isFavourited={JSON.parse(localStorage.getItem(photo.id) || "null")}
          />
        </div>
      </div>
    </div>
  );
}
