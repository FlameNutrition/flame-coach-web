import React from 'react';
import { render } from '../../testing/test-utils';
import NotFound from './index';

describe('<NotFound/ >', () => {
  it('create component', () => {
    const { container } = render(
      <NotFound
        title="The page you are looking for isn’t here"
        submessage="You either tried some shady route or you came here by mistake. Whichever it is, try using the navigation"
      />
    );

    expect(container).toMatchSnapshot();
    expect(container.querySelector('h1')).toHaveTextContent('The page you are looking for isn’t here');
    expect(container.querySelector('h6')).toHaveTextContent('You either tried some shady route or you came here by mistake. Whichever it is, try using the navigation');
    expect(container.querySelector('svg')).not.toBeNull();
  });
});
