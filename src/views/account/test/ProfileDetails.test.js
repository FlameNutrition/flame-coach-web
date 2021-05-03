import {
  fireEvent,
  render,
  screen,
  waitFor
} from '../../../testing/test-utils';

import ProfileDetails from '../ProfileDetails';
import React from 'react';

describe('<ProfileDetails / >', () => {
  const saveContactInformationHandler = jest.fn();
  const savePersonalInformationHandler = jest.fn();
  const updateUserDetailsHandler = jest.fn();

  it('render component with personal data', () => {
    const userDetails = {
      firstName: 'Miguel',
      lastName: 'Teles',
      email: 'test@gmail.com',
      phoneCode: '+44',
      phoneNumber: '44332211',
      country: 'PT',
      measureType: 'KG_CM',
      gender: 'O',
      weight: 74.60,
      height: 172
    };

    const { container } = render(
      <ProfileDetails
        userDetails={userDetails}
        enablePersonalData
        saveContactInformationHandler={saveContactInformationHandler}
        savePersonalInformationHandler={savePersonalInformationHandler}
        updateUserDetailsHandler={updateUserDetailsHandler}
      />
    );

    expect(container).toMatchSnapshot();

    expect(screen.queryByText('Profile')).not.toBeNull();
    expect(screen.queryByText('Use this section to update information related with you')).not.toBeNull();
    expect(screen.queryByText('Contact information')).not.toBeNull();
    expect(screen.queryByText('Personal information')).not.toBeNull();
  });

  it('render component without personal data', () => {
    const userDetails = {
      firstName: 'Miguel',
      lastName: 'Teles',
      email: 'test@gmail.com',
      phoneCode: '+44',
      phoneNumber: '44332211',
      country: 'PT',
    };

    const { container } = render(
      <ProfileDetails
        userDetails={userDetails}
        saveContactInformationHandler={saveContactInformationHandler}
        savePersonalInformationHandler={savePersonalInformationHandler}
        updateUserDetailsHandler={updateUserDetailsHandler}
      />
    );

    expect(container).toMatchSnapshot();

    expect(screen.queryByText('Profile')).not.toBeNull();
    expect(screen.queryByText('Use this section to update information related with you')).not.toBeNull();
    expect(screen.queryByText('Contact information')).not.toBeNull();
    expect(screen.queryByText('Personal information')).toBeNull();
  });

  it('check data values with personal data', () => {
    const userDetails = {
      firstName: 'Miguel',
      lastName: 'Teles',
      email: 'test@gmail.com',
      phoneCode: '+44',
      phoneNumber: '44332211',
      country: 'PT',
      measureType: 'KG_CM',
      gender: 'O',
      weight: 74.60,
      height: 172
    };

    render(
      <ProfileDetails
        userDetails={userDetails}
        enablePersonalData
        saveContactInformationHandler={saveContactInformationHandler}
        savePersonalInformationHandler={savePersonalInformationHandler}
        updateUserDetailsHandler={updateUserDetailsHandler}
      />
    );

    expect(screen.queryByDisplayValue('Miguel')).not.toBeNull();
    expect(screen.queryByDisplayValue('Teles')).not.toBeNull();
    expect(screen.queryByDisplayValue('test@gmail.com')).not.toBeNull();
    expect(screen.queryByDisplayValue('+44')).not.toBeNull();
    expect(screen.queryByDisplayValue('44332211')).not.toBeNull();

    expect(screen.queryByDisplayValue('PT')).not.toBeNull();
    expect(screen.queryByText('Portugal')).not.toBeNull();

    expect(screen.queryByDisplayValue('KG_CM')).not.toBeNull();
    expect(screen.queryByText('Kg/cm')).not.toBeNull();

    expect(screen.queryByDisplayValue('O')).not.toBeNull();
    expect(screen.queryByText('Other')).not.toBeNull();

    expect(screen.queryByDisplayValue(74.60)).not.toBeNull();
    expect(screen.queryByDisplayValue(172)).not.toBeNull();
  });

  it('check data values without personal data', () => {
    const userDetails = {
      firstName: 'Miguel',
      lastName: 'Teles',
      email: 'test@gmail.com',
      phoneCode: '+44',
      phoneNumber: '44332211',
      country: 'PT',
      measureType: 'KG_CM',
      gender: 'O',
      weight: 74.60,
      height: 172
    };

    render(
      <ProfileDetails
        userDetails={userDetails}
        saveContactInformationHandler={saveContactInformationHandler}
        savePersonalInformationHandler={savePersonalInformationHandler}
        updateUserDetailsHandler={updateUserDetailsHandler}
      />
    );

    expect(screen.queryByDisplayValue('Miguel')).not.toBeNull();
    expect(screen.queryByDisplayValue('Teles')).not.toBeNull();
    expect(screen.queryByDisplayValue('test@gmail.com')).not.toBeNull();
    expect(screen.queryByDisplayValue('+44')).not.toBeNull();
    expect(screen.queryByDisplayValue('44332211')).not.toBeNull();
    expect(screen.queryByDisplayValue('test@gmail.com')).not.toBeNull();
    expect(screen.queryByDisplayValue('test@gmail.com')).toHaveAttribute('disabled');
    expect(screen.queryByDisplayValue('PT')).not.toBeNull();
    expect(screen.queryByText('Portugal')).not.toBeNull();

    expect(screen.queryByDisplayValue('KG_CM')).toBeNull();
    expect(screen.queryByText('Kg/cm')).toBeNull();

    expect(screen.queryByDisplayValue('O')).toBeNull();
    expect(screen.queryByText('Other')).toBeNull();

    expect(screen.queryByDisplayValue(74.60)).toBeNull();
    expect(screen.queryByDisplayValue(172)).toBeNull();
  });

  it('check submit btn for save contact information and personal information', async () => {
    const userDetails = {
      firstName: 'Miguel',
      lastName: 'Teles',
      email: 'test@gmail.com',
      phoneCode: '+44',
      phoneNumber: '44332211',
      country: 'PT',
      measureType: 'KG_CM',
      gender: 'O',
      weight: 74.60,
      height: 172
    };

    render(
      <ProfileDetails
        userDetails={userDetails}
        enablePersonalData
        saveContactInformationHandler={saveContactInformationHandler}
        savePersonalInformationHandler={savePersonalInformationHandler}
        updateUserDetailsHandler={updateUserDetailsHandler}
      />
    );

    fireEvent.click(screen.getAllByText('Save')[0]);

    await waitFor(() => {
      expect(saveContactInformationHandler).toHaveBeenCalledTimes(1);
    });

    fireEvent.click(screen.getAllByText('Save')[1]);

    await waitFor(() => {
      expect(savePersonalInformationHandler).toHaveBeenCalledTimes(1);
    });
  });

  it('check changing data form', async () => {
    const userDetails = {
      firstName: 'Miguel',
      lastName: 'Teles',
      email: 'test@gmail.com',
      phoneCode: '+44',
      phoneNumber: '44332211',
      country: 'PT',
      measureType: 'KG_CM',
      gender: 'O',
      weight: 74.60,
      height: 172
    };

    const { container } = render(
      <ProfileDetails
        userDetails={userDetails}
        enablePersonalData
        saveContactInformationHandler={saveContactInformationHandler}
        savePersonalInformationHandler={savePersonalInformationHandler}
        updateUserDetailsHandler={updateUserDetailsHandler}
      />
    );

    const inputFirstName = container.querySelector('input[name=firstName]');
    const inputLastName = container.querySelector('input[name=lastName]');
    const inputPhoneCode = container.querySelector('input[name=phoneCode]');
    const inputPhone = container.querySelector('input[name=phoneNumber]');
    const selectCountry = container.querySelector('input[name=country]');

    const selectMeasureType = container.querySelector('input[name=measureType]');
    const selectGender = container.querySelector('input[name=gender]');
    const inputWeight = container.querySelector('input[name=weight]');
    const inputHeight = container.querySelector('input[name=height]');

    fireEvent.change(inputFirstName, {
      target: { value: 'Nuno' }
    });
    fireEvent.change(inputLastName, {
      target: { value: 'Bento' }
    });
    fireEvent.change(inputPhoneCode, {
      target: { value: '+33' }
    });
    fireEvent.change(inputPhone, {
      target: { value: '107643' }
    });
    fireEvent.change(selectCountry, {
      target: { value: 'BR' }
    });
    fireEvent.change(selectMeasureType, {
      target: { value: 'LBS_IN' }
    });
    fireEvent.change(selectGender, {
      target: { value: 'F' }
    });
    fireEvent.change(inputWeight, {
      target: { value: 80.5 }
    });
    fireEvent.change(inputHeight, {
      target: { value: 186 }
    });

    await waitFor(() => {
      expect(updateUserDetailsHandler).toHaveBeenCalledTimes(9);
    });
  });
});
