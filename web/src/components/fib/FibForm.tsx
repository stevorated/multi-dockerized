import React, { ChangeEvent } from 'react';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import Input from '@material-ui/core/Input';
import styled from 'styled-components';

type Props = {
    onSubmit: (e: ChangeEvent<HTMLFormElement>) => void;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    index: string;
};

export const FibForm = ({ onSubmit, onChange, index }: Props) => {
    return (
        <Form onSubmit={onSubmit}>
            <FormLabel>Enter</FormLabel>
            <InputGroup>
                <Input type="text" value={index} onChange={onChange} />
                <Button
                    style={{ margin: '0 20px' }}
                    variant="outlined"
                    color="primary"
                    type="submit"
                >
                    Submit
                </Button>
            </InputGroup>
        </Form>
    );
};

const Form = styled.form`
    display: flex;
    flex-direction: column;
    padding: 30px;
`;

const InputGroup = styled.div`
    justify-content: flex;
    flex-direction: row;
    justify-content: center;
`;
