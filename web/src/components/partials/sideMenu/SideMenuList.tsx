import React, { SyntheticEvent } from 'react';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { SideMenuListItem } from './SideMenuListItem';

type SideMenuListProps = { toggle: (e: SyntheticEvent) => void };

export const SideMenuList = ({ toggle }: SideMenuListProps) => {
    const renderGroup = (items: string[]) => {
        return items.map((text, index) => (
            <SideMenuListItem key={index} text={text} index={index} />
        ));
    };
    return (
        <div
            style={{ width: '200px' }}
            role="presentation"
            onClick={toggle}
            onKeyDown={toggle}
        >
            <List>
                {renderGroup(['Inbox', 'Starred', 'Send email', 'Drafts'])}
            </List>
            <Divider />
            <List>{renderGroup(['All mail', 'Trash', 'Spam'])}</List>
        </div>
    );
};
