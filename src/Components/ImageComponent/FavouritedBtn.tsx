import CheckIcon from "../icons/Check.svg";
import "../_styles/Styles.css";

interface ButtonProps {
  onClick: () => void;
  isFavourited: boolean;

}
export default function FavouritedBtn(props: ButtonProps) {
  const { onClick, isFavourited } = props;
  const toggleFavouriteBtn = () => onClick();

  return (
    <button
      data-testid="favourite-btn"
      className={`${isFavourited ? "favourited" : ""} favourite-btn`}
      onClick={toggleFavouriteBtn}
    >
      <img
        className={`${isFavourited ? "check-icon clickedFadeIn" : "hidden"}`}
        src={CheckIcon}
        alt="Check Icon"
      />
      {`${isFavourited ? "Unfavourite" : "Favourite"}`}
    </button>
  );
}
