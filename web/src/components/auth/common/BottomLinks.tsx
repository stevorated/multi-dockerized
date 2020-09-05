import React, { FunctionComponent } from 'react';
import { Link as NavLink } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

type Props = {
    linkLeft?: string;
    linkRight?: string;
    titleLeft?: string;
    titleRight?: string;
};

export const BottomLinks: FunctionComponent<Props> = ({
    titleRight,
    titleLeft,
    linkRight,
    linkLeft,
}) => {
    return (
        <Grid container>
            <Grid item xs>
                {titleLeft && linkLeft && (
                    <Link component={NavLink} to={linkLeft} variant="inherit">
                        {titleLeft}
                    </Link>
                )}
            </Grid>
            <Grid item>
                {titleRight && linkRight && (
                    <Link component={NavLink} to={linkRight} variant="inherit">
                        {titleRight}
                    </Link>
                )}
            </Grid>
        </Grid>
    );
};
