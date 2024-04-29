'use client'

import React, { useState } from "react";
import { Button, Link } from "@nextui-org/react";
import Selector from "./Selector";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

interface KeyLabel {
  key: string;
  label: string;
}

interface SelectionProps {
  items: KeyLabel[];
  rule: string;
}

export default function SelectionFilter({ items, rule }: SelectionProps): JSX.Element {
  const [selectedItemFromChild, setSelectedItemFromChild] = useState<string>("1");

  const handleSelectionChange = (selectedItem: string) => {
    setSelectedItemFromChild(selectedItem);
  };

  return (
    <div className={`flex flex-col space-y-28 items-center ${inter.className}`}>
      <Selector
        items={items}
        rule={rule}
        onSelectionChange={handleSelectionChange}
      />
      <Link href={selectedItemFromChild}>
        <Button
          radius="full"
          size="lg"
          className="bg-gradient-to-tr from-pink-500 to-purple-500 text-white shadow-lg uppercase"
          disabled={!selectedItemFromChild}
        >
          Explore
        </Button>
      </Link>
    </div>
  );
}
