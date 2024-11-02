export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  image: string;
}

export interface PokemonDetails {
  id: number;
  name: string;
  types: Array<{
    type: {
      name: string;
    };
  }>;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
}