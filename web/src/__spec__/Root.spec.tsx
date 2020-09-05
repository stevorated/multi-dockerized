// import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';

import { Root } from '../Root';
import { BrowserRouter } from 'react-router-dom';

test('render <Root/>', async done => {
    render(
        <BrowserRouter>
            <Root />
        </BrowserRouter>
    );

    done();
    // const { getByText } = render(<Base />);
    // const linkElement1 = getByText(/Willkommen/i);

    // expect(linkElement1).toBeTruthy();
});
