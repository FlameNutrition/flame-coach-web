import React from 'react';
import { fireEvent, render, screen, waitFor } from '../../../testing/test-utils';
import sinon from 'sinon';
import FormDialog from '../index';

describe('<FormDialog />', () => {

  const closeHandler = sinon.spy();
  const deleteHandler = sinon.spy();
  const okHandler = sinon.spy();
  const submitHandler = sinon.spy();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Check children component, dialog title/description and dialog action buttons', () => {

    render(
      <FormDialog
        submitHandler={submitHandler}
        dialogTitle="This is title"
        dialogDescription="This is a description"
        open={true}
        closeHandler={closeHandler}
        deleteHandler={deleteHandler}
        okHandler={okHandler}>
        <div>Form content</div>
      </FormDialog>
    );

    expect(screen.queryByText('Form content'))
      .not
      .toBeNull();
    expect(screen.queryByText('This is title'))
      .not
      .toBeNull();
    expect(screen.queryByText('This is a description'))
      .not
      .toBeNull();
    expect(screen.queryByText('Delete'))
      .not
      .toBeNull();
    expect(screen.queryByText('Cancel'))
      .not
      .toBeNull();
    expect(screen.queryByText('Ok'))
      .not
      .toBeNull();

  });

  it('Check click closeHandler', async () => {

    render(
      <FormDialog
        submitHandler={submitHandler}
        dialogTitle="This is title"
        dialogDescription="This is a description"
        open={true}
        closeHandler={closeHandler}
        deleteHandler={deleteHandler}
        okHandler={okHandler}>
        <div>Form content</div>
      </FormDialog>
    );

    fireEvent.click(screen.queryByText('Cancel'));

    await waitFor(() => {
      expect(closeHandler)
        .toHaveBeenCalledTimes(1);
    });

  });

  it('Check click deleteHandler', async () => {

    render(
      <FormDialog
        submitHandler={submitHandler}
        dialogTitle="This is title"
        dialogDescription="This is a description"
        open={true}
        closeHandler={closeHandler}
        deleteHandler={deleteHandler}
        okHandler={okHandler}>
        <div>Form content</div>
      </FormDialog>
    );

    fireEvent.click(screen.queryByText('Delete'));

    await waitFor(() => {
      expect(deleteHandler)
        .toHaveBeenCalledTimes(1);
    });

  });

  it('Delete btn not present when deleteHandler is null', async () => {

    render(
      <FormDialog
        submitHandler={submitHandler}
        dialogTitle="This is title"
        dialogDescription="This is a description"
        open={true}
        closeHandler={closeHandler}
        deleteHandler={null}
        okHandler={okHandler}>
        <div>Form content</div>
      </FormDialog>
    );

    expect(screen.queryByText('Delete'))
      .toBeNull();

  });
});
