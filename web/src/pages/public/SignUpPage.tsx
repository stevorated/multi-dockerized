import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { SignUpFormContainer, PageContainer } from '../../components';
import { mapStateToProps, mapDispatchToProps } from '../../store/reducers';
import { DispatchProps, ReduxProps, SignUpPageState } from '../../types';

type Props = RouteComponentProps & DispatchProps & ReduxProps;

export class SignUpPage extends Component<Props, SignUpPageState> {
    state = {
        username: '',
        email: '',
        password: '',
        passwordAgain: '',
        errors: {
            username: [],
            email: [],
            password: [],
            passwordAgain: [],
            generalErrors: [],
        },
    };

    handleState = (key: keyof SignUpPageState, value: string) => {
        this.setState(({
            [key]: value,
        } as unknown) as Pick<SignUpPageState, keyof SignUpPageState>);
    };

    handleErrors = (errors: SignUpPageState['errors']) => {
        this.setState({ errors });
    };

    redirectHome = () => this.props.history.push('/');

    render() {
        return (
            <PageContainer>
                <SignUpFormContainer
                    username={this.state.username}
                    email={this.state.email}
                    password={this.state.password}
                    passwordAgain={this.state.passwordAgain}
                    errors={this.state.errors}
                    fetchAuthDispatch={this.props.fetchAuthDispatch}
                    handleState={this.handleState}
                    handleErrors={this.handleErrors}
                    redirectHome={this.redirectHome}
                />
            </PageContainer>
        );
    }
}

export default {
    component: connect(mapStateToProps, mapDispatchToProps)(SignUpPage),
};
