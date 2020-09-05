import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';

type Props = { to: string; title: string };

export function MenuLink({ to, title }: Props) {
    return (
        <Button to={to} component={Link} color="inherit" type="submit">
            {title}
        </Button>
    );
}
