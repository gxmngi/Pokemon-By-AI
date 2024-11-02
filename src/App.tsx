import React, { useState, useMemo } from 'react';
import { Loader2, Heart } from 'lucide-react';
import { usePokemon } from './hooks/usePokemon';
import { useFavorites } from './hooks/useFavorites';
import { PokemonCard } from './components/PokemonCard';
import { SearchBar } from './components/SearchBar';

function App() {
  const { pokemon, isLoading, error } = usePokemon();
  const { favorites, toggleFavorite } = useFavorites();
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);

  const types = useMemo(() => {
    const allTypes = pokemon.flatMap((p) => p.types);
    return [...new Set(allTypes)].sort();
  }, [pokemon]);

  const filteredPokemon = useMemo(() => {
    let filtered = pokemon;

    if (showFavorites) {
      filtered = filtered.filter((p) => favorites.includes(p.id));
    }

    if (search) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedType) {
      filtered = filtered.filter((p) => p.types.includes(selectedType));
    }

    return filtered;
  }, [pokemon, search, selectedType, showFavorites, favorites]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center text-red-600 p-4">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 px-4 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto">
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg rounded-2xl shadow-sm mb-6 sm:mb-8 p-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Pokédex
            </h1>
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all transform active:scale-95 touch-manipulation ${
                showFavorites
                  ? 'bg-red-500 text-white shadow-red-200 hover:bg-red-600'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              } shadow-lg`}
            >
              <Heart
                className={`w-5 h-5 ${showFavorites ? 'fill-white' : ''}`}
              />
              <span className="font-medium">
                {showFavorites ? 'Show All' : 'Show Favorites'}
              </span>
            </button>
          </div>

          <div className="mt-4">
            <SearchBar
              search={search}
              onSearchChange={setSearch}
              selectedType={selectedType}
              onTypeChange={setSelectedType}
              types={types}
            />
          </div>
        </header>

        {isLoading ? (
          <div className="flex items-center justify-center min-h-[50vh]">
            <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredPokemon.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                isFavorite={favorites.includes(pokemon.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}

        {!isLoading && filteredPokemon.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-4">
            <div className="bg-white/80 backdrop-blur rounded-2xl p-8 shadow-lg max-w-md">
              <p className="text-xl text-gray-600">
                {showFavorites
                  ? "You haven't added any Pokémon to your favorites yet!"
                  : 'No Pokémon found matching your search criteria.'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;