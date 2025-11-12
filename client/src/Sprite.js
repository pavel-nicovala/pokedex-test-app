export function Sprite({ id, displayName, size = 32 }) {
  const src = `https://github.com/PokeAPI/sprites/raw/master/sprites/pokemon/${
    id ?? "0"
  }.png`;
  return (
    <img
      className="nes-avatar is-rounded is-large"
      src={src}
      alt={displayName}
    />
  );
}
