'use client'

import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import ItemImage from "./ItemImage";

type Item = {
    id: number;
    type: string;
    name: string;
    image: string;
};

type ListItemProps = {
    rule: string;
    items: Item[];
};

export default function ListItems({ rule, items }: ListItemProps) {
    const router = useRouter()

    return (
        <div className="gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 p-0">
            {items.map(( item, index ) => (
                <Card className="py-4" shadow="sm" key={index + 1} isPressable onPress={() => router.push(`/${rule}/${item.id}`)}>
                    <CardHeader className="pb-0 pt-0 px-4 flex-col items-start">
                        <p className="text-tiny font-bold">{item.id}</p>
                        <p className="text-tiny">{item.type}</p>
                        <h4 className="font-bold uppercase">{item.name}</h4>
                    </CardHeader>
                    <CardBody className="overflow-visible items-center p-2">
                        {
                            <ItemImage image={item.image} />
                        }
                    </CardBody>
                </Card>
            ))}
        </div>
    )
}
