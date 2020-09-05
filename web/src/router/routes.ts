import {
    ConfirmPage,
    HomePage,
    FibPage,
    NotFoundPage,
    SignInPage,
    SignUpPage,
    LogoutPage,
    ForgotPage,
    ForgotConfirmPage,
} from '../pages';
import { RouteConfig } from 'react-router-config';

interface AppRoutes {
    publicRoutes: RouteConfig[];
    privateRoutes: RouteConfig[];
}

const publicRoutes: RouteConfig[] = [
    {
        name: 'forget password confirm',
        path: '/confirm/forgot/',
        exact: true,
        ...ForgotConfirmPage,
    },
    {
        name: 'confirm user',
        path: '/confirm/user/:id/:code',
        exact: true,
        ...ConfirmPage,
    },
    { name: 'sign-in', path: '/', exact: true, ...SignInPage },
    { name: 'sign-up', path: '/sign-up', exact: true, ...SignUpPage },
    {
        name: 'forgot-pass',
        path: '/forgot',
        exact: true,
        ...ForgotPage,
    },
    { name: 'unfound', ...NotFoundPage },
];

const privateRoutes: RouteConfig[] = [
    { name: 'home', path: '/', exact: true, ...HomePage },
    { name: 'fibonacci', path: '/fib', exact: true, ...FibPage },
    { name: 'logout', path: '/logout', exact: true, ...LogoutPage },
    {
        name: 'confirm user',
        path: '/confirm/user/:id/:code',
        exact: true,
        ...ConfirmPage,
    },
    { name: 'unfound', ...NotFoundPage },
];

export const routes: AppRoutes = {
    publicRoutes,
    privateRoutes,
};
