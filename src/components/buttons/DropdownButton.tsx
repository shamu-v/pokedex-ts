'use client'

import React from "react";
import { NavbarItem, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu } from "@nextui-org/react";

interface KeyLabel {
    key: string;
    label: string;
}

interface DropdownButtonProps {
    rule: string;
    items: KeyLabel[];
}

export default function DropdownButton({ rule, items }: DropdownButtonProps) {
    return (
        <Dropdown>
            <NavbarItem>
                <DropdownTrigger>
                    <Button
                        disableRipple
                        className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                        radius="sm"
                    >
                        {rule}
                    </Button>
                </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu aria-label="Dynamic Actions" items={items}>
                {(item) => (
                    <DropdownItem
                        key={item.key}
                    >
                        {item.label}
                    </DropdownItem>
                )}
            </DropdownMenu>
        </Dropdown>
    );
}
