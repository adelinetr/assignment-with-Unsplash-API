interface InputProps {
  searchQuery: string;
  onInputChanged: (input: string) => void;
  onEnter: () => void;
}

export default function Input(props: InputProps) {
  const { searchQuery, onInputChanged, onEnter } = props;
  
  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement> ) => {
    onInputChanged(event.target.value);
  };

  return (
    <input
      data-testid="search-input"
      value={searchQuery}
      onChange={handleSearchInputChange}
      onKeyDown={(event) => {
        if (event.key === 'Enter')
          onEnter();
      }}
      type="text"
      placeholder="Search by Category e.g. Nature "
    />
  );
}
