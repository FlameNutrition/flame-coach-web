import UIText from '../index';

import { render, screen } from '../../../../testing/test-utils';

describe('<UIText />', () => {

  it('Show content of the UIText', () => {
    render(<UIText>This is the content of text box!</UIText>);

    expect(screen.queryByText('This is the content of text box!')).not.toBeNull();
  });

});
