import React, { FunctionComponent } from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

import { useStyles } from '../../../hooks';
import { SubmitBtn, BottomLinks, TextField, FormHeader } from '../common';

type Props = {};

export const ForgotPasswordForm: FunctionComponent<Props> = () => {
    const classes = useStyles();

    const handleChange = () => {};

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <FormHeader title="Forgot Your Password?" />
                <form className={classes.form} noValidate>
                    <TextField
                        onChange={handleChange}
                        name="email"
                        label="Email Address"
                        authFocus
                    />
                    <SubmitBtn title="Send Reset Mail" />
                    <BottomLinks linkRight="/" titleRight="Go Back" />
                </form>
            </div>
        </Container>
    );
};
