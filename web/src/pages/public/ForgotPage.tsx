import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { ForgotPasswordForm } from '../../components';
import { PageContainer } from '../../components/styled/containers';

type Props = {};

export const ForgotPage: FunctionComponent<Props> = () => {
    return (
        <PageContainer>
            <ForgotPasswordForm />
        </PageContainer>
    );
};

export default {
    component: connect()(ForgotPage),
};
