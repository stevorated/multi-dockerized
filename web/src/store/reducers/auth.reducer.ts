import { IAuthAction, IAuth } from '../../types';
import { FETCH_AUTH } from '../actions';

const initialState = null as IAuth | {} | null;

export const authReducer = (
    state: IAuth | {} | null = initialState,
    { type, payload }: IAuthAction
) => {
    switch (type) {
        case FETCH_AUTH:
            return payload;
        default:
            return state;
    }
};
