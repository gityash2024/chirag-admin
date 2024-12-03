import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import viewIcon from '../../assets/view-icon.png';
import editIcon from '../../assets/edit-icon.png';
import deleteIcon from '../../assets/delete-icon.png';
import successIcon from '../../assets/check-wallet.png';
import { getNotifications, deleteNotification } from '../../services/commonService';
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

const AddButton = styled(Link)`
  padding: 8px 16px;
  background-color: #ffffff;
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
  color: #121212;
`;

const PageButtons = styled.div`
  display: flex;
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
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
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
  justify-content: flex-end;
  margin-top: 20px;
`;

const ModalButton = styled.button`
  padding: 8px 16px;
  margin-left: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
`;

const DeleteButton = styled(ModalButton)`
  background-color: #FF0000;
  color: white;
`;

const CancelButton = styled(ModalButton)`
  background-color: #E0E0E0;
  color: #121212;
`;

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(7);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchNotifications();
  }, [currentPage, entriesPerPage, searchTerm]);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await getNotifications(currentPage, entriesPerPage, searchTerm);
      setNotifications(response.data.notifications);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (e, notification) => {
    e.stopPropagation();
    setSelectedNotification(notification);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirm = async () => {
    setLoading(true);
    try {
      await deleteNotification(selectedNotification._id);
      setShowDeleteConfirmation(false);
      
      
      setShowDeleteSuccess(true);
      fetchNotifications();
    } catch (error) {
      console.error('Error deleting notification:', error);
    }finally{
      setLoading(false);
    }
  };

  const handleCloseModals = () => {
    setShowDeleteConfirmation(false);
    setShowDeleteSuccess(false);
    setSelectedNotification(null);
  };

  const openModal = (notification) => {
    setSelectedNotification(notification);
  };

  const closeModal = () => {
    setSelectedNotification(null);
  };

  return (
    <Container>
      {loading && <Loader />}
      <Header>
        <Title>Notification Management</Title>
        <AddButton to="/add-notification">Add Notification</AddButton>
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
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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
            <TableRow key={notification._id}>
              <TableCell>{notification.description}</TableCell>
              <TableCell>{notification.recipientRole}</TableCell>
              <TableCell>{new Date(notification.createdAt).toLocaleString()}</TableCell>
              <TableCell>{notification.type}</TableCell>
              <TableCell>
                <ActionIcon src={viewIcon} alt="View" onClick={() => openModal(notification)} />
                <ActionIcon
                  src={deleteIcon}
                  alt="Delete"
                  onClick={(e) => handleDeleteClick(e, notification)}
                />
              </TableCell>
            </TableRow>
          ))}
          {!notifications.length && (
            <TableRow>
              <TableCell style={{ textAlign: 'center' }} colSpan={5}> No notifications found.</TableCell>
            </TableRow>
          )}
        </tbody>
      </Table>
      <Pagination>
        <PageInfo>Showing {(currentPage - 1) * entriesPerPage + 1} to {Math.min(currentPage * entriesPerPage, notifications.length)} of {notifications.length} entries</PageInfo>
        <PageButtons>
          <PageButton onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Previous</PageButton>
          {[...Array(totalPages).keys()].map(page => (
            <PageButton key={page + 1} active={currentPage === page + 1} onClick={() => setCurrentPage(page + 1)}>
              {page + 1}
            </PageButton>
          ))}
          <PageButton onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Next</PageButton>
        </PageButtons>
      </Pagination>
      {selectedNotification && !showDeleteConfirmation && !showDeleteSuccess && (
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
                  <ModalCell>{selectedNotification._id}</ModalCell>
                </ModalRow>
                <ModalRow>
                  <ModalCell><strong>Description:</strong></ModalCell>
                  <ModalCell>{selectedNotification.description}</ModalCell>
                </ModalRow>
                <ModalRow>
                  <ModalCell><strong>Sent To:</strong></ModalCell>
                  <ModalCell>{selectedNotification.recipientRole}</ModalCell>
                </ModalRow>
                <ModalRow>
                  <ModalCell><strong>Upload Date:</strong></ModalCell>
                  <ModalCell>{new Date(selectedNotification.createdAt).toLocaleString()}</ModalCell>
                </ModalRow>
                <ModalRow>
                  <ModalCell><strong>Type:</strong></ModalCell>
                  <ModalCell>{selectedNotification.type}</ModalCell>
                </ModalRow>
                <ModalRow>
                  <ModalCell><strong>Frequency:</strong></ModalCell>
                  <ModalCell>{selectedNotification.frequency}</ModalCell>
                </ModalRow>
              </tbody>
            </ModalTable>
          </ModalContent>
        </Modal>
      )}
      {showDeleteConfirmation && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Confirm Delete</ModalTitle>
              <CloseButton onClick={handleCloseModals}>&times;</CloseButton>
            </ModalHeader>
            <p>Are you sure you want to delete this notification?</p>
            <ModalButtons>
              <CancelButton onClick={handleCloseModals}>Cancel</CancelButton>
              <DeleteButton onClick={handleDeleteConfirm}>Yes, Delete</DeleteButton>
            </ModalButtons>
          </ModalContent>
        </Modal>
      )}
      {showDeleteSuccess && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Success</ModalTitle>
              <CloseButton onClick={handleCloseModals}>&times;</CloseButton>
            </ModalHeader>
            <p>Notification successfully deleted</p>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default Notifications;