import React from 'react';
import { connect } from 'react-redux';

import { HelmetComponent } from '../../components';
import { Image } from '../../components';

import img from '../../assets/img/wow1.jpg';
import { mapStateToProps } from './../../store/reducers/index';
import { ReduxProps } from '../../types';

type Props = ReduxProps;

export function HomePage({ auth }: Props) {
    return (
        <>
            <HelmetComponent pageTitle="home page" ogTitle="home page" />
            <Image src={img} alt="" />
            <h5>username: {auth.username}</h5>
            <h5>email: {auth.email}</h5>
            <h5>is active: {auth.isActive ? 'TRUE' : 'FALSE'}</h5>
            <h5>is confirmed: {auth.isConfirmed ? 'TRUE' : 'FALSE'}</h5>
            <h5>role: {auth.role}</h5>
        </>
    );
}

export default {
    component: connect(mapStateToProps)(HomePage),
};
