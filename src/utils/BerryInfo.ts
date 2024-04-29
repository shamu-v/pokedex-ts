interface Berry {
    id: number;
    name: string;
    image: any;
    type: string;
}

export default async function BerryInfo(  itemId: number, berryId: number, berryName: string ) {

    const res= await fetch(`https://pokeapi.co/api/v2/item/${itemId}`);
    const berryData = await res.json();

    const berry: Berry = {
        id: berryId,
        name: berryName,
        image: berryData.sprites.default,
        type: berryData.category.name,
    };

    return berry
}