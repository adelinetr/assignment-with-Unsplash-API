interface ButtonProps {
  className: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  name: string;
}

export default function Button(props: ButtonProps) {
  const { className, onClick, name } = props;
  return (
    <>
      <button className={className} onClick={onClick}>
        {name}
      </button>
    </>
  );
}
