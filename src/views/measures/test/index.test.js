import React from 'react';
import MeasuresView from '../index';
import { render } from '../../../testing/test-utils';

jest.mock('../../../components/Charts/WeightChart',
  () => () => '-- PLACEHOLDER WeightChart --');

jest.mock('../../../components/Charts/Events',
  () => () => '-- PLACEHOLDER Events --');

jest.mock('../../../components/Charts/Filters',
  () => () => '-- PLACEHOLDER Filters --');

describe('<MeasuresView />', () => {
  it('create component MeasuresView', () => {
    const { container } = render(<MeasuresView />);

    expect(container)
      .toMatchSnapshot();
  });
});
