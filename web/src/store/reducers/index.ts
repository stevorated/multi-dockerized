import { combineReducers, Dispatch } from 'redux';
import { stateReducer } from './state.reducer';
import { authReducer } from './auth.reducer';
import { fetchAuth } from '../actions';
import { DispatchProps, IAuth } from '../../types';

export const rootReducer = combineReducers({
    state: stateReducer,
    auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const mapStateToProps = ({ auth }: RootState) => {
    return { auth };
};

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    fetchAuthDispatch: (payload: IAuth | {} | null) =>
        dispatch(fetchAuth(payload)),
});
