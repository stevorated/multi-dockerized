import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { useStyles } from '../../../hooks';
import { MenuLinks } from './MenuLinks';
import SideMenu from '../sideMenu/SideMenu';

type Props = {
    authed: boolean;
};

export function MenuBar({ authed }: Props) {
    const classes = useStyles();

    return (
        <AppBar color="primary" position="fixed">
            <Toolbar>
                {authed && <SideMenu />}
                <Typography variant="subtitle1" className={classes.title}>
                    {process.env.SITE_NAME || 'My site'}
                </Typography>
                <MenuLinks authed={authed} />
            </Toolbar>
        </AppBar>
    );
}
