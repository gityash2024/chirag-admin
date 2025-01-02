import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { listCommissions, manageCommission } from '../../services/commonService';
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

const Button = styled.button`
  padding: 8px 16px;
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #000000;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
`;

const ButtonDark = styled.button`
  padding: 8px 16px;
  background-color: #000000;
  color: #ffffff;
  border: 1px solid #000000;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
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
  font-size: 16px;
  font-weight: 500;
  border-bottom: 1px solid #E3E6E8;
  font-family: 'Public Sans';
  color: #121212;
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
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #E3E6E8;
  border-radius: 4px;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #FF0000;
  padding: 5px;
  display: flex;
  align-items: center;
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
  border: 1px solid #E3E6E8;
  background-color: ${props => props.active ? '#121212' : 'white'};
  color: ${props => props.active ? 'white' : '#121212'};
  cursor: pointer;
  border-radius: 4px;
`;



const CommissionManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [commissions, setCommissions] = useState([]);
  const [newCommission, setNewCommission] = useState({ cropName: '', percentage: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCommissions();
  }, []);

  const fetchCommissions = async () => {
    try {
      setLoading(true);
      const response = await listCommissions();
      setCommissions(response.data);
    } catch (error) {
      toast.error('Failed to fetch commissions');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCommission = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await manageCommission({
        action: 'add',
        commissionData: {
          cropName: newCommission.cropName,
          commissionPercentage: parseFloat(newCommission.percentage)
        }
      });
      toast.success('Commission added successfully');
      setShowModal(false);
      fetchCommissions();
    } catch (error) {
      toast.error('Failed to add commission');
    }finally{
      setLoading(false);
    }
  };

  const handleDeleteCommission = async (commissionId) => {
    try {
      await manageCommission({
        action: 'delete',
        commissionId
      });
      toast.success('Commission deleted successfully');
      fetchCommissions();
    } catch (error) {
      toast.error('Failed to delete commission');
    }
  };

  const resetForm = () => {
    setNewCommission({ cropName: '', percentage: '' });
  };

  return (
    <Container>
      {loading && <Loader/>}
      <Header>
        <Title>Commission Management</Title>
        <div>
          <Button onClick={() => {resetForm();setShowModal(true)}}>+ Add Commission</Button>
          <Link to="/commission-vendors">
            <ButtonDark>View all vendors</ButtonDark>
          </Link>
        </div>
      </Header>

      <TopControls>
        <span style={{ marginRight: '20px', fontWeight: '400', fontSize: '13px' }}>Show</span>
        <EntriesDropdown>
          <option>07</option>
          <option>14</option>
          <option>21</option>
        </EntriesDropdown>
        <span style={{ fontWeight: '400', fontSize: '13px' }}>Entries</span>
        <SearchInput placeholder="Search..." />
      </TopControls>

      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Crop Name</TableHeader>
            <TableHeader>Commission</TableHeader>
            {/* <TableHeader>Actions</TableHeader> */}
          </TableRow>
        </TableHead>
        <tbody>
          {commissions.map(commission => (
            <TableRow key={commission._id}>
              <TableCell>{commission.cropName}</TableCell>
              <TableCell>{commission.commissionPercentage}%</TableCell>
              {/* <TableCell>
                <DeleteButton onClick={() => handleDeleteCommission(commission._id)}>
                  <DeleteIcon />
                </DeleteButton>
              </TableCell> */}
            </TableRow>
          ))}
          {!commissions.length && (
            <TableRow>
              <TableCell colSpan={2} style={{ textAlign: 'center' }}>No commissions found</TableCell>
            </TableRow>
          )}
        </tbody>
      </Table>

      <Pagination>
        <PageInfo>Showing 1 to {commissions.length} entries</PageInfo>
        <PageButtons>
          <PageButton>Previous</PageButton>
          <PageButton active>1</PageButton>
          <PageButton>Next</PageButton>
        </PageButtons>
      </Pagination>

      {showModal && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={() => setShowModal(false)}>
              <CloseIcon />
            </CloseButton>
            <Form onSubmit={handleAddCommission}>
              <FormGroup>
                <Label>Crop Name</Label>
                <Input 
                  type="text" 
                  placeholder="Enter crop name"
                  value={newCommission.cropName}
                  onChange={(e) => setNewCommission({...newCommission, cropName: e.target.value})}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Commission Percentage</Label>
                <Input 
                  type="number" 
                  placeholder="Enter commission percentage"
                  value={newCommission.percentage}
                  onChange={(e) => setNewCommission({...newCommission, percentage: e.target.value})}
                  required
                />
              </FormGroup>
              <Button type="submit">Add Commission</Button>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default CommissionManagement;