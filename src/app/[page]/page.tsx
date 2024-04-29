import React from "react";
import PokemonInfo from "@/utils/PokemonInfo";
import MainPagination from "@/components/MainPagination";

interface Pokemon {
    id: number;
    name: string;
    image: any;
    type: string;
}

export default async function Page({ params }: { params: { page: number } }) {
    const totalPokemons: number = 1302;
    const pokemonsPerPage: number = 32;
    const totalPages: number = Math.ceil(totalPokemons / pokemonsPerPage);

    const pokemons: Pokemon[] = await getData(params.page)

    return <MainPagination pokemons={pokemons} actualPage={params.page} totalPages={totalPages} />;
}

export async function generateStaticParams() {
    let dataUrl = 'https://pokeapi.co/api/v2/pokemon?limit=32&offset=0';
    let pages: any[] = [];

    while (dataUrl) {
        const page = await fetch(dataUrl).then((res) => res.json())

        pages.push(page.results);

        dataUrl = page.next;
    }

    return pages.map((_, index) => ({
        page: `${index + 1}`,
    }))
}

export async function getData(page : number) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=32&offset=${page <= 1 ? 0 : 16 * (page - 1)}`);
    const data = await res.json();

    const pokemons: Pokemon[] = await Promise.all(
        data.results.map(async (pokemon: { name: string }) => {
            return PokemonInfo(pokemon.name)
        })
    );

    return pokemons
}
