import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import loginImage from '../../assets/login-image.png';
import chiragLogo from '../../assets/logo-dark.svg';
import { loginAdmin } from '../../services/commonService';
import { toast } from 'react-toastify';
import Loader from '../../components/loader';

const Container = styled.div`
  display: flex;
  height: 100vh;
  position: relative;
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
  height: 100vh;
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
  width: 300px;
  margin-right: 70px;
  margin-bottom: 70px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-family: 'Public Sans';
  font-weight: 400;
  color: rgba(35, 33, 42, 0.6);
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 16px;
  color: #23212A;
  margin-bottom: 8px;
  font-family: 'Public Sans';
  font-weight: 400;
`;

const Input = styled.input`
  width: 94%;
  font-family: 'Public Sans';
  font-weight: 400;
  padding: 10px;
  margin-top: 6px;
  margin-bottom: 10px;
  border: 1px solid ${props => props.error ? '#FF4D4F' : '#DBDADE'};
  border-radius: 4px;
  align-self: center;
`;

const ErrorMessage = styled.span`
  color: #FF4D4F;
  font-size: 14px;
  margin-bottom: 10px;
  font-family: 'Public Sans';
  display: block;
`;

const Button = styled.button`
  width: 94%;
  background-color: #383838;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: center;
  opacity: ${props => props.disabled ? 0.7 : 1};
`;

const Login = () => {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setAdminId(email);
    
    if (email && !validateEmail(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(adminId)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      const response = await loginAdmin({ email: adminId, password, role: 'admin'});
      if (response.data.token) {
        toast.success('Welcome to CHIRAG Admin Panel');
        console.log(response.data);
        localStorage.setItem('userData', JSON.stringify(response.data));
        navigate('/');
      } else {
        toast.error('Please enter valid credentials');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      console.error('Login error:', error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
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
        <Title>Please login with your registered Admin Email</Title>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="adminId">Admin Email</Label>
          <Input
            id="adminId"
            type="email"
            placeholder="Enter Admin Email"
            value={adminId}
            onChange={handleEmailChange}
            error={!!emailError}
            required
          />
          {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" disabled={isLoading || !!emailError}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </FormSection>
      {isLoading && <Loader />}
    </Container>
  );
};

export default Login;