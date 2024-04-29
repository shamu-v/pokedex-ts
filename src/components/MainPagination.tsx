'use client'

import React, { useState } from "react";

import { Pagination, Button, Divider } from "@nextui-org/react";
import { useRouter } from "next/navigation";

import ListItems from "./generals/ListItems";

type Pokemon = {
    id: number;
    type: string;
    name: string;
    image: string;
};

type MainPaginationProps = {
    pokemons: Pokemon[];
    actualPage: number;
    totalPages: number;
};

export default function MainPagination({ pokemons, actualPage, totalPages }: MainPaginationProps) {
    const router = useRouter()
    const [currentPage, setCurrentPage] = useState(Number(actualPage) || 1)

    const handlePageChange = (page?: number) => {
        setCurrentPage(page || 1)
        router.push(`/${page ? page : " "}`)
    }

    return (
        <div className={`flex flex-col items-center justify-between p-8`}>
            <ListItems rule="pokemon" items={pokemons} />
            <Divider className="my-8" />
            <div className="flex flex-col items-center gap-5">
                <Pagination
                    total={totalPages}
                    color="secondary"
                    page={currentPage}
                    onChange={handlePageChange}
                />
                <div className="flex gap-2">
                    <Button
                        size="sm"
                        variant="flat"
                        color="secondary"
                        onPress={() => {
                            handlePageChange(Math.max(currentPage - 1, 1))
                        }}
                    >
                        Previous
                    </Button>
                    <Button
                        size="sm"
                        variant="flat"
                        color="secondary"
                        onPress={() => { handlePageChange() }}
                    >
                        Home
                    </Button>
                    <Button
                        size="sm"
                        variant="flat"
                        color="secondary"
                        onPress={() => {
                            handlePageChange(Math.min(currentPage + 1, 82))
                        }}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
