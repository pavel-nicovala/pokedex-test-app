import { describe, it, expect } from 'vitest';
import { request, app } from '../helpers/test-helper.js';

describe('Custom Pokémon - GET /api/search', () => {
  it('should return gigel when searching by full name', async () => {
    const response = await request(app)
      .get('/api/search')
      .query({ query: 'gigel' })
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    const match = response.body.find((p: { name: string }) => p.name === 'gigel');
    expect(match).toBeDefined();
    expect(match.id).toBe(10001);
    expect(match.localised).toEqual([{ name: 'Gigel' }]);
  });

  it('should return gigel when searching by partial prefix', async () => {
    const response = await request(app)
      .get('/api/search')
      .query({ query: 'gig' })
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    const match = response.body.find((p: { name: string }) => p.name === 'gigel');
    expect(match).toBeDefined();
  });

  it('should not return gigel when query does not match', async () => {
    const response = await request(app)
      .get('/api/search')
      .query({ query: 'pikachu' })
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    const match = response.body.find((p: { name: string }) => p.name === 'gigel');
    expect(match).toBeUndefined();
  });

  it('should return empty array for query that matches nothing', async () => {
    const response = await request(app)
      .get('/api/search')
      .query({ query: 'thiswillnotreturnresults' })
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(0);
  });

  it('should place custom entries after standard PokéAPI results', async () => {
    // 'g' matches many standard PokéAPI Pokémon (gastly, gengar, geodude, etc.) AND 'gigel',
    // so both result types will be present and ordering can be verified non-vacuously.
    const response = await request(app)
      .get('/api/search')
      .query({ query: 'g' })
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);

    const standardResults = response.body.filter((p: { id: number }) => p.id < 10001);
    const customIndex = response.body.findIndex((p: { id: number }) => p.id >= 10001);

    // Both standard and custom results must be present for the ordering assertion to be meaningful
    expect(standardResults.length).toBeGreaterThan(0);
    expect(customIndex).toBeGreaterThan(-1);

    // All standard entries must come before the first custom entry
    expect(customIndex).toBeGreaterThanOrEqual(standardResults.length);

    // No standard result should appear after the first custom result
    const standardAfterCustom = response.body
      .slice(customIndex + 1)
      .some((p: { id: number }) => p.id < 10001);
    expect(standardAfterCustom).toBe(false);
  });
});

describe('Custom Pokémon - GET /api/lookup/:name', () => {
  it('should return full details for gigel', async () => {
    const response = await request(app)
      .get('/api/lookup/gigel')
      .expect(200);

    const pokemon = response.body;
    expect(pokemon).toHaveProperty('height', 12);
    expect(pokemon).toHaveProperty('weight', 450);
    expect(pokemon.species.id).toBe(10001);
    expect(pokemon.species.name).toBe('gigel');
    expect(pokemon.species.is_legendary).toBe(true);
    expect(pokemon.species.is_mythical).toBe(false);
    expect(pokemon.types).toEqual([
      { names: { name: 'fire' } },
      { names: { name: 'fighting' } },
    ]);
    expect(pokemon.items).toEqual([]);
  });

  it('should include evolution chain for gigel', async () => {
    const response = await request(app)
      .get('/api/lookup/gigel')
      .expect(200);

    const chain = response.body.species.evolution_chain;
    expect(chain).toBeDefined();
    expect(chain.evolutions).toBeInstanceOf(Array);
    expect(chain.evolutions[0].name).toBe('gigel');
  });

  it('should include flavor text for gigel', async () => {
    const response = await request(app)
      .get('/api/lookup/gigel')
      .expect(200);

    const flavorText = response.body.species.flavor_text;
    expect(flavorText).toBeInstanceOf(Array);
    expect(flavorText.length).toBeGreaterThan(0);
    expect(typeof flavorText[0].flavor_text).toBe('string');
  });

  it('should resolve gigel case-insensitively', async () => {
    const response = await request(app)
      .get('/api/lookup/GIGEL')
      .expect(200);

    expect(response.body.species?.id).toBe(10001);
  });

  it('should return empty object for unknown pokemon', async () => {
    const response = await request(app)
      .get('/api/lookup/definitelynotapokemon')
      .expect(200);

    expect(response.body).toEqual({});
  });

  it('custom entry takes precedence over any PokéAPI entry with the same name', async () => {
    const response = await request(app)
      .get('/api/lookup/gigel')
      .expect(200);

    expect(response.body.species?.id).toBe(10001);
    expect(response.body).not.toEqual({});
  });
});
