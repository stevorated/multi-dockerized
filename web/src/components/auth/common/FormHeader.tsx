import React, { FunctionComponent } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useStyles } from '../../../hooks';

type Props = {
    title: string;
};

export const FormHeader: FunctionComponent<Props> = ({ title }) => {
    const classes = useStyles();
    return (
        <>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                {title}
            </Typography>
        </>
    );
};

export default FormHeader;
