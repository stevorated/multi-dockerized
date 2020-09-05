import React from 'react';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';

interface Props {
    text: string;
    index: number;
}

export function SideMenuListItem({ text, index }: Props) {
    return (
        <ListItem button key={text}>
            <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
        </ListItem>
    );
}
