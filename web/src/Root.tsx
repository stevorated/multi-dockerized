import React from 'react';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './App';
import { AuthProvider } from './providers';
import { rootReducer } from './store';

const store = createStore(
    rootReducer,
    process.env.NODE_ENV === 'production'
        ? applyMiddleware(thunk)
        : composeWithDevTools(applyMiddleware(thunk))
);

export function Root() {
    return (
        <ReduxProvider store={store}>
            <AuthProvider>
                <App />
            </AuthProvider>
        </ReduxProvider>
    );
}
