type Roles = 'admin' | 'user';

export type ReduxProps = {
    auth: IAuth;
};

export interface IAuth {
    id: string;
    email: string;
    username: string;
    isConfirmed: boolean;
    isActive: boolean;
    role: Roles;
}
export type IAuthAction = {
    type: string;
    payload?: any;
};

export interface IState {}
export type IStateAction = {
    type: string;
    payload?: any;
};
