import React from 'react';
import styled from 'styled-components';
import printIcon from '../assets/print-icon.png';
import profileIcon from '../assets/profile-icon.png';
import { useNavigate } from 'react-router-dom';


const TopbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TopbarLeft = styled.div`
  h1 {
    font-size: 24px;
    margin: 0;
  }
`;

const TopbarRight = styled.div`
  display: flex;
  align-items: center;
`;

const TopbarIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 20px;
  cursor: pointer;
`;

const Topbar = () => {
  const navigate=useNavigate();
  return (
    <TopbarContainer>
    <TopbarLeft>
    </TopbarLeft>
    <TopbarRight>
      <TopbarIcon onClick={()=>navigate('/wallet')} src={printIcon} alt="Print" />
      <TopbarIcon onClick={()=>navigate('/profile')} src={profileIcon} alt="Profile" />
    </TopbarRight>
  </TopbarContainer>
  );
};

export default Topbar;