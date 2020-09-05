import { IAuth } from './redux.types';

export type AppState = {};

export type DispatchProps = {
    fetchAuthDispatch: (payload: IAuth | {} | null) => void;
};

export interface SignInPageState {
    email: string;
    password: string;
    errors: {
        email: string[];
        password: string[];
        generalErrors: string[];
    };
}

export interface SignUpPageState {
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
}

export type SignInResponse = SignInOrSignUpResponse;
export type SignUpResponse = SignInOrSignUpResponse;

type SignInOrSignUpResponse = {
    message: string;
    error: boolean;
    user: IAuth;
    tokens: { refresh?: string; access?: string };
};
