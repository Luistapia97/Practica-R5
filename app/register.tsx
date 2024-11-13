import React, { useState } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { useRouter } from "expo-router";

// Estilos usando styled-components
const MainContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f5fcff;
`;

const InputContainer = styled(View)`
  width: 80%;
  margin-bottom: 20px;
`;

const Label = styled(Text)`
  margin-bottom: 5px;
  font-size: 16px;
`;

const Input = styled(TextInput)`
  height: 40px;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
`;

const CustomButton = styled(TouchableOpacity)`
  background-color: #3498db;
  padding: 15px;
  width: 80%;
  border-radius: 10px;
  align-items: center;
`;

const ButtonText = styled(Text)`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

// Validación de correo usando Regex
const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validación de la contraseña
const isValidPassword = (password: string) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isLongEnough = password.length >= 8;
  return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isLongEnough;
};

export default function Register() {

  const router = useRouter();
  const onPressLearnMore = () => {
    router.push({
      pathname: "./",
    });
  }

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validateAndRegister = () => {
    if (!email || !username || !password || !confirmPassword) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
    } else if (!isValidEmail(email)) {
      Alert.alert('Error', 'El correo electrónico no es válido');
    } else if (!isValidPassword(password)) {
      Alert.alert(
        'Error',
        'La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, un número y un carácter especial'
      );
    } else if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
    } else {
      Alert.alert('Éxito', `Registro exitoso para: ${username}`);
      // Aquí puedes redirigir a la página principal (Index) si todo es válido
      router.push({
        pathname: "./",
      });
    }
  };

  return (
    <MainContainer>
      <Text>Registro</Text>

      {/* Campo de Email */}
      <InputContainer>
        <Label>Email</Label>
        <Input
          placeholder="Ingresa tu correo"
          value={email}
          onChangeText={setEmail}
        />
      </InputContainer>

      {/* Campo de Nombre de Usuario */}
      <InputContainer>
        <Label>Nombre de Usuario</Label>
        <Input
          placeholder="Ingresa tu nombre de usuario"
          value={username}
          onChangeText={setUsername}
        />
      </InputContainer>

      {/* Campo de Contraseña */}
      <InputContainer>
        <Label>Contraseña</Label>
        <Input
          placeholder="Ingresa tu contraseña"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </InputContainer>

      {/* Confirmar Contraseña */}
      <InputContainer>
        <Label>Confirmar Contraseña</Label>
        <Input
          placeholder="Repite tu contraseña"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </InputContainer>

      {/* Botón de Registro */}
      <CustomButton onPress={validateAndRegister}>
        <ButtonText>Registrarse</ButtonText>
      </CustomButton>
    </MainContainer>
  );
}
