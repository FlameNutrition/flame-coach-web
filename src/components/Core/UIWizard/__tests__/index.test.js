import UIWizard from '../index';

import { render, screen, fireEvent, waitFor } from '../../../../testing/test-utils';
import sinon from 'sinon';

describe('<UIWizard />', () => {

  it('Show next button disabled when isWizardValid is false', () => {

    const spy = sinon.spy();

    render(<UIWizard
      steps={['Step 1', 'Step 2']}
      getStepContent={(step) => {
        switch (step) {
          case 0: return 'This is the step 1 body content';
          case 1: return 'This is the step 2 body content';
          default: return 'Other';
        }
      }}
      result='Final result!'
      isWizardValid={false}
      handleFinish={spy}
      handleResetValidator={jest.fn()}
    />);

    expect(screen.queryByText('Next').closest('button')).toBeDisabled();
    expect(spy).not.toBeCalled();
  });

  it('Show content of the frist step', () => {

    const spy = sinon.spy();

    render(<UIWizard
      steps={['Step 1', 'Step 2']}
      getStepContent={(step) => {
        switch (step) {
          case 0: return 'This is the step 1 body content';
          case 1: return 'This is the step 2 body content';
          default: return 'Other';
        }
      }}
      result='Final result!'
      isWizardValid
      handleFinish={spy}
      handleResetValidator={jest.fn()}
    />);

    expect(screen.queryByText('Final result!')).toBeNull();
    expect(screen.queryByText('Step 1')).not.toBeNull();
    expect(screen.queryByText('Step 2')).not.toBeNull();
    expect(screen.queryByText('Next').closest('button')).not.toBeDisabled();
    expect(screen.queryByText('Back').closest('button')).toBeDisabled();
    expect(screen.queryByText('Finish')).toBeNull();
    expect(screen.queryByText('Reset')).toBeNull();
    expect(screen.queryByText('This is the step 1 body content')).not.toBeNull();
    expect(screen.queryByText('This is the step 2 body content')).toBeNull();
    expect(spy).not.toBeCalled();
  });

  it('Show content of the second step', async () => {

    const spy = sinon.spy();

    const wizard = <UIWizard
      steps={['Step 1', 'Step 2']}
      getStepContent={(step) => {
        switch (step) {
          case 0: return 'This is the step 1 body content';
          case 1: return 'This is the step 2 body content';
          default: return 'Other';
        }
      }}
      result='Final result!'
      isWizardValid
      handleFinish={spy}
      handleResetValidator={jest.fn()}
    />;

    render(wizard);

    expect(screen.queryByText('Step 1')).not.toBeNull();
    expect(screen.queryByText('Step 2')).not.toBeNull();

    expect(screen.queryByText('Final result!')).toBeNull();
    expect(screen.queryByText('Next').closest('button')).not.toBeDisabled();
    expect(screen.queryByText('Back').closest('button')).toBeDisabled();
    expect(screen.queryByText('Finish')).toBeNull();
    expect(screen.queryByText('Reset')).toBeNull();
    expect(screen.queryByText('This is the step 1 body content')).not.toBeNull();
    expect(screen.queryByText('This is the step 2 body content')).toBeNull();

    fireEvent.click(screen.queryByText('Next'));

    await waitFor(() => screen.queryByText('This is the step 2 body content'));

    expect(screen.queryByText('Final result!')).toBeNull();
    expect(screen.queryByText('Next')).toBeNull();
    expect(screen.queryAllByText('Back')[1].closest('button')).not.toBeDisabled();
    expect(screen.queryAllByText('Finish')[1].closest('button')).not.toBeDisabled();
    expect(screen.queryByText('Reset')).toBeNull();
    expect(spy).not.toBeCalled();
  });

  it('Show content of the final step', async () => {

    const spy = sinon.spy();

    const wizard = <UIWizard
      steps={['Step 1', 'Step 2']}
      getStepContent={(step) => {
        switch (step) {
          case 0: return 'This is the step 1 body content';
          case 1: return 'This is the step 2 body content';
          default: return 'Other';
        }
      }}
      result='Final result!'
      isWizardValid
      handleFinish={spy}
      handleResetValidator={jest.fn()}
    />;

    render(wizard);

    fireEvent.click(screen.queryByText('Next'));

    await waitFor(() => screen.queryByText('This is the step 2 body content'));

    fireEvent.click(screen.queryByText('Finish'));

    await waitFor(() => screen.queryByText('Final result!'));

    expect(screen.queryByText('Step 1')).not.toBeNull();
    expect(screen.queryByText('Step 2')).not.toBeNull();

    expect(screen.queryByText('Final result!')).not.toBeNull();
    expect(screen.queryByText('Reset')).not.toBeNull();
    expect(spy).toBeCalled();
  });

  it('Reset validator when click on back button', async () => {

    const spy = sinon.spy();

    const wizard = <UIWizard
      steps={['Step 1', 'Step 2']}
      getStepContent={(step) => {
        switch (step) {
          case 0: return 'This is the step 1 body content';
          case 1: return 'This is the step 2 body content';
          default: return 'Other';
        }
      }}
      result='Final result!'
      isWizardValid
      handleFinish={jest.fn()}
      handleResetValidator={spy}
    />;

    const { rerender } = render(wizard);

    fireEvent.click(screen.queryByText('Next'));

    rerender(
      <UIWizard
        steps={['Step 1', 'Step 2']}
        getStepContent={(step) => {
          switch (step) {
            case 0: return 'This is the step 1 body content';
            case 1: return 'This is the step 2 body content';
            default: return 'Other';
          }
        }}
        result='Final result!'
        isWizardValid={false}
        handleFinish={jest.fn()}
        handleResetValidator={spy}
      />
    );
  
    fireEvent.click(screen.queryAllByText('Back')[1]);
    expect(spy).toBeCalled();
  });

});
