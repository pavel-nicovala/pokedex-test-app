import { describe, it, expect } from 'vitest';
import { matchCustomPokemonSearch, lookupCustomPokemon } from '../../custom-pokemon.js';

describe('matchCustomPokemonSearch', () => {
  it('should match by full name', () => {
    const results = matchCustomPokemonSearch('gigel');
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe('gigel');
  });

  it('should match by prefix', () => {
    const results = matchCustomPokemonSearch('gig');
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe('gigel');
  });

  it('should match case-insensitively', () => {
    const results = matchCustomPokemonSearch('GIGEL');
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe('gigel');
  });

  it('should return empty array when query does not match any custom pokemon', () => {
    const results = matchCustomPokemonSearch('pikachu');
    expect(results).toEqual([]);
  });

  it('should return empty array for empty string', () => {
    const results = matchCustomPokemonSearch('');
    expect(results).toEqual([]);
  });

  it('should not treat trailing % as a wildcard (raw query, no stripping needed)', () => {
    const results = matchCustomPokemonSearch('gigel%');
    expect(results).toEqual([]);
  });
});

describe('lookupCustomPokemon', () => {
  it('should return details for gigel', () => {
    const result = lookupCustomPokemon('gigel');
    expect(result).not.toBeNull();
    expect(result!.species.name).toBe('gigel');
    expect(result!.species.id).toBe(10001);
  });

  it('should perform a case-insensitive lookup', () => {
    const result = lookupCustomPokemon('GIGEL');
    expect(result).not.toBeNull();
    expect(result!.species.name).toBe('gigel');
  });

  it('should return null for an unknown name', () => {
    const result = lookupCustomPokemon('pikachu');
    expect(result).toBeNull();
  });

  it('should return null for an empty string', () => {
    const result = lookupCustomPokemon('');
    expect(result).toBeNull();
  });
});
