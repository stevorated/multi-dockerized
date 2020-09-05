import React from 'react';
import { render } from '@testing-library/react';

import { NotFoundPage } from '../NotFoundPage';
import { BrowserRouter } from 'react-router-dom';

test('render <NotFoundPage/>', () => {
    const { getByText } = render(
        <BrowserRouter>
            <NotFoundPage />
        </BrowserRouter>
    );
    const linkElement1 = getByText(/404/i);

    expect(linkElement1).toBeTruthy();
});
