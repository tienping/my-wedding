import React from 'react';
import { mount } from 'enzyme';

import NotFoundPage from '../index';

describe('<NotFoundPage />', () => {
    it('should render the page with the message "The URL is invalid."', () => {
        const page = mount(<NotFoundPage />);
        expect(page.html()).toContain('The URL is invalid.');
    });
});
