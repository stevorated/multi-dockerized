import React from 'react';
import { HelmetComponent, PageContainer } from '../../components';
import { Link } from 'react-router-dom';

type Props = {};

export function NotFoundPage({}: Props) {
    return (
        <PageContainer className="flex-center">
            <HelmetComponent pageTitle="Oops" ogTitle="not found" />
            <h1 style={{ fontSize: '40px', color: 'black' }}>404</h1>
            <Link to="/">Go Home</Link>
        </PageContainer>
    );
}

export default {
    component: NotFoundPage,
};
