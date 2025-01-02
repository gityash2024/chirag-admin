import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import viewIcon from '../../assets/view-icon.png';
import editIcon from '../../assets/edit-icon.png';
import blockIcon from '../../assets/delete-icon.png';
import successIcon from '../../assets/check-wallet.png';
import { getAllVendors, blockVendor, unblockVendor,updateVendorDroneVerification } from '../../services/commonService';
import { toast } from 'react-toastify';
import Loader from '../../components/loader';
import { Copy } from 'lucide-react';
import { Users } from 'lucide-react'; // Add this with other imports

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

const AddVendorButton = styled.button`
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
  width: 300px;
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
  font-family: 'Public Sans';
  color: #121212;
`;

const VendorCell = styled.div`
  display: flex;
  align-items: center;
`;

const VendorAvatar = styled.div`
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
  font-family: 'Public Sans';
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
  width: 400px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  margin-right: 10px;
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 24px;
  
  &:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }
  
  input:checked + & {
    background-color: #000000;
  }
  
  input:checked + &:before {
    transform: translateX(26px);
  }
`;

const VerificationStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StatusText = styled.span`
  font-size: 14px;
  color: ${props => props.verified ? '#2E7D32' : '#757575'};
`;

const DroneVerificationModal = ({ onClose, onConfirm, vendor, newStatus }) => (
  <Modal>
    <ModalContent>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      <h2 style={{ marginBottom: '20px',fontFamily: 'Public Sans', fontWeight: '500', color: '#000000' }}>Confirm Drone UIN Status Change</h2>
      <p style={{ marginBottom: '20px',fontFamily: 'Public Sans', fontWeight: '400', color: '#121212' }}>Are you sure you want to {newStatus ? 'verify' : 'unverify'} the drone UIN for vendor {vendor.name}?</p>
      <ModalButtons>
        <ModalButton onClick={onClose}>Cancel</ModalButton>
        <ModalButton 
          onClick={onConfirm} 
          style={{ backgroundColor: 'black', color: 'white',marginLeft: '5px' }}
        >
          Confirm 
        </ModalButton>
      </ModalButtons>
    </ModalContent>
  </Modal>
);

const DroneVerificationSuccessModal = ({ onClose, isVerified }) => (
  <Modal>
    <ModalContent>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      <div style={{ textAlign: 'center' }}>
        <img src={successIcon} style={{ width: '50px', height: '50px', marginBottom: '20px' }} alt="Success" />
      </div>
      <h3>Drone UIN successfully {isVerified ? 'verified' : 'unverified'}</h3>
    </ModalContent>
  </Modal>
);
const BlockConfirmationModal = ({ onClose, onConfirm, vendorToBlock }) => (
  <Modal>
    <ModalContent>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      <h2>Are you sure you want to {vendorToBlock?.isBlocked ? 'unblock' : 'block'} this vendor?</h2>
      <ModalButtons>
        <ModalButton onClick={onClose}>Cancel</ModalButton>
        <ModalButton onClick={onConfirm} style={{ backgroundColor: 'black', color: 'white' }}>
          {vendorToBlock?.isBlocked ? 'Unblock' : 'Block'}
        </ModalButton>
      </ModalButtons>
    </ModalContent>
  </Modal>
);

const BlockSuccessModal = ({ onClose, vendorToBlock }) => (
  <Modal>
    <ModalContent>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      <div style={{ textAlign: 'center' }}>
        <img src={successIcon} style={{ width: '50px', height: '50px', marginBottom: '20px' }} alt="Success" />
      </div>
      <h3>Vendor successfully {vendorToBlock?.isBlocked ? 'unblocked' : 'blocked'}</h3>
    </ModalContent>
  </Modal>
);

const ManageVendors = () => {
  const [vendors, setVendors] = useState([]);
  const [showBlockConfirmation, setShowBlockConfirmation] = useState(false);
  const [showBlockSuccess, setShowBlockSuccess] = useState(false);
  const [vendorToBlock, setVendorToBlock] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(7);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading]= useState(false);
  const [filterBlocked, setFilterBlocked] = useState('all');
  const navigate = useNavigate();
  const [showDroneVerificationModal, setShowDroneVerificationModal] = useState(false);
  const [showDroneVerificationSuccess, setShowDroneVerificationSuccess] = useState(false);
  const [vendorToVerify, setVendorToVerify] = useState(null);
  const [newVerificationStatus, setNewVerificationStatus] = useState(false);


  const handleDroneVerificationClick = (vendor, newStatus) => {
    setVendorToVerify(vendor);
    setNewVerificationStatus(newStatus);
    setShowDroneVerificationModal(true);
  };

  const handleDroneVerificationConfirm = async () => {
    try {
      await updateVendorDroneVerification(vendorToVerify._id, newVerificationStatus);
      setShowDroneVerificationModal(false);
      setShowDroneVerificationSuccess(true);
      fetchVendors();
    } catch (error) {
      toast.error('Failed to update drone verification status');
    }
  };

  const handleCloseDroneModals = () => {
    setShowDroneVerificationModal(false);
    setShowDroneVerificationSuccess(false);
    setVendorToVerify(null);
  };
  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    setLoading(true);
    try {
      const response = await getAllVendors();
      setVendors(response.data);
    } catch (error) {
      toast.error('Failed to fetch vendors');
    }finally{
      setLoading(false);
    }
  };

  const handleBlockClick = (vendor) => {
    setVendorToBlock(vendor);
    setShowBlockConfirmation(true);
  };

  const handleBlockConfirm = async () => {
    setIsLoading(true);
    try {
      if (vendorToBlock.isBlocked) {
        await unblockVendor(vendorToBlock._id);
      } else {
        await blockVendor(vendorToBlock._id);
      }
      setShowBlockConfirmation(false);
      setShowBlockSuccess(true);
      fetchVendors();
    } catch (error) {
      toast.error('Failed to block/unblock vendor');
    }finally{
      setIsLoading(false);
    }
  };

  const handleCloseModals = () => {
    setShowBlockConfirmation(false);
    setShowBlockSuccess(false);
    setVendorToBlock(null);
  };
  const handleDroneVerification = async (vendor) => {
    try {
      await updateVendorDroneVerification(vendor._id, !vendor.vendorDroneVerified);
      toast.success(`Drone UIN ${!vendor.vendorDroneVerified ? 'verified' : 'unverified'} successfully`);
      fetchVendors(); // Refresh the vendor list
    } catch (error) {
      toast.error('Failed to update drone verification status');
    }
  };
  const filteredVendors = vendors.filter(vendor =>
    (vendor.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    vendor.mobileNumber?.includes(searchTerm) ||
    vendor.state?.toLowerCase()?.includes(searchTerm?.toLowerCase())) &&
    (filterBlocked === 'all' || 
    (filterBlocked === 'blocked' && vendor.isBlocked) || 
    (filterBlocked === 'unblocked' && !vendor.isBlocked))
  );

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredVendors.slice(indexOfFirstEntry, indexOfLastEntry);
const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
  toast.success('Contact Number copied to clipboard!');
}
  return (
    <Container>
      {loading && <Loader />}
      <Header>
        <Title>Manage Vendors</Title>
        {/* <Link to="/add-vendor">
          <AddVendorButton>Add Vendor</AddVendorButton>
        </Link> */}
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
          <option value="all">All Vendors</option>
          <option value="blocked">Blocked Vendors</option>
          <option value="unblocked">Unblocked Vendors</option>
        </EntriesDropdown>
      </TopControls>
      <Table>
      <TableHead>
  <TableRow>
    <TableHeader>Vendor Name</TableHeader>
    <TableHeader>Vendor Contact</TableHeader>
    <TableHeader>State</TableHeader>
    <TableHeader>Drone UIN</TableHeader>
    <TableHeader>Actions</TableHeader>
  </TableRow>
</TableHead>
<tbody>

  {currentEntries.map(vendor => (
    <TableRow key={vendor._id}>
      <TableCell>
        <VendorCell>
          <VendorAvatar>{vendor.name[0]}</VendorAvatar>
          {vendor.name}
        </VendorCell>
      </TableCell>
      <TableCell>{vendor.mobileNumber}<Copy style={{cursor:"pointer", marginLeft: "10px"}} onClick={() => copyToClipboard(vendor.mobileNumber)} /></TableCell>
      <TableCell>{vendor.state}</TableCell>
      <TableCell>
        <VerificationStatus>
          <ToggleSwitch>
            <input
              type="checkbox"
              checked={vendor.vendorDroneVerified}
              onChange={() => handleDroneVerificationClick(vendor, !vendor.vendorDroneVerified)}
            />
            <Slider />
          </ToggleSwitch>
          <StatusText verified={vendor.vendorDroneVerified}>
            {vendor.vendorDroneVerified ? 'Verified' : 'Not Verified'}
          </StatusText>
        </VerificationStatus>
      </TableCell>
      <TableCell>
        {vendor.isBlocked ? (
          <span>
            Blocked By Admin
            <span 
              title="Unblock Vendor" 
              onClick={() => handleBlockClick(vendor)} 
              style={{cursor:"pointer", marginLeft: "10px"}}
            >
              🔓
            </span>
          </span>
        ) : (
          <>
            <ActionIcon 
              src={viewIcon} 
              alt="View" 
              onClick={() => navigate(`/view-vendor/${vendor._id}`)} 
            />
            <ActionIcon 
              src={editIcon} 
              alt="Edit" 
              onClick={() => navigate(`/edit-vendor/${vendor._id}`)} 
            />
            <ActionIcon 
              src={blockIcon}
              title="Block Vendor" 
              alt="Block" 
              onClick={() => handleBlockClick(vendor)} 
            />
             <Users 
        size={24} 
        title="View Runners"
        style={{ cursor: 'pointer', marginLeft: '10px' }} 
        onClick={() => {
          navigate(`/view-vendor/${vendor._id}?scroll=runners`);
        }}
      />
          </>
        )}
      </TableCell>
    </TableRow>
  ))}
  {!currentEntries.length && (
    <TableRow>
      <TableCell colSpan={5} style={{ textAlign: 'center' }}>
        No vendors found
      </TableCell>
    </TableRow>
  )}
</tbody>
      </Table>
      <Pagination>
        <PageInfo>
          Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, filteredVendors.length)} of {filteredVendors.length} entries
        </PageInfo>
        <PageButtons>
          <PageButton
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </PageButton>
          {Array.from({ length: Math.ceil(filteredVendors.length / entriesPerPage) }, (_, i) => (
            <PageButton
              key={i + 1}
              active={currentPage === i + 1}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </PageButton>
          ))}
          <PageButton
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === Math.ceil(filteredVendors.length / entriesPerPage)}
          >
            Next
          </PageButton>
        </PageButtons>
      </Pagination>
      {showBlockConfirmation && (
        <BlockConfirmationModal
          onClose={handleCloseModals}
          onConfirm={handleBlockConfirm}
          vendorToBlock={vendorToBlock}
        />
      )}
      {showBlockSuccess && (
        <BlockSuccessModal
          onClose={handleCloseModals}
          vendorToBlock={vendorToBlock}
        />
      )}

{showDroneVerificationModal && (
        <DroneVerificationModal
          onClose={handleCloseDroneModals}
          onConfirm={handleDroneVerificationConfirm}
          vendor={vendorToVerify}
          newStatus={newVerificationStatus}
        />
      )}
      {showDroneVerificationSuccess && (
        <DroneVerificationSuccessModal
          onClose={handleCloseDroneModals}
          isVerified={newVerificationStatus}
        />
      )}
    </Container>
  );
};

export default ManageVendors;