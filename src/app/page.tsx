import React from "react";

import KeyLabel from "@/utils/KeyLabel";
import SelectionFilter from "@/components/selection/SelectionFilter";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default async function Page() {
  const itemsType = await KeyLabel('type');

  return (
    <main className={`flex flex-col my-40 p-16 ${inter.className}`}>
      <SelectionFilter items={itemsType} rule="type" />
    </main>
  );
}