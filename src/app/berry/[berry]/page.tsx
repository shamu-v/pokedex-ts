import { Divider } from "@nextui-org/react";

import HomeButton from "@/components/buttons/HomeButton";
import PokeImage from "@/components/generals/ItemImage";
//import PokemonData from "@/components/PokeData";
import BerryInfo from "@/utils/BerryInfo";

interface Berry {
  id: number;
  name: string;
  image: any;
  type: string;
}

export default async function Page({ params }: { params: { berry: number } }) {
  const berry = await getData(params.berry)

  return (
    <div className={`flex flex-col items-center justify-between p-8`}>
      <h2 className="mb-4 text-3xl font-bold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl">{berry.name}</h2>
      <PokeImage image={berry.image} />
      <Divider className="my-4" />
      <HomeButton />
    </div>
  )
}

export async function generateStaticParams() {
  const res = await fetch('https://pokeapi.co/api/v2/berry?limit=100&offset=0');
  const data = await res.json();

  const berries: Berry[] = await Promise.all(
    data.results.map(async (berry: { url: string }) => {
      const berryRes = await fetch(berry.url)
      const berryData = await berryRes.json()

      const berryItemRes = await fetch(berryData.item.url)
      const berryItemData = await berryItemRes.json()

      return BerryInfo(berryItemData.id, berryData.id, berryData.name)
    })
  );

  return berries.map((berry: Berry) => ({
    page: berry.id,
  }))
}

export async function getData(id: number) {
  const berryRes = await fetch(`https://pokeapi.co/api/v2/berry/${id}`)
  const berryData = await berryRes.json()

  const berryItemRes = await fetch(berryData.item.url)
  const berryItemData = await berryItemRes.json()

  return BerryInfo(berryItemData.id, id, berryData.name)
}