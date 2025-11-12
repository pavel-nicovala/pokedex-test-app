import { Link, useParams } from "react-router-dom";
import { useDetails, findOtherDetails } from "./api/details";
import { Sprite } from "./Sprite";

export const Detail = () => {
  const { name } = useParams();
  const { loading, data: pokemon } = useDetails(name);
  const displayName = pokemon?.species.localised?.[0]?.name ?? name;
  if (loading) return null;
  return (
    <>
      <h1>
        <Sprite id={pokemon.species?.id} displayName={displayName} /> {displayName}
      </h1>
      <p>{pokemon.species.flavor_text?.[0]?.flavor_text.replace(/\n|\f/g, "  ")}</p>

      {loading || (
        <>
          <ACStats {...pokemon} />
          <br />
          <PercentageStats {...pokemon} />
          <br />
          <EvolutionChain {...pokemon} />
        </>
      )}

      <br />
      <Link to="/" title="Back" className="nes-btn">
        {"< Back"}
      </Link>
    </>
  );
};

function PercentageStats(pokemon) {
  return (
    <div className="nes-container with-title">
      <h2 className="title">Percentage Stats</h2>
      <div className="nes-field is-inline">
        <label for="base_happiness">
          Base happiness {pokemon?.species.base_happiness}%
        </label>
        <progress
          id="base_happiness"
          class="nes-progress"
          value={pokemon?.species.base_happiness}
          max={100}
          style={{ maxWidth: "60vw" }}
        />
      </div>
      <div className="nes-field is-inline">
        <label for="capture_rate">
          Capture rate {Math.round(pokemon?.species.capture_rate / 2.55)}%
        </label>
        <progress
          id="capture_rate"
          class="nes-progress"
          value={pokemon.species.capture_rate}
          max={255}
          style={{ maxWidth: "60vw" }}
        />
      </div>
      <div className="nes-field is-inline">
        <label for="gender_rate">
          Gender ratio {Math.round(pokemon?.species.gender_rate / 0.08)}%
        </label>
        <progress
          id="gender_rate"
          class="nes-progress"
          value={pokemon.species.gender_rate}
          max={8}
          style={{ maxWidth: "60vw" }}
        />
      </div>
    </div>
  );
}

function EvolutionChain(pokemon) {
  return (
    <div className="nes-container with-title">
      <h2 className="title">Evolution Chain</h2>
      {pokemon.species.evolution_chain.evolutions.length > 1 && pokemon.species.evolution_chain.evolutions.map((e) => (
        <div key={e.id}>
          <Link to={`/pokemon/${e.name}`}>
            <Sprite id={e.id} displayName={e.localised[0].name} />{" "}
            {e.localised[0].name}
          </Link>
        </div>
      ))}
    </div>
  );
}

function ACStats(pokemon) {
  return (
    <div className="nes-container with-title">
      <h2 className="title">Physical Stats</h2>
      <div>
        <table class="nes-table is-bordered">
          <tr>
            <td class="nes-field is-inline">PokéDex Number</td>
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
            <td>{pokemon.types.map((type) => { return type.names.name }).toString()}</td>
          </tr>
          {pokemon.items.length ? (
            <tr>
              <td>Held Items</td>
              <td>{pokemon.items.map((x) => { return x.item.name }).toString()}</td>
            </tr>
          ) : null }
        </table>
      </div>
    </div>
  );
}
