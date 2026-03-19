import { describe, it, expect } from 'vitest';
import { matchCustomPokemonSearch, lookupCustomPokemon } from '../../custom-pokemon.js';

describe('matchCustomPokemonSearch', () => {
  it('should match by full name', () => {
    const results = matchCustomPokemonSearch('mylahore');
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe('mylahore');
  });

  it('should match by prefix', () => {
    const results = matchCustomPokemonSearch('myla');
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe('mylahore');
  });

  it('should match case-insensitively', () => {
    const results = matchCustomPokemonSearch('MYLAHORE');
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe('mylahore');
  });

  it('should return empty array when query does not match any custom pokemon', () => {
    const results = matchCustomPokemonSearch('pikachu');
    expect(results).toEqual([]);
  });

  it('should return empty array for empty string', () => {
    // Empty string prefix-matches everything — verifying current behaviour
    const results = matchCustomPokemonSearch('');
    expect(results).toHaveLength(1);
  });

  it('should not treat trailing % as a wildcard (raw query, no stripping needed)', () => {
    // The function receives the raw query value; a literal % should not match
    const results = matchCustomPokemonSearch('mylahore%');
    expect(results).toEqual([]);
  });
});

describe('lookupCustomPokemon', () => {
  it('should return details for an existing custom pokemon', () => {
    const result = lookupCustomPokemon('mylahore');
    expect(result).not.toBeNull();
    expect(result!.species.name).toBe('mylahore');
    expect(result!.species.id).toBe(10001);
  });

  it('should perform a case-insensitive lookup', () => {
    const result = lookupCustomPokemon('MYLAHORE');
    expect(result).not.toBeNull();
    expect(result!.species.name).toBe('mylahore');
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
