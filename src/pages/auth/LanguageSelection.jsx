import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import languageSelectionImage from '../../assets/language-selection-image.png';
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
  margin-right: 100px;
  // margin-top: 50px;
`;

const Title = styled.h2`
 font-family: 'Public Sans', sans-serif;
  font-weight: 400; /* Regular */
  font-size: 24px;
  color: #23212A;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 16px;
   font-family: 'Public Sans', sans-serif;
  font-weight: 400; /* Regular */
  color: #23212A;
  margin-bottom: 20px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #DBDADE;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #383838;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
`;

const LanguageSelection = () => {
  const [language, setLanguage] = useState('English');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <Container>
      <ImageSection>
        <Image src={languageSelectionImage} alt="Language Selection" />
      </ImageSection>
      <FormSection>
        <LogoContainer>
          <Logo src={chiragLogo} alt="CHIRAG Logo" />
        </LogoContainer>
        <Title>Please select your preferred language</Title>
        <Subtitle>You can change your app language at any time from <br/> Profile {'>'} Language</Subtitle>
        <form onSubmit={handleSubmit}>
          <Select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
          </Select>
          <Button type="submit">Continue</Button>
        </form>
      </FormSection>
    </Container>
  );
};

export default LanguageSelection;