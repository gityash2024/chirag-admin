import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import chiragLogo from '../assets/chirag-logo.png';
import homeIcon from '../assets/home.png';
import bookingsIcon from '../assets/bookings.png';
import serviceHistoryIcon from '../assets/service-history.png';
import calendarIcon from '../assets/calendar.png';
import withdrawalRequestsIcon from '../assets/withdrawal-requests.png';
import notificationsIcon from '../assets/notifications.png';
import testimonialIcon from '../assets/testimonialial.png';

import reportsIcon from '../assets/reports.png';
import logoutIcon from '../assets/logout.png';

const SidebarContainer = styled.div`
  background-color: #383838;
  color: white;
  width: 300px;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Logo = styled.div`
  padding: 20px;
  img {
    width: 100%;
    max-width: 150px;
  }
`;

const Menu = styled.nav`
  display: flex;
  flex-direction: column;
  flex-grow: ${props => props.bottom ? 0 : 1};
  ${props => props.bottom && `
    margin-top: auto;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 20px;
    margin-bottom: 100px;
  `}
`;

const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  text-decoration: none;
  color: white;
  &.active {
    background-color: rgba(255, 255, 255, 0.1);
  }
  img {
    width: 25px;
    height: 25px;
    margin-right: 15px;
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  width: 100%;
  text-align: left;
  img {
    width: 25px;
    height: 25px;
    margin-right: 15px;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
`;

const ModalText = styled.p`
  margin-bottom: 20px;
  color: #121212;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const CancelButton = styled(ModalButton)`
  background-color: #ccc;
  color: #121212;
`;

const ConfirmButton = styled(ModalButton)`
  background-color: #383838;
  color: white;
`;

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const menuItems = [
    { icon: homeIcon, text: 'Dashboard & Analytics', path: '/home' },
    { icon: bookingsIcon, text: 'Farmer Management', path: '/manage-farmer' },
    { icon: serviceHistoryIcon, text: 'Commision Management', path: '/commission-management' },
    { icon: calendarIcon, text: 'Booking Management', path: '/bookings' },
    { icon: reportsIcon, text: 'Vendor Management', path: '/manage-vendor' },
    { icon: testimonialIcon, text: 'Testimonial Management', path: '/testemonials' },
    { icon: notificationsIcon, text: 'Notification Management', path: '/notifications' },
    { icon: withdrawalRequestsIcon, text: 'Withdrawal Requests', path: '/withdrawals' },
  ];

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    navigate('/');
  };

  return (
    <>
      <SidebarContainer>
        <Logo>
          <img src={chiragLogo} alt="C.H.I.R.A.G." />
        </Logo>
        <Menu>
          {menuItems.map((item) => (
            <MenuItem
              key={item.text}
              to={item.path}
              className={location.pathname === item.path ? 'active' : ''}
            >
              <img src={item.icon} alt={item.text} />
              <span>{item.text}</span>
            </MenuItem>
          ))}
        </Menu>
        <Menu bottom>
          <LogoutButton onClick={handleLogout}>
            <img style={{ height: '25px', width: '25px' }} src={logoutIcon} alt="Logout" />
            <span style={{ fontWeight: '600' ,fontSize: '14px'}}>Logout</span>
          </LogoutButton>
        </Menu>
      </SidebarContainer>

      {showLogoutModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalText>Are you sure you want to Logout?</ModalText>
            <CancelButton onClick={() => setShowLogoutModal(false)}>No</CancelButton>
            <ConfirmButton onClick={confirmLogout}>Yes</ConfirmButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default Sidebar;
