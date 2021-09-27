import React from 'react';
import { render, screen } from '../../../../testing/test-utils';
import Income from '../index';

describe('<Income />', () => {

  it('Show next month income when total is 0.0', () => {
    render(<Income
      isLoading={false}/>);

    expect(screen.queryByText('BALANCE MONTH INCOME'))
      .not
      .toBeNull();
    expect(screen.queryByText('0.0 £'))
      .not
      .toBeNull();
  });

  it('Show next month income when total is 267.71', () => {
    render(<Income
      isLoading={false}
      total={267.71}/>);

    expect(screen.queryByText('BALANCE MONTH INCOME'))
      .not
      .toBeNull();
    expect(screen.queryByText('267.71 £'))
      .not
      .toBeNull();
  });

  it('Show next month income when total is 267.71 and currency is $', () => {
    render(<Income
      isLoading={false}
      currency="$"
      total={267.71}/>);

    expect(screen.queryByText('BALANCE MONTH INCOME'))
      .not
      .toBeNull();
    expect(screen.queryByText('267.71 $'))
      .not
      .toBeNull();
  });

});
