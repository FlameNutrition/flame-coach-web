import React from 'react';
import WeightChart from '../index';
import { render } from '../../../../testing/test-utils';

// Is not possible to test the canvas
jest.mock('react-chartjs-2', () => ({
  Line: () => null,
}));

describe('<WeightChart />', () => {
  it('create component WeightChart', () => {
    const { container } = render(<WeightChart
      dataChart={[60, 70, 50, 70, 50, 30, 80]}
      timeFrame="1_WEEK"
    />);

    expect(container).toMatchSnapshot();
  });
});
