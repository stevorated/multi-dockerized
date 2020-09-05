// import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';

import { HomePage } from '../HomePage';

test('render <HomePage/>', () => {
    render(
        <HomePage
            auth={{
                id: 'fakeId',
                email: 'email@email.com',
                username: 'username',
                isConfirmed: true,
                isActive: true,
                role: 'user',
            }}
        />
    );
});
