import React from "react";
import styled, { keyframes } from "styled-components";
import { FaSearchMinus } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
  background-color: #1a1a1a;
  color: #ffffff;
  text-align: center;
`;

const Icon = styled(FaSearchMinus)`
  font-size: 120px;
  color: #FEAF2E;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 48px;
  margin-bottom: 10px;
  color: #FEAF2E;
`;

const Slogan = styled.p`
  font-size: 24px;
  margin-bottom: 30px;
  color: #ffffff;
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(254, 175, 46, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(254, 175, 46, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(254, 175, 46, 0);
  }
`;

const DashboardButton = styled(Link)`
  padding: 12px 24px;
  font-size: 18px;
  background-color: #FEAF2E;
  color: #1a1a1a;
  text-decoration: none;
  border-radius: 25px;
  transition: all 0.3s ease;
  animation: ${pulse} 2s infinite;

  &:hover {
    background-color: #ffffff;
    color: #FEAF2E;
    transform: scale(1.05);
  }
`;

const NotFound: React.FC = () => {
  return (
    <NotFoundContainer>
      <Icon />
      <Title>404 Not Found</Title>
      <Slogan>Oops! Looks like this page took a detour to nowhere.</Slogan>
      <DashboardButton to="/">Back to Dashboard</DashboardButton>
    </NotFoundContainer>
  );
};

export default NotFound;