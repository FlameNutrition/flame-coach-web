import {
  render,
  screen
} from '../../../testing/test-utils';

import React from 'react';
import Settings from '../index';

describe('<Settings / >', () => {
  it('render component', async () => {
    const { container } = render(
      <Settings customerEmail="test@gmail.com" />
    );

    expect(container).toMatchSnapshot();
  });

  it('check if <Password /> component is called', async () => {
    render(
      <Settings customerEmail="test@gmail.com" />
    );

    expect(screen.queryAllByText('Previous Password')).not.toBeNull();
    expect(screen.queryAllByText('Password')).not.toBeNull();
    expect(screen.queryAllByText('Confirm password')).not.toBeNull();
  });
});
