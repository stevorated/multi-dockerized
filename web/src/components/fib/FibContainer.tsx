import React, { ChangeEvent } from 'react';
import Alert from '@material-ui/lab/Alert';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';

import { FibForm } from './FibForm';

type Props = {
    onSubmit: (e: ChangeEvent<HTMLFormElement>) => void;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    renderIndicies: () => JSX.Element[] | null;
    renderValues: () => JSX.Element[] | null;
    error: string;
    index: string;
};

export function FibContainer({
    error,
    onChange,
    onSubmit,
    index,
    renderIndicies,
    renderValues,
}: Props) {
    return (
        <>
            {error && <Alert severity="error">{error}</Alert>}

            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
            >
                <Grid>
                    <Grid>
                        <Card>
                            <CardContent>
                                <FibForm
                                    onSubmit={onSubmit}
                                    onChange={onChange}
                                    index={index}
                                />
                                <FormLabel>Values I've Seen</FormLabel>
                                <IndexContainer>
                                    {renderIndicies()}
                                </IndexContainer>
                                <FormLabel>Calculated</FormLabel>
                                {renderValues()}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

const IndexContainer = styled.label`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-bottom: 20px;
`;
