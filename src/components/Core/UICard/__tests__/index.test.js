import UICard from '../index';

import { render, screen } from '../../../../testing/test-utils';

jest.mock('../../Loading', () => () => 'Loading Component');

describe('<UICard />', () => {

  it('Show <Loading /> component while content is loading', () => {
    render(
      <UICard
        isLoading={true}
        title='Hello UICard'>
        This is the content of card!
      </UICard>
    );

    expect(screen.queryByText('Loading Component')).not.toBeNull();
    expect(screen.queryByText('Hello UICard')).toBeNull();
    expect(screen.queryByText('This is the content of card!')).toBeNull();
  });

  it('Show content when loading is finish', () => {
    render(
      <UICard
        isLoading={false}
        title='Hello UICard'>
        This is the content of card!
      </UICard>
    );

    expect(screen.queryByText('Hello UICard')).not.toBeNull();
    expect(screen.queryByText('This is the content of card!')).not.toBeNull();
  });

});
