import React from 'react';
import { MeasuresView } from '../index';
import { render, screen, waitFor } from '../../../testing/test-utils';
import { fetchWeightClient } from '../../../api/measures/fetchWeightClient';

jest.mock('../../../components/Charts/WeightChart',
  () => () => '-- PLACEHOLDER WeightChart --');

jest.mock('../../../components/Charts/Events',
  () => () => '-- PLACEHOLDER Events --');

jest.mock('../../../components/Charts/Filters',
  () => () => '-- PLACEHOLDER Filters --');

jest.mock('../../../api/measures/fetchWeightClient', () => ({
  fetchWeightClient: jest.fn()
}));

describe('<MeasuresView />', () => {
  it('create component MeasuresView', async () => {
    fetchWeightClient.mockImplementation(() => ({
      isLoading: false,
      isError: false
    }));

    render(<MeasuresView
      clientIdentifier="40dfd08f-bc5f-4cb9-a926-211db8c11c06"
    />);

    expect(fetchWeightClient).toHaveBeenCalledWith('40dfd08f-bc5f-4cb9-a926-211db8c11c06');

    await waitFor(() => {
      expect(screen.getByText('-- PLACEHOLDER WeightChart --')).toBeInTheDocument();
    });
  });
});
