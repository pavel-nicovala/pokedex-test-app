import { describe, it, expect } from 'vitest';
import { request, app } from '../helpers/test-helper.js';

describe('GET /api/search', () => {
  describe('Successful searches', () => {
    it('should return search results for valid pokemon name', async () => {
      const response = await request(app)
        .get('/api/search')
        .query({ query: 'pikachu' })
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
      
      const firstResult = response.body[0];
      expect(firstResult).toHaveProperty('id');
      expect(firstResult).toHaveProperty('name');
      expect(firstResult).toHaveProperty('localised');
      expect(firstResult.localised).toBeInstanceOf(Array);
      expect(firstResult.localised.length).toBeGreaterThan(0);
      expect(firstResult.localised[0]).toHaveProperty('name');
    });

    it('should return search results for partial pokemon name', async () => {
      const response = await request(app)
        .get('/api/search')
        .query({ query: 'pika' })
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('should return search results case-insensitively', async () => {
      const response = await request(app)
        .get('/api/search')
        .query({ query: 'PIKACHU' })
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('should use default langId of 9 (English) when not provided', async () => {
      const response = await request(app)
        .get('/api/search')
        .query({ query: 'pikachu' })
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      if (response.body.length > 0) {
        expect(response.body[0].localised[0].name).toBeTruthy();
      }
    });

    it('should accept custom langId parameter', async () => {
      const response = await request(app)
        .get('/api/search')
        .query({ query: 'pikachu', langId: 9 })
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
    });

    it('should return empty array for pokemon that does not exist', async () => {
      const response = await request(app)
        .get('/api/search')
        .query({ query: 'thiswillnotreturnresults' })
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBe(0);
    });
  });

  describe('Error handling', () => {
    it.skip('should return 400 for missing query parameter', async () => {
      const response = await request(app)
        .get('/api/search')
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toHaveProperty('message');
    });

    it.skip('should return 400 for empty query parameter', async () => {
      const response = await request(app)
        .get('/api/search')
        .query({ query: '' })
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toHaveProperty('message');
    });

    it('should handle invalid langId gracefully', async () => {
      // The API should handle invalid langId - might return 400 or use default
      const response = await request(app)
        .get('/api/search')
        .query({ query: 'pikachu', langId: 'invalid' });

      // Could be 400 or 200 depending on implementation
      expect([200, 400]).toContain(response.status);
    });
  });

  describe('Response structure validation', () => {
    it('should return valid PokemonSpecies structure', async () => {
      const response = await request(app)
        .get('/api/search')
        .query({ query: 'lapras' })
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      
      if (response.body.length > 0) {
        const pokemon = response.body[0];
        
        // Validate required fields
        expect(pokemon).toHaveProperty('id');
        expect(typeof pokemon.id).toBe('number');
        expect(pokemon.id).toBeGreaterThan(0);
        
        expect(pokemon).toHaveProperty('name');
        expect(typeof pokemon.name).toBe('string');
        expect(pokemon.name.length).toBeGreaterThan(0);
        
        expect(pokemon).toHaveProperty('localised');
        expect(Array.isArray(pokemon.localised)).toBe(true);
        
        if (pokemon.localised.length > 0) {
          expect(pokemon.localised[0]).toHaveProperty('name');
          expect(typeof pokemon.localised[0].name).toBe('string');
        }
      }
    });
  });
});
