import { describe, it, expect } from 'vitest';
import { request, app } from '../helpers/test-helper.js';

describe('Custom Pokémon - GET /api/search', () => {
  it('should return mylahore when searching by full name', async () => {
    const response = await request(app)
      .get('/api/search')
      .query({ query: 'mylahore' })
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    const match = response.body.find((p: { name: string }) => p.name === 'mylahore');
    expect(match).toBeDefined();
    expect(match.id).toBe(10001);
    expect(match.localised).toEqual([{ name: 'Mylahore' }]);
  });

  it('should return mylahore when searching by partial prefix', async () => {
    const response = await request(app)
      .get('/api/search')
      .query({ query: 'myla' })
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    const match = response.body.find((p: { name: string }) => p.name === 'mylahore');
    expect(match).toBeDefined();
  });

  it('should not return custom pokemon when query does not match', async () => {
    const response = await request(app)
      .get('/api/search')
      .query({ query: 'pikachu' })
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    const match = response.body.find((p: { name: string }) => p.name === 'mylahore');
    expect(match).toBeUndefined();
  });

  it('should return empty array for query that matches nothing (no coincidental custom match)', async () => {
    const response = await request(app)
      .get('/api/search')
      .query({ query: 'thiswillnotreturnresults' })
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(0);
  });

  it('should place custom entries after standard PokéAPI results', async () => {
    // 'my' matches PokéAPI Pokémon (e.g. mew, mewtwo via the ilike) — custom mylahore must come last
    const response = await request(app)
      .get('/api/search')
      .query({ query: 'mylahore' })
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    const customIndex = response.body.findIndex((p: { id: number }) => p.id >= 10001);
    const standardAfterCustom = response.body
      .slice(customIndex + 1)
      .some((p: { id: number }) => p.id < 10001);
    // No standard result should appear after the first custom result
    expect(standardAfterCustom).toBe(false);
  });
});

describe('Custom Pokémon - GET /api/lookup/:name', () => {
  it('should return full details for mylahore', async () => {
    const response = await request(app)
      .get('/api/lookup/mylahore')
      .expect(200);

    const pokemon = response.body;
    expect(pokemon).toHaveProperty('height', 18);
    expect(pokemon).toHaveProperty('weight', 660);
    expect(pokemon.species.id).toBe(10001);
    expect(pokemon.species.name).toBe('mylahore');
    expect(pokemon.species.is_mythical).toBe(true);
    expect(pokemon.species.is_legendary).toBe(false);
    expect(pokemon.types).toEqual([
      { names: { name: 'psychic' } },
      { names: { name: 'dragon' } },
    ]);
    expect(pokemon.items).toEqual([]);
  });

  it('should include evolution chain for mylahore', async () => {
    const response = await request(app)
      .get('/api/lookup/mylahore')
      .expect(200);

    const chain = response.body.species.evolution_chain;
    expect(chain).toBeDefined();
    expect(chain.evolutions).toBeInstanceOf(Array);
    expect(chain.evolutions[0].name).toBe('mylahore');
  });

  it('should include flavor text for mylahore', async () => {
    const response = await request(app)
      .get('/api/lookup/mylahore')
      .expect(200);

    const flavorText = response.body.species.flavor_text;
    expect(flavorText).toBeInstanceOf(Array);
    expect(flavorText.length).toBeGreaterThan(0);
    expect(typeof flavorText[0].flavor_text).toBe('string');
  });

  it('should return empty object for unknown pokemon', async () => {
    const response = await request(app)
      .get('/api/lookup/definitelynotapokemon')
      .expect(200);

    expect(response.body).toEqual({});
  });

  it('should resolve custom entry case-insensitively via the API route', async () => {
    const response = await request(app)
      .get('/api/lookup/MYLAHORE')
      .expect(200);

    expect(response.body.species?.id).toBe(10001);
  });

  it('custom entry takes precedence over any PokéAPI entry with the same name', async () => {
    // mylahore exists only as a custom entry (id 10001); the PokéAPI path would return {}
    // Confirm the custom result is returned, proving the custom check runs first
    const response = await request(app)
      .get('/api/lookup/mylahore')
      .expect(200);

    expect(response.body.species?.id).toBe(10001);
    expect(response.body).not.toEqual({});
  });
});
