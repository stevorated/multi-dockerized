import React from 'react';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

interface Props {
    title?: string;
}

export function Copyright({ title = 'stevorated' }: Props) {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/stevorated">
                {title}
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
