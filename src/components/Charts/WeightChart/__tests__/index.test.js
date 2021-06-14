import React from 'react';
import WeightChart from '../index';
import { render } from '../../../../testing/test-utils';

describe('<WeightChart />', () => {
  it('create component WeightChart', () => {
    const data = [
      { identifier: 1, date: '2021-04-10', value: 70.5 }
    ];

    const { container } = render(<WeightChart
      dataChart={data}
      timeFrame="1_WEEK"
      measureUnit="Kg"
    />);

    // FIXME: Refactor this to instead of using snapshot, search for specific dates
    expect(container).toMatchSnapshot();
  });
});
