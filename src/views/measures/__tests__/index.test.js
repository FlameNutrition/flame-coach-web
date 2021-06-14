import React from 'react';
import { MeasuresView } from '../index';
import { render, screen, waitFor } from '../../../testing/test-utils';
import { useFetchWeightClient } from '../../../api/measures/useFetchWeightClient';
import { useFetchClientPersonalInformation } from '../../../api/client/useFetchClientPersonalInformation';

jest.mock('../../../components/Charts/WeightChart',
  () => () => '-- PLACEHOLDER WeightChart --');

jest.mock('../../../components/Charts/Events',
  () => () => '-- PLACEHOLDER Events --');

jest.mock('../../../components/Charts/Filters',
  () => () => '-- PLACEHOLDER Filters --');

jest.mock('../../../api/measures/useFetchWeightClient', () => ({
  useFetchWeightClient: jest.fn()
}));
jest.mock('../../../api/client/useFetchClientPersonalInformation', () => ({
  useFetchClientPersonalInformation: jest.fn()
}));

describe('<MeasuresView />', () => {
  it('render other components when useFetchWeightClient and useFetchClientPersonalInformation returns success', async () => {
    useFetchWeightClient.mockImplementation(() => ({
      isLoading: false,
      isError: false
    }));
    useFetchClientPersonalInformation.mockImplementation(() => ({
      isLoading: false,
      isError: false,
      data: {
        measureType: {
          code: 'KG_CM',
          value: 'Kg/cm'
        }
      }
    }));

    render(<MeasuresView
      clientIdentifier="40dfd08f-bc5f-4cb9-a926-211db8c11c06"
    />);

    expect(useFetchWeightClient).toHaveBeenCalledWith('40dfd08f-bc5f-4cb9-a926-211db8c11c06');
    expect(useFetchClientPersonalInformation).toHaveBeenCalledWith('40dfd08f-bc5f-4cb9-a926-211db8c11c06');

    await waitFor(() => {
      expect(screen.getByText('-- PLACEHOLDER WeightChart --')).toBeInTheDocument();
      expect(screen.getByText('-- PLACEHOLDER Events --')).toBeInTheDocument();
      expect(screen.getByText('-- PLACEHOLDER Filters --')).toBeInTheDocument();
    });
  });

  it('render exception component when useFetchWeightClient returns failure', async () => {
    useFetchWeightClient.mockImplementation(() => ({
      isLoading: false,
      isError: true
    }));
    useFetchClientPersonalInformation.mockImplementation(() => ({
      isLoading: false,
      isError: false
    }));

    render(<MeasuresView
      clientIdentifier="40dfd08f-bc5f-4cb9-a926-211db8c11c06"
    />);

    expect(useFetchWeightClient).toHaveBeenCalledWith('40dfd08f-bc5f-4cb9-a926-211db8c11c06');
    expect(useFetchClientPersonalInformation).toHaveBeenCalledWith('40dfd08f-bc5f-4cb9-a926-211db8c11c06');

    await waitFor(() => {
      expect(screen.getByText('Oops! Something went wrong! Help us improve your experience by reporting the problem.')).toBeInTheDocument();
    });
  });

  it('render exception component when useFetchClientPersonalInformation returns failure', async () => {
    useFetchWeightClient.mockImplementation(() => ({
      isLoading: false,
      isError: false
    }));
    useFetchClientPersonalInformation.mockImplementation(() => ({
      isLoading: false,
      isError: true
    }));

    render(<MeasuresView
      clientIdentifier="40dfd08f-bc5f-4cb9-a926-211db8c11c06"
    />);

    expect(useFetchWeightClient).toHaveBeenCalledWith('40dfd08f-bc5f-4cb9-a926-211db8c11c06');
    expect(useFetchClientPersonalInformation).toHaveBeenCalledWith('40dfd08f-bc5f-4cb9-a926-211db8c11c06');

    await waitFor(() => {
      expect(screen.getByText('Oops! Something went wrong! Help us improve your experience by reporting the problem.')).toBeInTheDocument();
    });
  });
});
