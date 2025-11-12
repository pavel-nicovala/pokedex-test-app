import React from "react";

interface SpriteProps {
  id?: number;
  displayName?: string;
  size?: number;
}

export function Sprite({ id, displayName, size = 32 }: SpriteProps): JSX.Element {
  const src = `https://github.com/PokeAPI/sprites/raw/master/sprites/pokemon/${
    id ?? "0"
  }.png`;
  return (
    <img
      className="nes-avatar is-rounded is-large"
      src={src}
      alt={displayName}
      width={size}
      height={size}
    />
  );
}

