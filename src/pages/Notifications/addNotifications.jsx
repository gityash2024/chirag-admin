// admin notification-add component 

import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { addNotification } from '../../services/commonService';
import Loader from '../../components/loader';

const Container = styled.div`
  padding: 20px;
  font-family: 'Public Sans';
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

const InputGroup = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  @media (min-width: 768px) {
    flex: 0 0 30.33%;
  }
`;

const Label = styled.label`
  font-size: 14px;
  color: #121212;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #E3E6E8;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #E3E6E8;
  border-radius: 4px;
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

const AddNotification = () => {
  const [description, setDescription] = useState('');
  const [recipientRole, setRecipientRole] = useState('farmer');
  const [type, setType] = useState('informative');
  const [frequency, setFrequency] = useState('once');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addNotification({
        action: "add",
        notificationData: {
          description,
          recipientRole,
          type,
          frequency
        }
      });
      navigate('/notifications');
    } catch (error) {
      console.error('Error adding notification:', error);
    }finally{
      setLoading(false);
    }
  };
  return (
    <Container>
      {loading && <Loader />}
      <Header>
        <Title>Notification Management / Add</Title>
        <BackButton onClick={() => navigate('/notifications')}>
          <BackIcon />
          Back
        </BackButton>
      </Header>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <InputWrapper>
            <Label>Notification Description</Label>
            <Input
              type="text"
              placeholder="Enter notification description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </InputWrapper>
          <InputWrapper>
            <Label>Send to</Label>
            <Select value={recipientRole} onChange={(e) => setRecipientRole(e.target.value)}>
              <option value="farmer">Farmer</option>
              <option value="vendor">Vendor</option>
              <option value="runner">Runner</option>
            </Select>
          </InputWrapper>
          <InputWrapper>
            <Label>Notification Type</Label>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="informative">Informative</option>
              <option value="discount">Discount</option>
            </Select>
          </InputWrapper>
        </InputGroup>
        <InputGroup>
          <InputWrapper>
            <Label>Frequency</Label>
            <Select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
              <option value="once">Once</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </Select>
          </InputWrapper>
        </InputGroup>
        <SaveButton type="submit">Save</SaveButton>
      </Form>
    </Container>
  );
};

export default AddNotification;