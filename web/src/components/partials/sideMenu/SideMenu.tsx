import React, { useState, SyntheticEvent } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { SideMenuList } from './SideMenuList';

type State = {
    open: boolean;
};

const SideMenu = () => {
    const [menuState, useMenuState] = useState<State>({ open: false });

    const toggleMenu = (e: SyntheticEvent) => {
        e.preventDefault();
        useMenuState({ ...menuState, open: !menuState.open });
    };

    return (
        <React.Fragment>
            <IconButton
                onClick={toggleMenu}
                edge="start"
                color="inherit"
                aria-label="menu"
            >
                <MenuIcon />
            </IconButton>
            <SwipeableDrawer
                open={menuState.open}
                onClose={toggleMenu}
                onOpen={toggleMenu}
            >
                <SideMenuList toggle={toggleMenu} />
            </SwipeableDrawer>
        </React.Fragment>
    );
};

export default SideMenu;
