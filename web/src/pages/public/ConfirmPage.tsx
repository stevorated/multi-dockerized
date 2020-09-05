import axios from 'axios';
import to from 'await-to-js';
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';

type Props = RouteComponentProps;

type State = {
    confirmResponse: string;
    error: string;
};

export class ConfirmPage extends Component<Props, State> {
    // User was confirmed
    state = {
        confirmResponse: '',
        error: '',
    };

    componentDidMount = async () => {
        if (!!this.state.confirmResponse) {
            console.log('HERe');
            return;
        }

        const [err, res] = await to(
            axios.post('/auth/v1/user/confirmemail', this.props.match.params)
        );

        console.log(err, res);
        if (res) {
            this.setState({
                confirmResponse: res?.data?.message,
            });
        } else {
            this.setState({
                error: err?.toString() || 'Unknown Error',
            });
        }
    };
    render() {
        if (!this.state.error && !this.state.confirmResponse) {
            return <div></div>;
        }
        return this.state.confirmResponse === 'User was confirmed' ? (
            <>
                <Typography>Email was Confirmed</Typography>
                <Link to="/">Go Home</Link>
            </>
        ) : (
            <>
                <Typography>Email was not Confirmed</Typography>
                <Link to="/">Go Home</Link>
            </>
        );
    }
}

export default {
    component: connect()(ConfirmPage),
};
