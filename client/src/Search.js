import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSearch } from "./api/search";
import { Sprite } from "./Sprite";

export const Search = () => {
  const [query, setQuery] = useState("");
  const { get, abort, data: search } = useSearch(query);

  useEffect(() => {
    get();
    return () => abort();
  }, [abort, get, query]);
  return (
    <>
      <div class="nes-container is-centred">
        <h1>Pokédex Search</h1>
        <div className="nes-field is-inline">
          <label for="search_query">Search:</label>
          <input
            id="search_query"
            type="text"
            value={query}
            onChange={(e) => setQuery(() => e.target.value)}
            className="nes-input"
            pattern="^[a-zA-Z]$"
            required
          />
        </div>
      </div>
      {query && !query.match(/^[a-z]+$/) ? (
        <>
          <br />
          <ul className="nes-container">
            <p data-testid="invalid-term-error" class="note nes-text is-error">
              Invalid search term
            </p>
          </ul>
        </>
      ) : null }
      {query.match(/^[a-z]+$/) && search?.length ? (
        <>
          <br />
          <ul className="nes-container">
            {search.map(({ id, name, localised }) => (
              <li data-test-id="result" key={id}>
                <Link to={`/pokemon/${name}`}>
                  <Sprite id={id} displayName={localised[0].name} size={96} />
                  {localised[0].name}
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : null }
      {query.match(/^[a-z]+$/) && search?.length === 0 ? (
        <>
          <br />
          <ul className="nes-container">
            <p data-testid="no-results-message" class="note nes-text is-error">
              No Pokémon found!
            </p>
          </ul>
        </>
      ) : null }
    </>
  );
};
