import React from 'react';

import { MenuLink } from './MenuLink';

type Props = {
    authed: boolean;
};

export function MenuLinks({ authed }: Props) {
    return !authed ? (
        <>
            <MenuLink to="/" title="sign in" />
            <MenuLink to="/sign-up" title="sign up" />
        </>
    ) : (
        <>
            <MenuLink to="/" title="home" />
            <MenuLink to="/fib" title="Fibonacci" />
            <MenuLink to="/logout" title="logout" />
        </>
    );
}
