import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import { SignInFormContainer, PageContainer } from '../../components';
import { mapStateToProps, mapDispatchToProps } from '../../store/reducers';
import { DispatchProps, ReduxProps, SignInPageState } from '../../types';

type Props = RouteComponentProps & DispatchProps & ReduxProps;

export class SignInPage extends Component<Props, SignInPageState> {
    state = {
        email: '',
        password: '',
        errors: {
            email: [],
            password: [],
            generalErrors: [],
        },
    };

    handleState = (
        key: keyof SignInPageState,
        value: string | { email: string[]; password: string[] }
    ) => {
        this.setState(({
            [key]: value,
        } as unknown) as Pick<SignInPageState, keyof SignInPageState>);
    };

    handleErrors = (
        errors: Record<'email' | 'password' | 'generalErrors', string[]>
    ) => {
        this.setState({ errors });
    };

    render() {
        return (
            <PageContainer>
                <SignInFormContainer
                    email={this.state.email}
                    password={this.state.password}
                    errors={this.state.errors}
                    handleState={this.handleState}
                    handleErrors={this.handleErrors}
                    fetchAuthDispatch={this.props.fetchAuthDispatch}
                />
            </PageContainer>
        );
    }
}

export default {
    component: connect(mapStateToProps, mapDispatchToProps)(SignInPage),
};
