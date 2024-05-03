'use client'

import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";

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

interface PokemonStatsTableProps {
    rows: StatInfo[];
}

const columns = [
    {
        key: "name",
        label: "STAT NAME",
    },
    {
        key: "base_stat",
        label: "BASE STAT",
    },
    {
        key: "effort",
        label: "EFFORT",
    },
];

export default function PokemonStatsTable({ rows }: PokemonStatsTableProps) {
    return (
        <div className={'pb-4'}>
            <Table aria-label="Pokemon stats table">
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={rows}>
                    {(item) => (
                        <TableRow key={item.key}>
                            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

