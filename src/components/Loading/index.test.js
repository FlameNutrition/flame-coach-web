import Loading from '.';
import React from 'react';
import { render } from '../../testing/test-utils';

describe('<Loading / >', () => {
  it('create component snapshot match', () => {
    const { container } = render(<Loading size={40} />);

    expect(container).toMatchSnapshot();
  });

  it('check component create circle with width and height of 40px', () => {
    const { container } = render(<Loading size={40} />);

    expect(container.querySelector('[role="progressbar"]')).toHaveAttribute('style', 'width: 40px; height: 40px;');
    expect(container.querySelector('circle')).not.toBeNull();
  });

  it('check component create circle with width and height of 200px', () => {
    const { container } = render(<Loading size={200} />);

    expect(container.querySelector('[role="progressbar"]')).toHaveAttribute('style', 'width: 200px; height: 200px;');
    expect(container.querySelector('circle')).not.toBeNull();
  });
});
