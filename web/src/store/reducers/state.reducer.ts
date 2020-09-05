import { IStateAction, IState } from '../../types';

const initialState = {} as IState;

export const stateReducer = (
    state: IState = initialState,
    { type }: IStateAction
) => {
    switch (type) {
        default:
            return state;
    }
};
