import React from 'react';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';

import { HelmetComponent, PageContainer, Fib } from '../../components';
import { ReduxProps } from '../../types';
import { mapStateToProps } from '../../store';

type Props = ReduxProps;

export function FibPage({}: Props) {
    return (
        <PageContainer>
            <HelmetComponent pageTitle="fibbo" ogTitle="fibbo" />
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid></Grid>
                <Grid>
                    <Fib />
                </Grid>
                <Grid></Grid>
            </Grid>
        </PageContainer>
    );
}

export default {
    component: connect(mapStateToProps)(FibPage),
};
