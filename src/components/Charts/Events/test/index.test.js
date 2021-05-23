import React from 'react';
import Events from '../index';
import { render, screen } from '../../../../testing/test-utils';
import sinon from 'sinon';

describe('<Events />', () => {
  const deleteHandler = sinon.spy();

  it('create component Events', () => {
    const events = [
      { identifier: 1, date: '2021-04-01', value: 50.5 },
      { identifier: 2, date: '2021-05-01', value: 70.5 },
      { identifier: 3, date: '2021-06-01', value: 80.5 }
    ];

    const { container } = render(<Events
      onDeleteHandle={deleteHandler}
      dataEvents={events}
    />);

    expect(container).toMatchSnapshot();
  });

  it('check events display', () => {
    const events = [
      { identifier: 1, date: '2021-04-01', value: 50.5 },
      { identifier: 2, date: '2021-05-01', value: 70.5 },
      { identifier: 3, date: '2021-06-01', value: 80.5 }
    ];

    render(<Events
      onDeleteHandle={deleteHandler}
      dataEvents={events}
    />);

    expect(screen.queryByText('Events')).not.toBeNull();

    expect(screen.queryByText('Thu, April 1st 2021')).not.toBeNull();
    expect(screen.queryByText('50.5 kg')).not.toBeNull();
    expect(screen.queryByText('Sat, May 1st 2021')).not.toBeNull();
    expect(screen.queryByText('70.5 kg')).not.toBeNull();
    expect(screen.queryByText('Tue, June 1st 2021')).not.toBeNull();
    expect(screen.queryByText('80.5 kg')).not.toBeNull();

    expect(screen.queryAllByText('Delete')).toHaveLength(3);
  });
});
