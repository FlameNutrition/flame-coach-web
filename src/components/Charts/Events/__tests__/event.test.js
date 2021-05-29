import React from 'react';
import { render, screen } from '../../../../testing/test-utils';
import Event from '../Event';

describe('<Event />', () => {
  it('create component Event', () => {
    const { container } = render(<Event
      date="2021-04-01"
      value={50.5}
      measureType="Lb/s"
    />);

    expect(container).toMatchSnapshot();
  });

  it('check event display', () => {
    render(<Event
      date="2021-04-01"
      value={50.5}
      measureType="Lb/s"
    />);

    expect(screen.queryByText('Thu, April 1st 2021')).not.toBeNull();
    expect(screen.queryByText('50.5 Lb/s')).not.toBeNull();
  });
});
