import React from 'react';
import { Helmet } from 'react-helmet';

interface Props {
    pageTitle: string;
    ogTitle: string;
}

export function HelmetComponent({ pageTitle, ogTitle }: Props) {
    return (
        <div>
            <Helmet>
                <title>{pageTitle}</title>
                <meta property="og:title" content={ogTitle} />
            </Helmet>
        </div>
    );
}
