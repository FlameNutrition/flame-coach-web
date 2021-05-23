import React from 'react';
import Filters from '../index';
import {
  render, screen, fireEvent, waitFor
} from '../../../../testing/test-utils';
import sinon from 'sinon';
import moment from 'moment';

describe('<Filters />', () => {
  const changeTimeFrameHandler = sinon.spy();
  const changeDateHandler = sinon.spy();
  const changeWeightHandler = sinon.spy();
  const addWeightHandler = sinon.spy();

  it('create component Filters with adding session', () => {
    const { container } = render(<Filters
      timeFrame="1_WEEK"
      date={moment('2021-04-01', 'YYYY-MM-DD')}
      onChangeDateHandler={changeDateHandler}
      weight={50.5}
      onChangeWeightHandler={changeWeightHandler}
      onChangeTimeFrameHandler={changeTimeFrameHandler}
      enableAddingWeight
      onAddWeightHandler={addWeightHandler}
    />);

    expect(container)
      .toMatchSnapshot();
  });

  it('create component Filters without adding session', () => {
    const { container } = render(<Filters
      timeFrame="1_WEEK"
      onChangeTimeFrameHandler={changeTimeFrameHandler}
    />);

    expect(container)
      .toMatchSnapshot();
  });

  it('check time frame selection menu and change it', async () => {
    const { rerender } = render(<Filters
      timeFrame="1_WEEK"
      onChangeTimeFrameHandler={changeTimeFrameHandler}
    />);

    const timeFrame = screen.queryByDisplayValue('1_WEEK');

    expect(timeFrame)
      .not
      .toBeNull();

    fireEvent.change(timeFrame, {
      target: {
        value: '2_MONTH'
      }
    });

    await waitFor(() => {
      expect(changeTimeFrameHandler)
        .toHaveBeenCalledTimes(1);
    });

    rerender(<Filters
      timeFrame="2_MONTH"
      onChangeTimeFrameHandler={changeTimeFrameHandler}
    />);

    expect(screen.queryByDisplayValue('2_MONTH'))
      .not
      .toBeNull();
  });

  it('check add weight section and handle action', async () => {
    const { rerender } = render(<Filters
      timeFrame="1_WEEK"
      date={moment('2021-04-01', 'YYYY-MM-DD')}
      onChangeDateHandler={changeDateHandler}
      weight={50.5}
      onChangeWeightHandler={changeWeightHandler}
      onChangeTimeFrameHandler={changeTimeFrameHandler}
      enableAddingWeight
      onAddWeightHandler={addWeightHandler}
    />);

    const weight = screen.queryByDisplayValue('50.5');
    const date = screen.queryByDisplayValue('2021/04/01');
    const addBtn = screen.queryAllByText('Add')[1];

    expect(weight)
      .not
      .toBeNull();
    expect(date)
      .not
      .toBeNull();
    expect(addBtn)
      .not
      .toBeNull();

    fireEvent.change(weight, {
      target: {
        value: 70.5
      }
    });
    fireEvent.change(date, {
      target: {
        value: '2021/05/01'
      }
    });
    fireEvent.click(addBtn);

    await waitFor(() => {
      expect(changeDateHandler)
        .toHaveBeenCalledTimes(1);
      expect(changeWeightHandler)
        .toHaveBeenCalledTimes(1);
      expect(addWeightHandler)
        .toHaveBeenCalledTimes(1);
    });

    rerender(<Filters
      timeFrame="1_WEEK"
      date={moment('2021-05-01', 'YYYY-MM-DD')}
      onChangeDateHandler={changeDateHandler}
      weight={70.5}
      onChangeWeightHandler={changeWeightHandler}
      onChangeTimeFrameHandler={changeTimeFrameHandler}
      enableAddingWeight
      onAddWeightHandler={addWeightHandler}
    />);

    expect(screen.queryByDisplayValue('70.5'))
      .not
      .toBeNull();
    expect(screen.queryByDisplayValue('2021/05/01'))
      .not
      .toBeNull();
  });
});
