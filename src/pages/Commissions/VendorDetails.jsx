import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import { getVendorById, listCommissions, updateVendorCommission } from '../../services/commonService';
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
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #121212;
  font-weight: 400;
  margin-bottom: 5px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #E3E6E8;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #E3E6E8;
  border-radius: 4px;
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
  font-size: 16px;
  font-weight: 500;
  border-bottom: 1px solid #E3E6E8;
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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
  gap: 10px;
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
  width: 500px;
  max-height: 80vh;
  overflow-y: auto;
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

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const VendorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [availableCommissions, setAvailableCommissions] = useState([]);
  const [selectedCommissions, setSelectedCommissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [commissionType, setCommissionType] = useState('Default');
  const [customCommissions, setCustomCommissions] = useState([]);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [vendorResponse, commissionsResponse] = await Promise.all([
        getVendorById(id),
        listCommissions()
      ]);
      
      setVendor(vendorResponse.data);
      setAvailableCommissions(commissionsResponse.data);
      setCommissionType(vendorResponse.data.commissionType || 'Default');
      setCustomCommissions(vendorResponse.data.customCommissions || []);

      if (vendorResponse.data.customCommissions) {
        setSelectedCommissions(vendorResponse.data.customCommissions.map(c => c._id));
      }
    } catch (error) {
      toast.error('Failed to fetch details');
      navigate('/commission-vendors');
    } finally {
      setLoading(false);
    }
  };

  const handleCommissionTypeChange = (e) => {
    setCommissionType(e.target.value);
    if (e.target.value === 'Default') {
      setCustomCommissions([]);
      setSelectedCommissions([]);
    }
  };

  const handleCheckboxChange = (commissionId) => {
    setSelectedCommissions(prev => {
      if (prev.includes(commissionId)) {
        return prev.filter(id => id !== commissionId);
      } else {
        return [...prev, commissionId];
      }
    });
  };

  const handleAssignCommissions = async () => {
    try {
      setLoading(true);
      const selectedCommissionDetails = availableCommissions
        .filter(commission => selectedCommissions.includes(commission._id))
        .map(({ cropName, commissionPercentage }) => ({
          cropName,
          percentage: commissionPercentage
        }));

      await updateVendorCommission({
        vendorId: id,
        commissionType: 'Custom',
        customCommissions: selectedCommissionDetails
      });

      toast.success('Commissions assigned successfully');
      setShowModal(false);
      fetchData();
    } catch (error) {
      toast.error('Failed to assign commissions');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await updateVendorCommission({
        vendorId: id,
        commissionType,
        customCommissions: commissionType === 'Custom' ? customCommissions : []
      });
      toast.success('Commission settings updated successfully');
      navigate('/commission-vendors');
    } catch (error) {
      toast.error('Failed to update commission settings');
    } finally {
      setLoading(false);
    }
  };

  if (!vendor || loading) {
    return <Loader/>;
  }

  return (
    <Container>
      <Header>
        <Title>Commission Management &gt; Vendor &gt; Edit</Title>
        <BackButton onClick={() => navigate(-1)}>
          <BackIcon />
          Back
        </BackButton>
      </Header>

      <Form>
        <FormGroup>
          <Label>Name</Label>
          <Input type="text" value={vendor.name} readOnly />
        </FormGroup>
        <FormGroup>
          <Label>Mobile</Label>
          <Input type="text" value={vendor.mobileNumber} readOnly />
        </FormGroup>
        <FormGroup>
          <Label>Email ID</Label>
          <Input type="email" value={vendor.email} readOnly />
        </FormGroup>
        <FormGroup>
          <Label>Commission Type</Label>
          <Select value={commissionType} onChange={handleCommissionTypeChange}>
            <option value="Default">Default</option>
            <option value="Custom">Custom</option>
          </Select>
        </FormGroup>
      </Form>

      <ButtonWrapper>
        {commissionType === 'Custom' && (
          <Button onClick={() => setShowModal(true)}>
            Assign Commissions
          </Button>
        )}
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </ButtonWrapper>

      {showModal && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={() => setShowModal(false)}>
              <CloseIcon />
            </CloseButton>
            <h2>Select Commissions</h2>
            {availableCommissions.map(commission => (
              <CheckboxContainer key={commission._id}>
                <Checkbox
                  type="checkbox"
                  checked={selectedCommissions.includes(commission._id)}
                  onChange={() => handleCheckboxChange(commission._id)}
                />
                <Label>
                  {commission.cropName} - {commission.commissionPercentage}%
                </Label>
              </CheckboxContainer>
            ))}
            <ButtonWrapper>
              <Button onClick={handleAssignCommissions} disabled={loading}>
                {loading ? 'Assigning...' : 'Assign Selected'}
              </Button>
            </ButtonWrapper>
          </ModalContent>
        </Modal>
      )}

      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Crop Name</TableHeader>
            <TableHeader>Commission</TableHeader>
          </TableRow>
        </TableHead>
        <tbody>
          {customCommissions.length > 0 ? (
            customCommissions.map((commission, index) => (
              <TableRow key={index}>
                <TableCell>{commission.cropName}</TableCell>
                <TableCell>{commission.percentage}%</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={2} style={{ textAlign: 'center' }}>
                {commissionType === 'Default' ? 'Using default commissions' : 'No commissions assigned'}
              </TableCell>
            </TableRow>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default VendorDetails;