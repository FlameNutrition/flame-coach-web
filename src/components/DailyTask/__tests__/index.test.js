import React from 'react';
import sinon from 'sinon';
import { render, fireEvent, screen } from '../../../testing/test-utils';
import DailyTask from '../index';

describe('<Daily Task/ >', () => {
  const updateTaskHandlerSpy = sinon.spy();
  const deleteTaskHandlerSpy = sinon.spy();
  const checkTaskHandlerSpy = sinon.spy();
  const task = {
    identifier: '07f8536d-c78f-4af3-b668-3c83d122e6e9',
    ticked: true,
    taskName: 'Drink Water',
    date: '2021-04-05',
    taskDescription: 'You should drink 3L of water'
  };

  it('Show daily task with delete and update btn', () => {
    const { container } = render(<DailyTask
      task={task}
      enableUpdate
      enableDelete
      updateTaskHandler={updateTaskHandlerSpy}
      deleteTaskHandler={deleteTaskHandlerSpy}
    />);

    expect(container).toMatchSnapshot();

    expect(screen.queryByTestId('formControlLabelDeleteTask')).not.toBeNull();
    expect(screen.queryByTestId('formControlLabelCheckTask')).toBeNull();
    expect(screen.queryByText('Update')).not.toBeNull();
    expect(screen.queryByTestId('identifier')).toHaveAttribute('id', task.identifier);
    expect(screen.queryByTestId('name')).toHaveTextContent(task.taskName);
    expect(screen.queryByTestId('description')).toHaveTextContent(task.taskDescription);

    fireEvent.click(screen.getByTestId('deleteTask'));
    fireEvent.click(screen.getByTestId('updateTask'));

    expect(deleteTaskHandlerSpy).toHaveBeenCalledOnce();
    expect(updateTaskHandlerSpy).toHaveBeenCalledOnce();
  });

  it('Show daily task with checked btn', () => {
    const { container } = render(<DailyTask
      task={task}
      enableCheck
      enableDate
      checkTaskHandler={checkTaskHandlerSpy}
    />);

    expect(container).toMatchSnapshot();

    expect(screen.queryByTestId('formControlLabelCheckTask')).not.toBeNull();
    expect(screen.queryByTestId('formControlLabelDeleteTask')).toBeNull();
    expect(screen.queryByText('Update')).toBeNull();
    expect(screen.queryByTestId('identifier')).toHaveAttribute('id', task.identifier);
    expect(screen.queryByText(task.taskName)).not.toBeNull();
    expect(screen.queryByTestId('description')).toHaveTextContent(task.taskDescription);
    expect(screen.queryByTestId('date')).toHaveTextContent(task.date);

    fireEvent.click(screen.getByTestId('checkedTask'));

    expect(checkTaskHandlerSpy).toHaveBeenCalledOnce();
  });
});
