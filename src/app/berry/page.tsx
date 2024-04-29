import { Divider } from "@nextui-org/react";
//import MainPagination from "@/components/MainPagination";
import BerryInfo from "@/utils/BerryInfo";
import ListItems from "@/components/generals/ListItems";
import HomeButton from "@/components/buttons/HomeButton";

interface Berry {
    id: number;
    name: string;
    image: any;
    type: string;
}


export default async function Page() {
    const berries = await getData();

    return (
        <div className={`flex flex-col items-center justify-between py-4 px-8`}>
            <h2 className="text-lg text-gray-800 font-bold sm:px-16 xl:px-48 dark:text-gray-400">BERRIES</h2>
            <Divider className="my-4" />
            <ListItems rule="berry" items={berries} />
            <Divider className="my-4" />
            <HomeButton />
        </div>
    );
}

export async function getData() {
    const res = await fetch(`https://pokeapi.co/api/v2/berry?limit=100&offset=0`);
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

    return berries
}