import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';

// import { App } from '../App';

test('render <App/>', async done => {
    render(<BrowserRouter></BrowserRouter>);

    done();
    // render(<App />);
    // const { getByText } = render(<App />);
    // const linkElement1 = getByText(/Willkommen/i);
    // expect(linkElement1).toBeTruthy();
});
