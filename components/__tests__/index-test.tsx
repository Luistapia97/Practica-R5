import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Alert } from 'react-native';
import Index from '../../app/index';

jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

describe('Index', () => {
  it('renders correctrly', () => {
    render(<Index />);
    expect(screen.getByPlaceholderText('Ingresa tu correo')).toBeTruthy();
    expect(screen.getByPlaceholderText('Ingresa tu contraseña')).toBeTruthy();
    expect(screen.getByText('Iniciar Sesión')).toBeTruthy();
    expect(screen.getByText('Register')).toBeTruthy();
    expect(screen.getByTestId('icon-image')).toBeTruthy();
  });

  it('validates email' , () => {
      render(<Index />);
      const emailInput = screen.getByPlaceholderText('Ingresa tu correo');
      const button = screen.getByText('Iniciar Sesión');
      fireEvent.changeText(emailInput, 'user@');
      fireEvent.press(button);
      expect(Alert.alert).toHaveBeenCalledWith(
          'Error',
          'Todos los campos son obligatorios',
      );
  });

  it('validates password' , () => {
    render(<Index />);
    const emailInput = screen.getByPlaceholderText('Ingresa tu correo');
    const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');
    const button = screen.getByText('Iniciar Sesión');
    fireEvent.changeText(emailInput, 'user@test.com');
    fireEvent.changeText(passwordInput, 'password');
    fireEvent.press(button);
    expect(Alert.alert).toHaveBeenCalledWith(
        'Error',
        'Todos los campos son obligatorios',
    );
  });

  it('submits the form' , () => {
    render(<Index />);
    const emailInput = screen.getByPlaceholderText('Ingresa tu correo');
    const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');
    const button = screen.getByText('Iniciar Sesión');
    fireEvent.changeText(emailInput, 'user@test.com');
    fireEvent.changeText(passwordInput, 'Password1!');
    fireEvent.press(button);
    expect(Alert.alert).toHaveBeenCalledWith(
        'Bienvenido',
        'Correo: user@test.com',
    
    );
  });
  
});

