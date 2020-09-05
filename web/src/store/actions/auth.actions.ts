import { IAuthAction, IAuth } from '../../types';

export const FETCH_AUTH = 'FETCH_AUTH';
export function fetchAuth(partialState: IAuth | {} | null): IAuthAction {
    return {
        type: FETCH_AUTH,
        payload: partialState,
    };
}

export const UPDATE_AUTH = 'UPDATE_AUTH';
export function updateAuth(partialState: Partial<IAuth>): IAuthAction {
    return {
        type: UPDATE_AUTH,
        payload: partialState,
    };
}
