import React, { useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";

interface KeyLabel {
    key: string;
    label: string;
}

interface SelectorProps {
    items: KeyLabel[];
    rule: string;
    onSelectionChange: (selectedItem: string) => void; // Callback function prop
}

// Define the component function separately
export default function Selector({ items, rule, onSelectionChange }: SelectorProps): JSX.Element {
    const [selectedItem, setSelectedItem] = useState<string>("");

    const handleSelectionChange = (item: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = `/${rule}/${item.target.value}`;
        setSelectedItem(newValue);

        // Call the callback function and pass the new value
        onSelectionChange(newValue);
    };

    const labelValue = `${rule.toUpperCase()} (optional)`

    return (
        <div>
            <Select
                items={items}
                onChange={handleSelectionChange}
                label={labelValue}
                placeholder="Select an item"
                className="min-w-80"
            >
                {items.map((item: KeyLabel) => (
                    <SelectItem key={item.key}>{item.label}</SelectItem>
                ))}
            </Select>
        </div>
    );
}