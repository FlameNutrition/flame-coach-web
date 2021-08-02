import Spinner from '../Spinner';
import React from 'react';
import { render, screen } from '../../testing/test-utils';

describe('<Spinner />', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Show server error message when isError true', () => {

    render(
      <Spinner
        isError={true}
        isLoading={false}
        pageTitle="Hello Title">
        <div>Hello</div>
      </Spinner>
    );

    expect(screen.queryByText('Oops! Something went wrong! Help us improve your experience by reporting the problem.'))
      .not
      .toBeNull();

  });

  it('Show loading component when isLoading true', () => {
    const { container } = render(
      <Spinner
        isError={false}
        isLoading={true}
        pageTitle="Hello Title">
        <div>Hello</div>
      </Spinner>
    );

    expect(container)
      .toMatchSnapshot();
    expect(screen.queryByText('Oops! Something went wrong! Help us improve your experience by reporting the problem.'))
      .toBeNull();
  });

  it('Show children component when isError and isLoading false', () => {
    render(
      <Spinner
        isError={false}
        isLoading={false}
        pageTitle="Hello Title">
        <div>Hey! Is working...</div>
      </Spinner>
    );

    expect(screen.queryByText('Hey! Is working...'))
      .not
      .toBeNull();
  });

});
