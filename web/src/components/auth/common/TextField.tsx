import React, { FunctionComponent, ChangeEvent, KeyboardEvent } from 'react';

import TextFieldMui from '@material-ui/core/TextField';
import { capitalize } from '../../../utils';

type Props = {
    value?: string;
    name: string;
    id?: string;
    label?: string;
    authFocus?: boolean;
    autoComplete?: boolean;
    type?: string;
    ref?: any;
    error?: boolean;
    errorString?: string | string[];
    required?: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onKeyPress?: (e: KeyboardEvent<HTMLInputElement>) => void;
};

export const TextField: FunctionComponent<Props> = ({
    value,
    name,
    id,
    ref,
    type,
    label,
    authFocus,
    // autoComplete,
    error,
    errorString,
    required = true,
    onChange,
    onKeyPress = (_e: KeyboardEvent<HTMLInputElement>) => {},
}) => {
    const fieldType = type ?? name;

    return (
        <TextFieldMui
            ref={ref}
            value={value}
            // autoComplete={name === 'password' ? 'current-password' : undefined}
            // autoComplete="new-password"
            type={fieldType}
            onChange={onChange}
            onKeyPress={onKeyPress}
            variant="outlined"
            margin="normal"
            required={required}
            fullWidth
            error={error}
            helperText={errorString}
            id={id || name}
            label={label || capitalize(name)}
            name={name}
            autoFocus={authFocus}
        />
    );
};

export default TextField;
