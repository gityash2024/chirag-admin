import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import viewIcon from '../../assets/view-icon.png';
import editIcon from '../../assets/edit-icon.png';
import blockIcon from '../../assets/delete-icon.png';
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
  flex-wrap: wrap; /* Ensure it wraps nicely on smaller screens */
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px; /* Space between buttons */
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #4B465C;
`;

const AddFarmerButton = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background-color: #ffff;
  border: 1px solid #000000;
  border-radius: 6px;
  color: #000000;
  font-weight: 500;
  cursor: pointer;

  &::before {
    content: '+';
    margin-right: 8px;
    font-size: 18px;
  }
`;

const BlockedFarmerButton = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background-color: #ffffff;
  border: 1px solid #000000;
  border-radius: 6px;
  color: 000000;
  font-weight: 500;
  cursor: pointer;

  &::before {
    content: '🚫';
    margin-right: 8px;
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
  border: 1px solid #DBDADE;
  border-radius: 4px;
`;

const SearchInput = styled.input`
  padding: 8px;
  border: 1px solid #DBDADE;
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
  background-color: #F5F6F7;
`;

const TableRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid #DBDADE;
  }
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 12px;
  color: #4B465C;
  font-weight: 600;
`;

const TableCell = styled.td`
  padding: 12px;
  font-size: 16px;
  font-weight: 500;
  border-bottom: 1px solid #DBDADE;
  font-family: 'Montserrat';
  color: #4B465C;
`;

const FarmerCell = styled.div`
  display: flex;
  align-items: center;
`;

const FarmerAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #DBDADE;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  font-weight: 600;
  color: #4B465C;
`;

const ActionIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
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
  font-weight: 500;
  font-family: 'Montserrat';
  color: #4B465C;
`;

const PageButtons = styled.div`
  display: flex;
`;

const PageButton = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  border: 1px solid #DBDADE;
  background-color: ${props => props.active ? '#000' : 'white'};
  color: ${props => props.active ? 'white' : '#4B465C'};
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

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
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
  <Modal>
    <ModalContent>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      <h2>Are you sure you want to block this farmer?</h2>
      <ModalButtons>
        <ModalButton onClick={onClose}>Cancel</ModalButton>
        <ModalButton onClick={onConfirm} style={{ backgroundColor: 'black', color: 'white' }}>Block</ModalButton>
      </ModalButtons>
    </ModalContent>
  </Modal>
);

const BlockSuccessModal = ({ onClose }) => (
  <Modal>
    <ModalContent>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      <div style={{ textAlign: 'center' }}>
        <img src={successIcon} style={{ width: '50px', height: '50px', marginBottom: '20px' }} alt="Success" />
        </div>
      <h3>Farmer successfully blocked</h3>
    </ModalContent>
  </Modal>
);
const ManageFarmer = () => {
  const [showBlockConfirmation, setShowBlockConfirmation] = useState(false);
const [showBlockSuccess, setShowBlockSuccess] = useState(false);
const [farmerToBlock, setFarmerToBlock] = useState(null);
  const [farmers] = useState([
    { id: 1, name: 'Jacob Jones', contact: '+91 123 456 7890', state: 'Uttar Pradesh' },
    { id: 2, name: 'Darrell Steward', contact: '+91 123 456 7890', state: 'Chattisgarh' },
    { id: 3, name: 'Esther Howard', contact: '+91 123 456 7890', state: 'Madhya Pradesh' },
    { id: 4, name: 'Jane Cooper', contact: '+91 123 456 7890', state: 'Uttar Pradesh' },
    { id: 5, name: 'Arlene McCoy', contact: '+91 123 456 7890', state: 'Madhya Pradesh' },
    { id: 6, name: 'Jane Cooper', contact: '+91 123 456 7890', state: 'Uttar Pradesh' },
    { id: 7, name: 'Jane Cooper', contact: '+91 123 456 7890', state: 'Chattisgarh' },
    { id: 8, name: 'Ralph Edwards', contact: '+91 123 456 7890', state: 'Madhya Pradesh' },
  ]);
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
  return (
    <Container>
     <Header>
  <Title>Manage Farmers</Title>
  <ButtonGroup>
    <Link to="/add-farmer">
      <AddFarmerButton>Add Farmer</AddFarmerButton>
    </Link>
    <BlockedFarmerButton>Blocked Farmers</BlockedFarmerButton>
  </ButtonGroup>
</Header>
      <TopControls>
        <EntriesDropdown>
          <option>07</option>
          <option>14</option>
          <option>21</option>
        </EntriesDropdown>
        <span>Entries</span>
        <SearchInput placeholder="Search..." />
      </TopControls>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Farmer Name</TableHeader>
            <TableHeader>Farmer Contact</TableHeader>
            <TableHeader>State</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </TableHead>
        <tbody>
          {farmers.map(farmer => (
            <TableRow key={farmer.id}>
              <TableCell>
                <FarmerCell>
                  <FarmerAvatar>{farmer.name[0]}</FarmerAvatar>
                  {farmer.name}
                </FarmerCell>
              </TableCell>
              <TableCell>{farmer.contact}</TableCell>
              <TableCell>{farmer.state}</TableCell>
              <TableCell>
                <Link to={`/view-farmer/${farmer.id}`}>
                  <ActionIcon src={viewIcon} alt="View" />
                </Link>
                <Link to={`/edit-farmer/${farmer.id}`}>
                  <ActionIcon src={editIcon} alt="Edit" />
                </Link>
                <ActionIcon 
  src={blockIcon} 
  alt="Block" 
  onClick={() => handleBlockClick(farmer)}
/>              </TableCell>
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

export default ManageFarmer;
