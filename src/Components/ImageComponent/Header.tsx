import Button from "../Button";
import SearchIcon from "../icons/Search.svg";
import Input from "./Input";

interface HeaderProps {
  searchQuery: string;
  onSearchClick: React.MouseEventHandler<HTMLButtonElement>;
  onEnter: () => void;
  onInputChanged: (input: string) => void;
}

export default function Header(props: HeaderProps) {
  const { onSearchClick, onInputChanged, searchQuery, onEnter } = props;

  const handleClearFavourited = () => {
    Object.keys(localStorage).forEach((key) => {
      localStorage.removeItem(key);
      window.location.reload();
    });
  };

  return (
    <div className="header">
      <div className="input-container">
        <Input
          onEnter={onEnter}
          searchQuery={searchQuery}
          onInputChanged={(searchQuery) => onInputChanged(searchQuery)}
        />
        <button
          className="search-btn"
          data-testid="search-button"
          onClick={onSearchClick}
        >
          <img src={SearchIcon} alt="" />
          Search
        </button>
      </div>
      <div className="btn-div">
        <Button
          className="clear-favourites"
          onClick={handleClearFavourited}
          name="Clear Favourited Images"
        />
      </div>
    </div>
  );
}
