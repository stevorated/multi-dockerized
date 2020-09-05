import React from 'react';
import { render } from '@testing-library/react';

import { FibPage } from '../FibPage';

test('render <FibPage/>', () => {
    render(
        <FibPage
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
    // const { getByText } = render(<OtherPage />);
    // const linkElement1 = getByText(/other page/i);

    // expect(linkElement1).toBeTruthy();
});
