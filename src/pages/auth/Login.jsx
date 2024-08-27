import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import loginImage from '../../assets/login-image.png';
import chiragLogo from '../../assets/chirag-logo-dark.png';

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const ImageSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Image = styled.img`
  width: 50vw;
  height: 80vh;
  object-fit: contain;
`;

const FormSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;

const Logo = styled.img`
  width: 250px;
  margin-right: 70px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-family: 'Public Sans';
  font-weight: 400; /* Regular */
  color: #23212A;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 16px;
  color: #23212A;
  margin-bottom: 8px;
  font-family: 'Public Sans';
  font-weight: 400; /* Regular */
`;

const Input = styled.input`
  width: 94%;
  font-family: 'Public Sans';
  font-weight: 400; /* Regular */
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #DBDADE;
  border-radius: 4px;
  align-self: center;
`;

const Button = styled.button`
  width: 100%;
  background-color: #383838;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: center;
`;

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <Container>
      <ImageSection>
        <Image src={loginImage} alt="Login" />
      </ImageSection>
      <FormSection>
        <LogoContainer>
          <Logo src={chiragLogo} alt="CHIRAG Logo" />
        </LogoContainer>
        <Title>Please login with your registered <br />Admin Id</Title>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="adminId">Admin Id</Label>
          <Input
            id="adminId"
            type="text"
            placeholder="Enter Admin Id"
            required
          />
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter Password"
            required
          />
          <Button type="submit">Login</Button>
        </form>
      </FormSection>
    </Container>
  );
};

export default Login;
