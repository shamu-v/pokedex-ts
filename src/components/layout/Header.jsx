import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from "@nextui-org/react";

//import KeyLabel from "@/utils/KeyLabel";
//import DropdownButton from "./DropdownButton";

export default async function Heading() {
    //const ability = await KeyLabel('ability')

    return (
        <Navbar>
            <NavbarBrand>
                <Link href="/" className="font-bold text-inherit">POKEDEX</Link>
            </NavbarBrand>
            <NavbarContent className="sm:flex gap-4" justify="end">
                <NavbarItem>
                    <Link href="/berry" className="text-gray-800" aria-current="page">berries</Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link href="/1" aria-current="page">pokemons</Link>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
