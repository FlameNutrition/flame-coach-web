import React from 'react';
import { render, screen } from '../../../../testing/test-utils';
import TotalClients from '../index';

describe('<TotalClients />', () => {

  it('Show total client when total is 0', () => {
    render(<TotalClients
      isLoading={false}/>);

    expect(screen.queryByText('TOTAL CLIENTS'))
      .not
      .toBeNull();
    expect(screen.queryByText('0'))
      .not
      .toBeNull();
  });

  it('Show total client when total is 60', () => {
    render(<TotalClients
      total={60}
      isLoading={false}/>);

    expect(screen.queryByText('TOTAL CLIENTS'))
      .not
      .toBeNull();
    expect(screen.queryByText('60'))
      .not
      .toBeNull();
  });

});
