import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDetails } from "./api/details";
import { Sprite } from "./Sprite";
import { PokemonDetails } from "./types";

interface PercentageStatsProps {
  pokemon: PokemonDetails;
}

function PercentageStats({ pokemon }: PercentageStatsProps): JSX.Element {
  return (
    <div className="nes-container with-title">
      <h2 className="title">Percentage Stats</h2>
      <div className="nes-field is-inline">
        <label htmlFor="base_happiness">
          Base happiness {pokemon?.species.base_happiness}%
        </label>
        <progress
          id="base_happiness"
          className="nes-progress"
          value={pokemon?.species.base_happiness}
          max={100}
          style={{ maxWidth: "60vw" }}
        />
      </div>
      <div className="nes-field is-inline">
        <label htmlFor="capture_rate">
          Capture rate {Math.round(pokemon?.species.capture_rate / 2.55)}%
        </label>
        <progress
          id="capture_rate"
          className="nes-progress"
          value={pokemon.species.capture_rate}
          max={255}
          style={{ maxWidth: "60vw" }}
        />
      </div>
      <div className="nes-field is-inline">
        <label htmlFor="gender_rate">
          Gender ratio {Math.round(pokemon?.species.gender_rate / 0.08)}%
        </label>
        <progress
          id="gender_rate"
          className="nes-progress"
          value={pokemon.species.gender_rate}
          max={8}
          style={{ maxWidth: "60vw" }}
        />
      </div>
    </div>
  );
}

interface EvolutionChainProps {
  pokemon: PokemonDetails;
}

function EvolutionChain({ pokemon }: EvolutionChainProps): JSX.Element {
  return (
    <div className="nes-container with-title">
      <h2 className="title">Evolution Chain</h2>
      {pokemon.species.evolution_chain && pokemon.species.evolution_chain.evolutions.length > 1 && 
        pokemon.species.evolution_chain.evolutions.map((e) => (
          <div key={e.id}>
            <Link to={`/pokemon/${e.name}`}>
              <Sprite id={e.id} displayName={e.localised[0]?.name} />{" "}
              {e.localised[0]?.name}
            </Link>
          </div>
        ))}
    </div>
  );
}

interface ACStatsProps {
  pokemon: PokemonDetails;
}

function ACStats({ pokemon }: ACStatsProps): JSX.Element {
  return (
    <div className="nes-container with-title">
      <h2 className="title">Physical Stats</h2>
      <div>
        <table className="nes-table is-bordered">
          <tbody>
            <tr>
              <td className="nes-field is-inline">PokéDex Number</td>
              <td>{pokemon.species.id}</td>
            </tr>
            <tr>
              <td>Height</td>
              <td>{pokemon.height}</td>
            </tr>
            <tr>
              <td>Weight</td>
              <td>{pokemon.weight}</td>
            </tr>
            <tr>
              <td>Types</td>
              <td>{pokemon.types.map((type) => type.names.name).join(", ")}</td>
            </tr>
            {pokemon.items.length ? (
              <tr>
                <td>Held Items</td>
                <td>{pokemon.items.map((x) => x.item.name).join(", ")}</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export const Detail: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const { loading, data: pokemon } = useDetails(name);
  const displayName = pokemon?.species.localised?.[0]?.name ?? name;

  if (loading || !pokemon) return null;

  return (
    <>
      <h1>
        <Sprite id={pokemon.species?.id} displayName={displayName} /> {displayName}
      </h1>
      <p>{pokemon.species.flavor_text?.[0]?.flavor_text.replace(/\n|\f/g, "  ")}</p>

      <ACStats pokemon={pokemon} />
      <br />
      <PercentageStats pokemon={pokemon} />
      <br />
      <EvolutionChain pokemon={pokemon} />

      <br />
      <Link to="/" title="Back" className="nes-btn">
        {"< Back"}
      </Link>
    </>
  );
};

