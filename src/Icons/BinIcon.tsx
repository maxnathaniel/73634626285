interface Props {
  onClick: () => void;
}

export const BinIcon = ({ onClick }: Props) => {
  return (
    <svg onClick={onClick} viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M7 4V2h10v2h5v2h-2v15a1 1 0 01-1 1H5a1 1 0 01-1-1V6H2V4h5zM6 6v14h12V6H6zm3 3h2v8H9V9zm4 0h2v8h-2V9z" />
    </svg>
  );
};
