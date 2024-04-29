import { Divider } from "@nextui-org/react";

import HomeButton from "@/components/buttons/HomeButton";
import PokeImage from "@/components/generals/ItemImage";
//import PokemonData from "@/components/PokeData";

import PokemonInfo from "@/utils/PokemonInfo";

interface Pokemon {
    id: number;
    name: string;
    image: any;
    type: string;
}

export default async function Pokemon({ params }: { params: { name: string}}) {

    const pokemon = await PokemonInfo(params.name)

    return (
        <div className={`flex flex-col items-center justify-between p-8`}>
            <h2 className="mb-4 text-3xl font-bold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl">{pokemon.name}</h2>
            <PokeImage image={pokemon.image} />
            <Divider className="my-4" />
            <HomeButton />
        </div>
    )
}

export async function generateStaticParams() {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1500&offset=0');
    const data = await res.json();

    return data.results.map((pokemon: Pokemon) => ({
        page: pokemon.name,
    }))
}