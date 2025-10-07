import React from 'react';
import Login from '../Login';
import {fireEvent, render} from '@testing-library/react-native';

describe('Login Screen', () => {
  it('should be go to home screen', () => {
    // const navigation = {navigate: () => {}};
    // spyOn(navigation, 'navigate');
    const page = render(<Login />);
    const loginButton = page.getByTestId('LoginButton');

    // fireEvent.press(loginButton);
    // expect(navigation.navigate).toHaveBeenCalledWith('BioAuthNavigator');
  });
});
