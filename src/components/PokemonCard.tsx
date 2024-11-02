import React from 'react';
import { Heart } from 'lucide-react';
import { Pokemon } from '../types';

interface PokemonCardProps {
  pokemon: Pokemon;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export function PokemonCard({ pokemon, isFavorite, onToggleFavorite }: PokemonCardProps) {
  return (
    <div className="group relative bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all hover:scale-[1.02] active:scale-[0.98] touch-manipulation">
      <button
        onClick={() => onToggleFavorite(pokemon.id)}
        className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur shadow-lg transition-transform transform active:scale-90 touch-manipulation"
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart
          className={`w-6 h-6 transition-all duration-300 ${
            isFavorite ? 'fill-red-500 text-red-500 scale-110' : 'text-gray-400'
          } group-hover:scale-110`}
        />
      </button>
      <div className="relative pt-[100%] bg-gradient-to-br from-gray-50 to-gray-100">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="absolute inset-0 w-full h-full object-contain p-6 transform transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <h2 className="text-xl font-bold capitalize mb-3 text-gray-800">
          #{pokemon.id.toString().padStart(3, '0')} {pokemon.name}
        </h2>
        <div className="flex flex-wrap gap-2">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-transform hover:scale-105 ${
                type === 'fire' ? 'bg-red-100 text-red-800' :
                type === 'water' ? 'bg-blue-100 text-blue-800' :
                type === 'grass' ? 'bg-green-100 text-green-800' :
                type === 'electric' ? 'bg-yellow-100 text-yellow-800' :
                type === 'psychic' ? 'bg-purple-100 text-purple-800' :
                type === 'ice' ? 'bg-cyan-100 text-cyan-800' :
                type === 'dragon' ? 'bg-indigo-100 text-indigo-800' :
                type === 'poison' ? 'bg-fuchsia-100 text-fuchsia-800' :
                type === 'ground' ? 'bg-amber-100 text-amber-800' :
                type === 'rock' ? 'bg-stone-100 text-stone-800' :
                type === 'fighting' ? 'bg-rose-100 text-rose-800' :
                type === 'ghost' ? 'bg-violet-100 text-violet-800' :
                type === 'dark' ? 'bg-zinc-100 text-zinc-800' :
                type === 'steel' ? 'bg-slate-100 text-slate-800' :
                type === 'fairy' ? 'bg-pink-100 text-pink-800' :
                type === 'bug' ? 'bg-lime-100 text-lime-800' :
                type === 'flying' ? 'bg-sky-100 text-sky-800' :
                'bg-gray-100 text-gray-800'
              }`}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}