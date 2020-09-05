import axios from 'axios';
import to from 'await-to-js';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { AppRouter } from './router';
import { mapStateToProps, mapDispatchToProps } from './store';
import { DispatchProps, ReduxProps } from './types';

import './App.less';

type Props = DispatchProps & ReduxProps;

export class App extends Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

    async componentDidMount() {
        const [, response] = await to(axios.post('/auth/v1/user/handshake'));

        if (response) {
            return this.props.fetchAuthDispatch({
                ...response?.data.user,
            });
        }

        return this.props.fetchAuthDispatch({});
    }

    render() {
        if (this.props.auth === null) {
            return null;
        }
        return <AppRouter authed={this.props.auth?.id ? true : false} />;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
