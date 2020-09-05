import { IStateAction, IState } from '../../types';

export const FETCH_STATE = 'FETCH_STATE';
export function fetchState(partialState: Partial<IState>): IStateAction {
    return {
        type: FETCH_STATE,
        payload: partialState,
    };
}

export const UPDATE_STATE = 'UPDATE_STATE';
export function updateState(partialState: Partial<IState>): IStateAction {
    return {
        type: UPDATE_STATE,
        payload: partialState,
    };
}
