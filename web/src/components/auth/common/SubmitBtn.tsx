import React, { FunctionComponent } from 'react';
import Button from '@material-ui/core/Button';

import { useStyles } from '../../../hooks';

type Props = {
    // TODO FIX ANY
    handleClick?: (e: any) => void | Promise<void>;
    title?: string;
};

export const SubmitBtn: FunctionComponent<Props> = ({ handleClick, title }) => {
    const classes = useStyles();
    if (!handleClick) {
        return (
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                {title || 'Submit'}
            </Button>
        );
    }
    return (
        <Button
            onClick={handleClick}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
        >
            {title || 'Submit'}
        </Button>
    );
};

export default SubmitBtn;
