import { Divider } from "@nextui-org/react";
//import MainPagination from "@/components/MainPagination";
import PokemonInfo from "@/utils/PokemonInfo";
import HomeButton from "@/components/buttons/HomeButton";
import ListItems from "@/components/generals/ListItems";

interface Pokemon {
  id: number;
  name: string;
  image: any;
  type: string;
}

interface Type {
  name: string,
  url: string,
}

export default async function Page({ params }: { params: { type: string } }) {
  const pokemons = await getData(params.type);

    return (
        <div className={'flex flex-col items-center justify-between py-4 px-8'}>
            <h2 className="text-lg text-gray-800 font-bold sm:px-16 xl:px-48 dark:text-gray-400">{params.type.toUpperCase()} POKEMONS</h2>
            <Divider className="my-4" />
            <ListItems rule="pokemon" items={pokemons} />
            <Divider className="my-4" />
            <HomeButton />
        </div>
    );
}

export async function generateStaticParams() {
  const res = await fetch('https://pokeapi.co/api/v2/type');
  const data = await res.json();

  return data.results.map((type: Type) => ({
      page: type.name,
  }))
}

export async function getData(type: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
  const data = await res.json();

  const pokemons: Pokemon[] = await Promise.all(
      data.pokemon.map(async (pokemon: { pokemon: { name: string }}) => {
          return PokemonInfo(pokemon.pokemon.name)
      })
  );

  return pokemons
}