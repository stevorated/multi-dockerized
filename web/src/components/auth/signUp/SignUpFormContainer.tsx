import axios from 'axios';
import to from 'await-to-js';
import React from 'react';
import { ChangeEvent, FunctionComponent, useState, FormEvent } from 'react';
import Alert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';
import Checkbox from '@material-ui/core/Checkbox';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Snackbar from '@material-ui/core/Snackbar';

import { IAuth, SignUpResponse, SignUpPageState } from '../../../types';
import { validate } from '../../../utils';
import { SubmitBtn, BottomLinks, TextField, FormHeader } from '../common';
import { useStyles } from '../../../hooks';

type Props = {
    username: string;
    email: string;
    password: string;
    passwordAgain: string;
    errors: {
        username: string[];
        email: string[];
        password: string[];
        passwordAgain: string[];
        generalErrors: string[];
    };
    fetchAuthDispatch: (auth: IAuth | {}) => void;
    handleState: (key: keyof SignUpPageState, value: string) => void;
    handleErrors: (
        errors: Record<keyof SignUpPageState['errors'], string[]>
    ) => void;
    redirectHome: () => void;
};

export const SignUpFormContainer: FunctionComponent<Props> = ({
    username,
    email,
    password,
    passwordAgain,
    errors,
    fetchAuthDispatch,
    handleErrors,
    handleState,
    redirectHome,
}) => {
    const classes = useStyles();
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const usernameErrors = validate({
            field: 'username',
            value: username,
            required: true,
        });

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

        const passwordAgainErrors = validate({
            field: 'passwordAgain',
            value: passwordAgain,
            validateValue: password,
            required: true,
        });

        if (
            !usernameErrors.isValid ||
            !emailErrors.isValid ||
            !passwordErrors.isValid ||
            !passwordAgainErrors.isValid
        ) {
            return handleErrors({
                username: usernameErrors.errors,
                email: emailErrors.errors,
                password: passwordErrors.errors,
                passwordAgain: passwordAgainErrors.errors,
                generalErrors: [],
            });
        }

        const [httpError, response] = await to(
            axios.post<SignUpResponse>('/auth/v1/user/signUp', {
                username,
                email,
                password,
            })
        );

        if (httpError || !response?.data?.user) {
            fetchAuthDispatch({});

            handleErrors({
                username: [],
                email: [],
                password: [],
                passwordAgain: [],
                generalErrors: [
                    httpError?.message.includes('400')
                        ? 'Email Or Password already in use.'
                        : '',
                ],
            });

            setIsError(true);

            return;
        }

        fetchAuthDispatch(response.data.user);
        redirectHome();
    };

    const onChange = (type: keyof SignUpPageState) => (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        handleErrors({
            username: type !== 'username' ? errors.username : [],
            email: type !== 'email' ? errors.email : [],
            password: type !== 'password' ? errors.password : [],
            passwordAgain: type !== 'passwordAgain' ? errors.passwordAgain : [],
            generalErrors: [],
        });
        handleState(type, e.target.value);
    };

    const toggleError = () => {
        setIsError(!isError);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <FormHeader title="Sign Up" />
                <form
                    className={classes.form}
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <TextField
                        value={username}
                        onChange={onChange('username')}
                        error={errors.username.length ? true : false}
                        errorString={errors.username.join(' & ')}
                        name="usename"
                        authFocus
                    />
                    <TextField
                        value={email}
                        onChange={onChange('email')}
                        error={errors.email.length ? true : false}
                        errorString={errors.email.join(' & ')}
                        name="email"
                        label="Email Address"
                    />
                    <TextField
                        value={password}
                        onChange={onChange('password')}
                        error={errors.password.length ? true : false}
                        errorString={errors.password.join(' & ')}
                        name="password"
                    />
                    <TextField
                        value={passwordAgain}
                        onChange={onChange('passwordAgain')}
                        error={errors.passwordAgain.length ? true : false}
                        errorString={errors.passwordAgain.join(' & ')}
                        name="password_confirmation"
                        type="password"
                        label="Password confirmation"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <SubmitBtn title="Sign Up" />
                    <BottomLinks
                        linkRight="/"
                        titleRight="Already have an account? Sign In"
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
