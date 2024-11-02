import { useState, useEffect } from 'react';
import { Pokemon, PokemonDetails } from '../types';

export function usePokemon(limit = 151) {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
        );
        const data = await response.json();

        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon: { url: string }) => {
            const response = await fetch(pokemon.url);
            const details: PokemonDetails = await response.json();
            return {
              id: details.id,
              name: details.name,
              types: details.types.map((type) => type.type.name),
              image: details.sprites.other['official-artwork'].front_default,
            };
          })
        );

        setPokemon(pokemonDetails);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch Pokémon data');
        setIsLoading(false);
      }
    };

    fetchPokemon();
  }, [limit]);

  return { pokemon, isLoading, error };
}