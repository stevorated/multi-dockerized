// import axios from 'axios';
import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
// import { AppState } from './interfaces';
import { MenuBar, Copyright } from '../components';
import { routes } from './routes';
import { PageContainer } from './../components/styled/containers';

interface Props {
    authed: boolean;
    // setAuth: (auth: boolean) => void;
}

export function AppRouter({ authed }: Props) {
    const router = authed ? routes.privateRoutes : routes.publicRoutes;
    return (
        <Router>
            <PageContainer>
                <MenuBar authed={authed} />
                <div style={{ paddingTop: '80px' }}>
                    <Switch>{renderRoutes(router)}</Switch>
                </div>
            </PageContainer>
            <Copyright />
        </Router>
    );
}
