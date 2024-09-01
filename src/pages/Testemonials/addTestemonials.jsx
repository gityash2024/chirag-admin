import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const Container = styled.div`
  padding: 20px;
  font-family: 'Public Sans' ;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #121212;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f5f5f5;
  border: 1px solid #E3E6E8;
  border-radius: 4px;
  cursor: pointer;
  color: #121212;
  font-size: 16px;
`;

const BackIcon = styled(FiArrowLeft)`
  margin-right: 8px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ImageUploadArea = styled.div`
  display: flex;
  gap: 20px;
`;

const ImageUploadBox = styled.div`
  width: 100px;
  height: 100px;
  border: 2px dashed #E3E6E8;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const SaveButton = styled.button`
  padding: 10px 20px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: center;
`;

const Label = styled.label`
  font-size: 14px;
  color: #121212;
  margin-bottom: 5px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
  }

  .input-wrapper {
    width: 100%;

    @media (min-width: 768px) {
      width: 50%;
    }

    display: flex;
    flex-direction: column;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  padding-right: 80px;
  border: 1px solid #E3E6E8;
  border-radius: 4px;
`;

const SearchButton = styled.button`
  position: absolute;
  right: 10px;
  padding: 6px 15px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
`;

const AddTestimonial = () => {
  const [farmerId, setFarmerId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container>
      <Header>
        <Title>Testimonial Management / Add</Title>
        <BackButton onClick={() => navigate('/testemonials')}>
          <BackIcon />
          Back
        </BackButton>
      </Header>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <div className="input-wrapper">
            <Label>Farmer Name</Label>
            <InputWrapper>
              <Input
                type="text"
                placeholder="User name / user id"
                value={farmerId}
                onChange={(e) => setFarmerId(e.target.value)}
              />
              <SearchButton type="button">Search</SearchButton>
            </InputWrapper>
          </div>
        </InputGroup>
        <ImageUploadArea>
          <ImageUploadBox>+</ImageUploadBox>
          <ImageUploadBox>+</ImageUploadBox>
          <ImageUploadBox>+</ImageUploadBox>
        </ImageUploadArea>
        <SaveButton type="submit" onClick={() => navigate('/testemonials')}>Save</SaveButton>
      </Form>
    </Container>
  );
};

export default AddTestimonial;
