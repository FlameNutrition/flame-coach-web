import React from 'react';
import { render } from '../../testing/test-utils';
import UnderConstruction from './index';

describe('<UnderConstruction / >', () => {
  it('create component', () => {
    const { container } = render(
      <UnderConstruction
        message="Ops...this page is under construction!"
        submessage="Sorry, we are doing the best for having good features available for you. But unfortunately this is a free application and we don't have much time as we liked to work on it."
      />
    );

    expect(container).toMatchSnapshot();
    expect(container.querySelector('h3')).toHaveTextContent('Ops...this page is under construction!');
    expect(container.querySelector('p')).toHaveTextContent('Sorry, we are doing the best for having good features available for you. But unfortunately this is a free application and we don\'t have much time as we liked to work on it.');
    expect(container.querySelector('svg')).not.toBeNull();
  });
});
