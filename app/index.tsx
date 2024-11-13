import React, { useState } from "react";
import styled from "styled-components/native";
import { View, TextInput, Button, Alert, Text, Image, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { getMusicData } from "./api-client";


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

const ImageStyled = styled(Image)`
  width: 150px;
  height: 100px;
  margin-bottom: 20px;
`;

const CustomButton = styled(Pressable)`
  background-color: #ffa500;
  padding: 15px;
  width: 50%;
  border-radius: 10px;
  align-items: center;
`;

const ButtonText = styled(Text)`
  color: blue;
  font-size: 16px;
  font-weight: bold;
`;



// Validación del correo
const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password: string) => {
  const hasUpperCase = /[A-Z]/.test(password); 
  const hasNumber = /\d/.test(password); 
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password); 
  const isLongEnough = password.length >= 8; 

  return hasUpperCase && hasNumber && hasSpecialChar && isLongEnough;
};

export default function Index() {
  const router = useRouter();
  getMusicData().then(data => console.warn(data))
  const onPressLearnMore = () => {
    router.push({
      pathname: "./register", 
    });
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateAndSubmit = () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Todos los campos son obligatorios');
    } else if (!isValidEmail(email)) {
      Alert.alert('Error', 'El correo electrónico no es válido');
    } else if (!isValidPassword(password)) {
      Alert.alert(
        'Error', 
        'La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial'
      );
    } else {
      Alert.alert('Bienvenido', `Correo: ${email}`);
    }
  };
  return (
    <MainContainer>

      <ImageStyled 
        source={{ uri: 'https://phantom-marca.unidadeditorial.es/69f8894154575e253ad4bf43c8865ef9/resize/828/f/jpg/assets/multimedia/imagenes/2024/10/15/17289905135159.jpg' }} 
        testID="icon-image"
      />

    
      <InputContainer>
        <Label>Correo Electrónico</Label>
        <Input
          placeholder="Ingresa tu correo"
          value={email}
          onChangeText={setEmail}
        />
      </InputContainer>

      
      <InputContainer>
        <Label>Contraseña</Label>
        <Input
          placeholder="Ingresa tu contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </InputContainer>

      <Button
        onPress={onPressLearnMore}
        title="Register"
        color="#841584"
        accessibilityLabel="Register button"
      />

      <Button 
      onPress={() => router.push("/home")}
      title="Musica"
        />


    
      <CustomButton onPress={validateAndSubmit}>
        <ButtonText>Iniciar Sesión</ButtonText>
      </CustomButton>
    </MainContainer>
  );
}

