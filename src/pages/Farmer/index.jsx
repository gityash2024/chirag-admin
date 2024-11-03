import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import viewIcon from '../../assets/view-icon.png';
import editIcon from '../../assets/edit-icon.png';
import blockIcon from '../../assets/delete-icon.png';
import successIcon from '../../assets/check-wallet.png';
import { getFarmers, blockFarmer, unblockFarmer } from '../../services/commonService';

const Container = styled.div`
  padding: 20px;
  font-family: 'Public Sans';
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #121212;
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
  margin-left: 10px;
`;

const SearchInput = styled.input`
  padding: 8px;
  border: 1px solid #DBDADE;
  border-radius: 4px;
  width: 320px;
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
  color: #121212;
  font-weight: 600;
`;

const TableCell = styled.td`
  padding: 12px;
  font-size: 16px;
  font-weight: 500;
  border-bottom: 1px solid #DBDADE;
  font-family: 'Montserrat';
  color: #121212;
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
  color: #121212;
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
  color: #121212;
`;

const PageButtons = styled.div`
  display: flex;
`;

const PageButton = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  border: 1px solid #DBDADE;
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

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 320px;
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
  margin: 2px;
`;


const ManageFarmer = () => {
  const [farmers, setFarmers] = useState([]);
  const [showBlockConfirmation, setShowBlockConfirmation] = useState(false);
  const [showBlockSuccess, setShowBlockSuccess] = useState(false);
  const [farmerToBlock, setFarmerToBlock] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(7);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBlocked, setFilterBlocked] = useState('all');
  const navigate = useNavigate();

  const BlockConfirmationModal = ({ onClose, onConfirm }) => (
    <Modal>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>
          {farmerToBlock.isBlocked ? 'Are you sure you want to unblock this farmer?' : 'Are you sure you want to block this farmer?'}
        </h2>
        <ModalButtons>
          <ModalButton onClick={onClose}>Cancel</ModalButton>
          <ModalButton onClick={onConfirm} style={{ backgroundColor: 'black', color: 'white' }}>
            {farmerToBlock.isBlocked ? 'Unblock' : 'Block'}
          </ModalButton>
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
        <h4  style={{ textAlign: 'center' }}>Farmer successfully {farmerToBlock.isBlocked ? 'unblocked' : 'blocked'}</h4>
      </ModalContent>
    </Modal>
  );

  useEffect(() => {
    fetchFarmers();
  }, []);

  const fetchFarmers = async () => {
    try {
      const response = await getFarmers();
      setFarmers(response.data);
    } catch (error) {
      console.error('Error fetching farmers:', error);
    }
  };

  const handleBlockClick = (farmer) => {
    setFarmerToBlock(farmer);
    setShowBlockConfirmation(true);
  };

  const handleBlockConfirm = async () => {
    try {
      if (farmerToBlock.isBlocked) {
        await unblockFarmer(farmerToBlock._id);
      } else {
        await blockFarmer(farmerToBlock._id);
      }
      setShowBlockConfirmation(false);
      setShowBlockSuccess(true);
      fetchFarmers();
    } catch (error) {
      console.error('Error blocking/unblocking farmer:', error);
    }
  };

  const handleCloseModals = () => {
    setShowBlockConfirmation(false);
    setShowBlockSuccess(false);
    setFarmerToBlock(null);
  };

  const filteredFarmers = farmers.filter(farmer =>
    (farmer?.name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
    farmer?.mobileNumber.includes(searchTerm) ||
    farmer?.state?.toLowerCase().includes(searchTerm?.toLowerCase())) &&
    (filterBlocked === 'all' || (filterBlocked === 'blocked' && farmer.isBlocked) || (filterBlocked === 'unblocked' && !farmer.isBlocked))
  );

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredFarmers.slice(indexOfFirstEntry, indexOfLastEntry);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleViewEditClick = (farmer, mode) => {
    navigate(`/${mode}-farmer`, { state: { farmer, mode } });
  };

  return (
    <Container>
      <Header>
        <Title>Manage Farmers</Title>
        {/* <ButtonGroup>
          <Link to="/add-farmer">
            <AddFarmerButton>Add Farmer</AddFarmerButton>
          </Link>
        </ButtonGroup> */}
      </Header>
      <TopControls>
        <span style={{ marginRight: '20px', fontWeight: '400', fontSize: '13px' }}>Show</span>
        <EntriesDropdown value={entriesPerPage} onChange={(e) => setEntriesPerPage(Number(e.target.value))}>
          <option value={7}>07</option>
          <option value={14}>14</option>
          <option value={21}>21</option>
        </EntriesDropdown>
        <span style={{ fontWeight: '400', fontSize: '13px' }}>Entries</span>
        <SearchInput
          placeholder="Search by Name, Mobile Number, State"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <EntriesDropdown value={filterBlocked} onChange={(e) => setFilterBlocked(e.target.value)}>
          <option value="all">All Farmers</option>
          <option value="blocked">Blocked Farmers</option>
          <option value="unblocked">Unblocked Farmers</option>
        </EntriesDropdown>
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
          {currentEntries.map(farmer => (
            <TableRow key={farmer._id}>
              <TableCell>
                <FarmerCell>
                  <FarmerAvatar>{farmer.name?.[0]||'--'}</FarmerAvatar>
                  {farmer.name||'--'}
                </FarmerCell>
              </TableCell>
              <TableCell>{farmer.mobileNumber||'--'}</TableCell>
              <TableCell>{farmer.state||'--'}</TableCell>
              <TableCell>
                {farmer.isBlocked ? (
                  <span>
                    Blocked By Admin
                    <span title="Unblock Farmer" onClick={() => handleBlockClick(farmer)} style={{cursor:"pointer", marginLeft: "10px"}}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 36 36" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet">
                        <path fill="#AAB8C2" d="M18 0c-4.612 0-8.483 3.126-9.639 7.371l3.855 1.052A5.999 5.999 0 0 1 18 4a6 6 0 0 1 6 6v10h4V10c0-5.522-4.477-10-10-10z"/>
                        <path fill="#FFAC33" d="M31 32a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V20a4 4 0 0 1 4-4h18a4 4 0 0 1 4 4v12z"/>
                      </svg>
                    </span>
                  </span>
                ) : (
                  <>
                    <ActionIcon src={viewIcon} alt="View" onClick={() => handleViewEditClick(farmer, 'view')} />
                    <ActionIcon src={editIcon} alt="Edit" onClick={() => handleViewEditClick(farmer, 'edit')} />
                    <ActionIcon src={blockIcon} alt="Block" onClick={() => handleBlockClick(farmer)} />
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
          {!currentEntries.length && <TableCell style={{ textAlign: 'center' }} colSpan={4}>No farmers found</TableCell>}
        </tbody>
      </Table>
      <Pagination>
        <PageInfo>Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, filteredFarmers.length)} of {filteredFarmers.length} entries</PageInfo>
        <PageButtons>
          <PageButton onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</PageButton>
          {Array.from({ length: Math.ceil(filteredFarmers.length / entriesPerPage) }, (_, i) => (
            <PageButton key={i} active={currentPage === i + 1} onClick={() => paginate(i + 1)}>{i + 1}</PageButton>
          ))}
          <PageButton onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteredFarmers.length / entriesPerPage)}>Next</PageButton>
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