import { Divider } from "@nextui-org/react";

import HomeButton from "@/components/buttons/HomeButton";
import PokeImage from "@/components/generals/ItemImage";
import PokemonData from "@/components/PokeData";

import PokemonInfo from "@/utils/PokemonInfo";
import PokemonStatsTable from "@/components/PokemonStatsTable";

interface Pokemon {
    id: number;
    name: string;
    image: any;
    type: string;
}

interface Stat {
    name: string;
    url: string;
}

interface StatInfo {
    key: number;
    base_stat: number;
    effort: number;
    stat: Stat;
}

export default async function Page({ params }: { params: { name: string } }) {
    const pokemon = await PokemonInfo(params.name)
    const rows = await getData(params.name)

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`)
    const data = await res.json()

    return (
        <div className={`flex flex-col items-center justify-between p-8`}>
            <h2 className="mb-4 text-3xl font-bold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl">{pokemon.name}</h2>
            <PokeImage image={pokemon.image} />
            <Divider className="my-4" />
            <PokemonStatsTable rows={rows} />
            <PokemonData data={data} />
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

export async function getData(pokemon: string) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    const data = await res.json()

    const stats: StatInfo[] = await Promise.all(
        data.stats.map((statInfo: StatInfo, index: number) => {
            return {
                key: index + 1,
                name: statInfo.stat.name,
                base_stat: statInfo.base_stat,
                effort: statInfo.effort,
            }
        })
    )

    return stats
}