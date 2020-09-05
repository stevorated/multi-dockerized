import axios from 'axios';
import to from 'await-to-js';
import React from 'react';
import { ChangeEvent, FunctionComponent, useState, FormEvent } from 'react';
import Alert from '@material-ui/lab/Alert';
import CssBaseline from '@material-ui/core/CssBaseline';
import Snackbar from '@material-ui/core/Snackbar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';

import { SubmitBtn, BottomLinks, TextField, FormHeader } from '../common';
import { validate } from '../../../utils';
import { IAuth, SignInPageState, SignInResponse } from '../../../types';
import { useStyles } from '../../../hooks';

type Props = {
    email: string;
    password: string;
    errors: {
        email: string[];
        password: string[];
        generalErrors: string[];
    };
    fetchAuthDispatch: (auth: IAuth | {}) => void;
    handleState: (key: keyof SignInPageState, value: string) => void;
    handleErrors: (
        errors: Record<'email' | 'password' | 'generalErrors', string[]>
    ) => void;
};

export const SignInFormContainer: FunctionComponent<Props> = ({
    fetchAuthDispatch,
    email,
    password,
    errors,
    handleState,
    handleErrors,
}) => {
    const classes = useStyles();
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const emailErrors = validate({
            field: 'email',
            value: email,
            required: true,
        });
        const passwordErrors = validate({
            field: 'password',
            value: password,
            required: true,
        });

        if (!emailErrors.isValid || !passwordErrors.isValid) {
            return handleErrors({
                email: emailErrors.errors,
                password: passwordErrors.errors,
                generalErrors: [],
            });
        }

        const [httpError, response] = await to(
            axios.post<SignInResponse>('/auth/v1/user/signIn', {
                email,
                password,
            })
        );

        if (httpError || !response?.data?.user) {
            fetchAuthDispatch({});

            handleErrors({
                email: [],
                password: [],
                generalErrors: [
                    httpError?.message.includes('404') ? 'Wrong Details' : '',
                ],
            });

            setIsError(true);

            return;
        }

        fetchAuthDispatch(response.data.user);
    };

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        handleErrors({
            email: [],
            password: errors.password,
            generalErrors: [],
        });
        handleState('email', e.target.value);
    };

    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        handleErrors({
            email: errors.email,
            password: [],
            generalErrors: [],
        });
        handleState('password', e.target.value);
    };

    const toggleError = () => {
        setIsError(!isError);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <FormHeader title="Sign In" />
                <form
                    className={classes.form}
                    noValidate
                    onSubmit={handleSubmit}
                >
                    <TextField
                        value={email}
                        onChange={onChangeEmail}
                        error={errors.email.length ? true : false}
                        errorString={errors.email.join(' & ')}
                        name="email"
                        label="Email Address"
                        authFocus
                    />
                    <TextField
                        value={password}
                        onChange={onChangePassword}
                        error={errors.password.length ? true : false}
                        errorString={errors.password.join(', ')}
                        name="password"
                        // autoComplete={false}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <SubmitBtn handleClick={handleSubmit} title="Sign In" />

                    <BottomLinks
                        linkRight="/sign-up"
                        titleRight="Don't have an account? Sign Up"
                        linkLeft="/forgot"
                        titleLeft="Forgot passoword?"
                    />
                </form>
            </div>
            <Snackbar
                style={{ bottom: '20vh' }}
                open={isError}
                autoHideDuration={6000}
                onClose={toggleError}
            >
                <Alert onClose={toggleError} severity="error">
                    {errors.generalErrors.join(', ')}
                </Alert>
            </Snackbar>
        </Container>
    );
};
