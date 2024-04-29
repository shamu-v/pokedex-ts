interface Pokemon {
    id: number;
    name: string;
    image: any;
    type: string;
    abilities: Ability[];
    base_experience: number;
    height: number;
    weight: number;
}

interface Ability {
    ability: {
        name: string;
        url: string;
    };
    is_hidde: string;
    slot: number;
}

export default async function PokemonInfo(name: string) {

    const res= await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const pokemonData = await res.json();

    const pokemon: Pokemon = {
        id: pokemonData.id,
        name: pokemonData.name,
        image: pokemonData.sprites.other['official-artwork'].front_default,
        type: pokemonData.types[0].type.name,
        abilities: pokemonData.abilities,
        base_experience: pokemonData.base_experience,
        height: pokemonData.height,
        weight: pokemonData.weight,
    };

    return pokemon
}