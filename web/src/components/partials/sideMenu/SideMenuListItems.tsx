import React from 'react';
import { SideMenuListItem } from './SideMenuListItem';

interface Props {
    items: string[];
}

export function SideMenuListItems({ items }: Props) {
    return items.map((text, index) => (
        <SideMenuListItem text={text} index={index} />
    ));
}
