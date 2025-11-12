import { describe, it, expect } from 'vitest';
import { request, app } from '../helpers/test-helper.js';

describe('GET /api/lookup/{name}', () => {
  describe('Successful lookups', () => {
    it('should return detailed pokemon information for valid name', async () => {
      const response = await request(app)
        .get('/api/lookup/pikachu')
        .expect(200);

      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty('height');
      expect(response.body).toHaveProperty('weight');
      expect(response.body).toHaveProperty('species');
      expect(response.body).toHaveProperty('types');
      expect(response.body).toHaveProperty('items');
    });

    it('should return pokemon with correct structure for lapras', async () => {
      const response = await request(app)
        .get('/api/lookup/lapras')
        .expect(200);

      expect(response.body).toBeInstanceOf(Object);
      
      // Validate physical stats
      expect(response.body.height).toBe(25);
      expect(response.body.weight).toBe(2200);
      
      // Validate species information
      expect(response.body.species).toHaveProperty('id');
      expect(response.body.species.id).toBe(131);
      expect(response.body.species).toHaveProperty('name');
      expect(response.body.species).toHaveProperty('localised');
      
      // Validate types
      expect(response.body.types).toBeInstanceOf(Array);
      expect(response.body.types.length).toBeGreaterThan(0);
      expect(response.body.types[0]).toHaveProperty('names');
      expect(response.body.types[0].names).toHaveProperty('name');
      
      // Validate held items (lapras has mystic-water)
      expect(response.body.items).toBeInstanceOf(Array);
      if (response.body.items.length > 0) {
        expect(response.body.items[0]).toHaveProperty('item');
        expect(response.body.items[0].item).toHaveProperty('name');
      }
    });

    it('should return species details with all required fields', async () => {
      const response = await request(app)
        .get('/api/lookup/pikachu')
        .expect(200);

      const species = response.body.species;
      
      expect(species).toHaveProperty('id');
      expect(species).toHaveProperty('name');
      expect(species).toHaveProperty('is_baby');
      expect(species).toHaveProperty('is_legendary');
      expect(species).toHaveProperty('is_mythical');
      expect(species).toHaveProperty('base_happiness');
      expect(species).toHaveProperty('capture_rate');
      expect(species).toHaveProperty('gender_rate');
      expect(species).toHaveProperty('has_gender_differences');
      expect(species).toHaveProperty('forms_switchable');
      expect(species).toHaveProperty('localised');
    });

    it('should return evolution chain when available', async () => {
      const response = await request(app)
        .get('/api/lookup/pikachu')
        .expect(200);

      if (response.body.species.evolution_chain) {
        expect(response.body.species.evolution_chain).toHaveProperty('evolutions');
        expect(Array.isArray(response.body.species.evolution_chain.evolutions)).toBe(true);
        
        if (response.body.species.evolution_chain.evolutions.length > 0) {
          const evolution = response.body.species.evolution_chain.evolutions[0];
          expect(evolution).toHaveProperty('id');
          expect(evolution).toHaveProperty('name');
          expect(evolution).toHaveProperty('localised');
        }
      }
    });

    it('should return flavor text when available', async () => {
      const response = await request(app)
        .get('/api/lookup/pikachu')
        .expect(200);

      if (response.body.species.flavor_text) {
        expect(Array.isArray(response.body.species.flavor_text)).toBe(true);
        
        if (response.body.species.flavor_text.length > 0) {
          const flavorText = response.body.species.flavor_text[0];
          expect(flavorText).toHaveProperty('id');
          expect(flavorText).toHaveProperty('flavor_text');
          expect(typeof flavorText.flavor_text).toBe('string');
        }
      }
    });

    it('should return empty object for pokemon that does not exist', async () => {
      const response = await request(app)
        .get('/api/lookup/thiswillnotreturnresults')
        .expect(200);

      // According to OpenAPI spec, returns empty object {} when not found
      expect(response.body).toBeInstanceOf(Object);
      expect(Object.keys(response.body).length).toBe(0);
    });
  });

  describe('Error handling', () => {
    it('should handle missing name parameter', async () => {
      const response = await request(app)
        .get('/api/lookup/')
        .expect(404);
    });

    it('should be case-sensitive for pokemon names', async () => {
      // The API might return empty object for case mismatch
      const response = await request(app)
        .get('/api/lookup/PIKACHU');

      // Could be 200 with empty object or 404
      expect([200, 404]).toContain(response.status);
    });
  });

  describe('Response structure validation', () => {
    it('should return valid PokemonDetails structure', async () => {
      const response = await request(app)
        .get('/api/lookup/lapras')
        .expect(200);

      // Validate height and weight are numbers
      expect(typeof response.body.height).toBe('number');
      expect(typeof response.body.weight).toBe('number');
      expect(response.body.height).toBeGreaterThan(0);
      expect(response.body.weight).toBeGreaterThan(0);

      // Validate types array
      expect(Array.isArray(response.body.types)).toBe(true);
      response.body.types.forEach((type: any) => {
        expect(type).toHaveProperty('names');
        expect(type.names).toHaveProperty('name');
        expect(typeof type.names.name).toBe('string');
      });

      // Validate items array
      expect(Array.isArray(response.body.items)).toBe(true);
      response.body.items.forEach((item: any) => {
        expect(item).toHaveProperty('item');
        expect(item.item).toHaveProperty('name');
        expect(typeof item.item.name).toBe('string');
      });

      // Validate species structure
      const species = response.body.species;
      expect(typeof species.id).toBe('number');
      expect(typeof species.name).toBe('string');
      expect(typeof species.is_baby).toBe('boolean');
      expect(typeof species.is_legendary).toBe('boolean');
      expect(typeof species.is_mythical).toBe('boolean');
      expect(typeof species.base_happiness).toBe('number');
      expect(typeof species.capture_rate).toBe('number');
      expect(typeof species.gender_rate).toBe('number');
      expect(typeof species.has_gender_differences).toBe('boolean');
      expect(typeof species.forms_switchable).toBe('boolean');
      expect(Array.isArray(species.localised)).toBe(true);
    });

    it('should return correct types for lapras (water, ice)', async () => {
      const response = await request(app)
        .get('/api/lookup/lapras')
        .expect(200);

      const typeNames = response.body.types.map((t: any) => t.names.name);
      expect(typeNames).toContain('water');
      expect(typeNames).toContain('ice');
    });

    it('should return held items for lapras (mystic-water)', async () => {
      const response = await request(app)
        .get('/api/lookup/lapras')
        .expect(200);

      const itemNames = response.body.items.map((i: any) => i.item.name);
      expect(itemNames).toContain('mystic-water');
    });
  });
});
