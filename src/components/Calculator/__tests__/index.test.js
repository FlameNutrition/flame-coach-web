import Calculator from '../index';

import { useHarrisBenedictCalculator } from '../../../api/calculator/useHarrisBenedictCalculator';
import { render, screen, fireEvent, waitFor } from '../../../testing/test-utils';
import { extractInputFromTextField, extractSelectFromTextField } from '../../../testing/test-material-ui-utils';
import sinon from 'sinon';

jest.mock('../../../api/calculator/useHarrisBenedictCalculator');

describe('<Calculator />', () => {

  it('Get total of calories when all values are valid', async () => {

    const refetch = sinon.spy();
    useHarrisBenedictCalculator.mockImplementation(() => ({
      data: {
        result: 1456.43
      },
      refetch
    }));

    render(<Calculator />);

    const inputClientAge = extractInputFromTextField(screen.getByTestId('client-age'));
    fireEvent.change(inputClientAge, { target: { valueAsNumber: 30 } });
    await waitFor(() => screen.getByDisplayValue('30'));

    fireEvent.click(screen.queryByText('Next'));
    await waitFor(() => screen.getByText('What is the gender of your client?'));

    const inputClientGender = extractSelectFromTextField(screen.getByTestId('client-gender'));
    fireEvent.change(inputClientGender, { target: { value: 'Female' } });
    await waitFor(() => screen.getByDisplayValue('Female'));

    fireEvent.click(screen.queryByText('Next'));
    await waitFor(() => screen.getByText('What is the height of your client (cm)?'));

    const inputClientHeight = extractInputFromTextField(screen.getByTestId('client-height'));
    fireEvent.change(inputClientHeight, { target: { valueAsNumber: 1.78 } });
    await waitFor(() => screen.getByDisplayValue('1.78'));

    fireEvent.click(screen.queryByText('Next'));
    await waitFor(() => screen.getByText('What is the wight of your client (kg)?'));

    const inputClientWeight = extractInputFromTextField(screen.getByTestId('client-weight'));
    fireEvent.change(inputClientWeight, { target: { valueAsNumber: 80.54 } });
    await waitFor(() => screen.getByDisplayValue('80.54'));

    fireEvent.click(screen.queryByText('Next'));
    await waitFor(() => screen.getByText('What is the activity level of your client (kg)?'));

    const inputClientActivity = extractSelectFromTextField(screen.getByTestId('client-activity'));
    fireEvent.change(inputClientActivity, { target: { value: 2 } });
    await waitFor(() => screen.getByDisplayValue('2'));

    fireEvent.click(screen.queryByText('Finish'));

    expect(refetch).toBeCalledOnce();
    expect(screen.getByText('This is the total of calories based on Harris-Benedict formula', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('1456.43')).toBeInTheDocument();
    expect(screen.getByText('kcal/day.', { exact: false })).toBeInTheDocument();

  });

  it('Disable next button when something is not valid', async () => {
    const refetch = sinon.spy();
    useHarrisBenedictCalculator.mockImplementation(() => ({ refetch }));

    render(<Calculator />);

    const inputClientAge = extractInputFromTextField(screen.getByTestId('client-age'));
    fireEvent.change(inputClientAge, { target: { value: 'Test' } });

    expect(screen.queryByText('Next').closest('button')).toBeDisabled();
    expect(useHarrisBenedictCalculator).not.toBeCalledOnce();
  });

});
