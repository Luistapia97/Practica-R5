import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Alert } from 'react-native';
import Register from '../../app/register';
import { useRouter } from 'expo-router';

jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

jest.mock("expo-router", () => ({
    useRouter: jest.fn(),
}));

const mockPush = jest.fn();
jest.mock('expo-router', () => ({
    useRouter: () => ({
        push: mockPush
    }),
}));

describe('Register', () => {
  it('renders correctly', () => {
    render(<Register />);
    expect(screen.getByPlaceholderText('Ingresa tu correo')).toBeTruthy();
    expect(screen.getByPlaceholderText('Ingresa tu nombre de usuario')).toBeTruthy();
    expect(screen.getByPlaceholderText('Ingresa tu contraseña')).toBeTruthy();
    expect(screen.getByPlaceholderText('Repite tu contraseña')).toBeTruthy();
    expect(screen.getByText('Registrarse')).toBeTruthy();

  });

    it('validates email', () => {
        render(<Register />);
        const emailInput = screen.getByPlaceholderText('Ingresa tu correo');
        const button = screen.getByText('Registrarse');
        fireEvent.changeText(emailInput, 'user@');
        fireEvent.press(button);
        expect(Alert.alert).toHaveBeenCalledWith(
        'Error',
        'Todos los campos son obligatorios',
        );
    });

    it('validates password', () => {
        render(<Register />);
        const emailInput = screen.getByPlaceholderText('Ingresa tu correo');
        const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');
        const button = screen.getByText('Registrarse');
        fireEvent.changeText(emailInput, 'user@');
        fireEvent.changeText(passwordInput, 'password');
        fireEvent.press(button);
        expect(Alert.alert).toHaveBeenCalledWith(
        'Error',
        'Todos los campos son obligatorios',
        );
    });

    it('confirms password', () => {
        render(<Register />);
        const emailInput = screen.getByPlaceholderText('Ingresa tu correo');
        const usernameInput = screen.getByPlaceholderText('Ingresa tu nombre de usuario');
        const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');
        const confirmPasswordInput = screen.getByPlaceholderText('Repite tu contraseña');
        const button = screen.getByText('Registrarse');
        fireEvent.changeText(emailInput, 'user@');
        fireEvent.changeText(usernameInput, 'UserTest');
        fireEvent.changeText(passwordInput, 'Password1!');
        fireEvent.changeText(confirmPasswordInput, 'Password1');
        fireEvent.press(button);
        expect(Alert.alert).toHaveBeenCalledWith(
            'Error',
            'Todos los campos son obligatorios',
        );
    });

    it('submits the form', () => {
        render(<Register />);
        const emailInput = screen.getByPlaceholderText('Ingresa tu correo');
        const usernameInput = screen.getByPlaceholderText('Ingresa tu nombre de usuario');
        const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');
        const confirmPasswordInput = screen.getByPlaceholderText('Repite tu contraseña');
        const button = screen.getByText('Registrarse');
        fireEvent.changeText(emailInput, 'user@test.com');
        fireEvent.changeText(usernameInput, 'UserTest');
        fireEvent.changeText(passwordInput, 'Password1!');
        fireEvent.changeText(confirmPasswordInput, 'Password1!');
        fireEvent.press(button);
        expect(mockPush).toHaveBeenCalledWith({ pathname: './' });
    });
    
});

