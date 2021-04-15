import React from 'react';
import { render } from '../../testing/test-utils';
import NavBarBox from './index';

describe('<NavBarBox/ >', () => {
  it('create component with button & icon', () => {
    const { container } = render(
      <NavBarBox
        title="Having issues?"
        message="Please report any issue did you find. Help us to help you!"
        iconEnable
        icon={(
          <img
            alt="ReportIssue"
            src="/static/icons/issue.png"
          />
            )}
        btnEnable
        btnLabel="Report"
        btnHref="mailto:test@gmail.com"
      />
    );

    expect(container).toMatchSnapshot();
    expect(container.querySelector('h4')).toHaveTextContent('Having issues?');
    expect(container.querySelector('p')).toHaveTextContent('Please report any issue did you find. Help us to help you!');
    expect(container.querySelector('span')).toHaveTextContent('Report');
    expect(container.querySelector('a')).toHaveAttribute('href', 'mailto:test@gmail.com');
    expect(container.querySelector('a')).toHaveAttribute('target', '_blank');
    expect(container.querySelector('img')).toHaveAttribute('alt', 'ReportIssue');
    expect(container.querySelector('img')).toHaveAttribute('src', '/static/icons/issue.png');
  });

  it('create component with icon only', () => {
    const { container } = render(
      <NavBarBox
        title="Having issues?"
        message="Please report any issue did you find. Help us to help you!"
        iconEnable
        icon={(
          <img
            alt="ReportIssue"
            src="/static/icons/issue.png"
          />
            )}
      />
    );

    expect(container).toMatchSnapshot();
    expect(container.querySelector('h4')).toHaveTextContent('Having issues?');
    expect(container.querySelector('p')).toHaveTextContent('Please report any issue did you find. Help us to help you!');
    expect(container.querySelector('span')).toBeNull();
    expect(container.querySelector('a')).toBeNull();
    expect(container.querySelector('img')).toHaveAttribute('alt', 'ReportIssue');
    expect(container.querySelector('img')).toHaveAttribute('src', '/static/icons/issue.png');
  });

  it('create component with button only', () => {
    const { container } = render(
      <NavBarBox
        title="Having issues?"
        message="Please report any issue did you find. Help us to help you!"
        btnEnable
        btnLabel="Report"
        btnHref="mailto:test@gmail.com"
      />
    );

    expect(container).toMatchSnapshot();
    expect(container.querySelector('h4')).toHaveTextContent('Having issues?');
    expect(container.querySelector('p')).toHaveTextContent('Please report any issue did you find. Help us to help you!');
    expect(container.querySelector('span')).toHaveTextContent('Report');
    expect(container.querySelector('a')).toHaveAttribute('href', 'mailto:test@gmail.com');
    expect(container.querySelector('a')).toHaveAttribute('target', '_blank');
    expect(container.querySelector('img')).toBeNull();
  });
});
