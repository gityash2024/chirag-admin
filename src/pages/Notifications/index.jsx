import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import viewIcon from '../../assets/view-icon.png';
import editIcon from '../../assets/edit-icon.png';
import deleteIcon from '../../assets/delete-icon.png';
import successIcon from '../../assets/check-wallet.png';

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
const AddButton = styled(Link)`
  padding: 8px 16px;
  background-color: #ffffff ;
  text-decoration: none;
  font-weight: 500;
  color: #000000;
  border: 1px solid #000000;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;

  &::before {
    content: '+';
    font-size: 18px;
  }
`;


const TopControls = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const EntriesDropdown = styled.select`
  padding: 8px;
  margin-right: 20px;
  border: 1px solid #E3E6E8;
  border-radius: 4px;
`;

const SearchInput = styled.input`
  padding: 8px;
  border: 1px solid #E3E6E8;
  border-radius: 4px;
  width: 200px;
  margin-left: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border: 1px solid #E3E6E8;
  border-radius: 8px;
  overflow: hidden;
`;

const TableHead = styled.thead`
  background-color: #F9FAFC;
`;

const TableRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid #E3E6E8;
  }
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 12px;
  color: #121212;
  font-weight: 600;
`;

const TableCell = styled.td`
  padding: 12px;
  font-size: 14px;
  color: #121212;
`;

const ActionButton = styled.button`
  padding: 6px 12px;
  margin-right: 8px;
  background-color: ${props => props.color};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const PageInfo = styled.span`
  font-size: 14px;
  color: #121212;
`;

const PageButtons = styled.div`
  display: flex;
`;
const ActionIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
  cursor: pointer;
`;
const PageButton = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  border: 1px solid #E3E6E8;
  background-color: ${props => props.active ? '#000' : 'white'};
  color: ${props => props.active ? 'white' : '#121212'};
  cursor: pointer;
  border-radius: 4px;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Modal2 = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
`;
const ModalContent2 = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 350px;
  max-width: 600px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const ModalTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const ModalRow = styled.tr`
  border-bottom: 1px solid #E3E6E8;
`;

const ModalCell = styled.td`
  padding: 12px;
  font-size: 14px;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const ModalButton = styled.button`
  padding: 12px 42px;
  border-radius: 4px;
  background-color: ${props => props.backgroundColor || 'white'};
  cursor: pointer;
`;

const SuccessIcon = styled.div`
  width: 50px;
  height: 50px;
  background-color: #4CAF50;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 20px;
`;
const BlockConfirmationModal = ({ onClose, onConfirm }) => (
  <Modal2>
    <ModalContent2>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      <h2>Are you sure you want to block this notification  ?</h2>
      <ModalButtons>
        <ModalButton onClick={onClose}>Cancel</ModalButton>
        <ModalButton onClick={onConfirm} style={{ backgroundColor: 'black', color: 'white' }}>Block</ModalButton>
      </ModalButtons>
    </ModalContent2>
  </Modal2>
);

const BlockSuccessModal = ({ onClose }) => (
  <Modal2>
    <ModalContent2>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      <div style={{ textAlign: 'center' }}>
        <img src={successIcon} style={{ width: '50px', height: '50px', marginBottom: '20px' }} alt="Success" />
        </div>
      <h3>Notification successfully blocked</h3>
    </ModalContent2>
  </Modal2>
);
const Notifications = () => {
  const [farmerToBlock, setFarmerToBlock] = useState(null);

  const [showBlockConfirmation, setShowBlockConfirmation] = useState(false);
  const [showBlockSuccess, setShowBlockSuccess] = useState(false);
  const navigate = useNavigate();
  const [notifications] = useState([
    { id: 1, description: 'lorem ipsum dolor sit amet...', sentTo: 'Farmer', uploadDate: '23-08-2024 22:10', type: 'Discount' },
    { id: 2, description: 'lorem ipsum dolor sit amet...', sentTo: 'Vendor', uploadDate: '23-08-2024 22:10', type: 'Informative' },
    { id: 3, description: 'lorem ipsum dolor sit amet...', sentTo: 'Runner', uploadDate: '23-08-2024 22:10', type: 'Informative' },
    { id: 4, description: 'lorem ipsum dolor sit amet...', sentTo: 'Farmer', uploadDate: '23-08-2024 22:10', type: 'Discount' },
    { id: 5, description: 'lorem ipsum dolor sit amet...', sentTo: 'Farmer', uploadDate: '23-08-2024 22:10', type: 'Informative' },
    { id: 6, description: 'lorem ipsum dolor sit amet...', sentTo: 'Runner', uploadDate: '23-08-2024 22:10', type: 'Informative' },
    { id: 7, description: 'lorem ipsum dolor sit amet...', sentTo: 'Vendor', uploadDate: '23-08-2024 22:10', type: 'Discount' },
  ]);

  const [selectedNotification, setSelectedNotification] = useState(null);
  const handleBlockClick = (farmer) => {
    setFarmerToBlock(farmer);
    setShowBlockConfirmation(true);
  };
  
  const handleBlockConfirm = () => {
    // Here you would typically call an API to block the farmer
    setShowBlockConfirmation(false);
    setShowBlockSuccess(true);
  };
  const handleCloseModals = () => {
    setShowBlockConfirmation(false);
    setShowBlockSuccess(false);
    setFarmerToBlock(null);
  };
  const openModal = (notification) => {
    setSelectedNotification(notification);
  };

  const closeModal = () => {
    setSelectedNotification(null);
  };


  return (
    <Container>
      <Header>
        <Title>Notification Management</Title>
        <AddButton to="/add-notification">Add Notification</AddButton>
      </Header>
      <TopControls>
      <span style={{ marginRight: '20px' , fontWeight: '400',fontSize: '13px'}}>Show</span>
          <EntriesDropdown>
            <option>07</option>
            <option>14</option>
            <option>21</option>
          </EntriesDropdown>
          <span style={{ fontWeight: '400',fontSize: '13px'}}>Entries</span>
        <SearchInput placeholder="Search..." />
      </TopControls>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Notification</TableHeader>
            <TableHeader>Sent to</TableHeader>
            <TableHeader>Upload date</TableHeader>
            <TableHeader>Notification type</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </TableHead>
        <tbody>
          {notifications.map(notification => (
            <TableRow key={notification.id}>
              <TableCell>{notification.description}</TableCell>
              <TableCell>{notification.sentTo}</TableCell>
              <TableCell>{notification.uploadDate}</TableCell>
              <TableCell>{notification.type}</TableCell>
              <TableCell>
                <ActionIcon src={viewIcon} alt="View" onClick={() => openModal(notification)} />
                <ActionIcon onClick={() => { navigate('/edit-notification') }} src={editIcon} alt="Edit" />
                <ActionIcon 
  src={deleteIcon} 
  alt="Block" 
  onClick={() => handleBlockClick(notification)}
/>   
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <PageInfo>Showing 1 to 7 of 100 entries</PageInfo>
        <PageButtons>
          <PageButton>Previous</PageButton>
          <PageButton active>1</PageButton>
          <PageButton>2</PageButton>
          <PageButton>3</PageButton>
          <PageButton>4</PageButton>
          <PageButton>5</PageButton>
          <PageButton>Next</PageButton>
        </PageButtons>
      </Pagination>
      {selectedNotification && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Notification Details</ModalTitle>
              <CloseButton onClick={closeModal}>&times;</CloseButton>
            </ModalHeader>
            <ModalTable>
              <tbody>
                <ModalRow>
                  <ModalCell><strong>ID:</strong></ModalCell>
                  <ModalCell>{selectedNotification.id}</ModalCell>
                </ModalRow>
                <ModalRow>
                  <ModalCell><strong>Description:</strong></ModalCell>
                  <ModalCell>{selectedNotification.description}</ModalCell>
                </ModalRow>
                <ModalRow>
                  <ModalCell><strong>Sent To:</strong></ModalCell>
                  <ModalCell>{selectedNotification.sentTo}</ModalCell>
                </ModalRow>
                <ModalRow>
                  <ModalCell><strong>Upload Date:</strong></ModalCell>
                  <ModalCell>{selectedNotification.uploadDate}</ModalCell>
                </ModalRow>
                <ModalRow>
                  <ModalCell><strong>Type:</strong></ModalCell>
                  <ModalCell>{selectedNotification.type}</ModalCell>
                </ModalRow>
              </tbody>
            </ModalTable>
          </ModalContent>
        </Modal>
      )}
       {showBlockConfirmation && (
      <BlockConfirmationModal 
        onClose={handleCloseModals}
        onConfirm={handleBlockConfirm}
      />
    )}
    {showBlockSuccess && (
      <BlockSuccessModal onClose={handleCloseModals} />
    )}
    </Container>
  );
};

export default Notifications;
