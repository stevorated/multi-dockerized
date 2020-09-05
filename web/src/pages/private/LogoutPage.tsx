import axios from 'axios';
import to from 'await-to-js';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router';
import { mapStateToProps, mapDispatchToProps } from '../../store';
import { DispatchProps, ReduxProps } from '../../types';

type Props = RouteComponentProps & DispatchProps & ReduxProps;

export class Logout extends Component<Props> {
    componentDidMount = async () => {
        const [httpError, response] = await to(
            axios.post('/auth/v1/user/logout')
        );

        if (httpError || response?.data?.error) {
            return;
        }

        this.props.fetchAuthDispatch({});
    };

    render = () => <Redirect to="/" />;
}

export default {
    component: connect(mapStateToProps, mapDispatchToProps)(Logout),
};
