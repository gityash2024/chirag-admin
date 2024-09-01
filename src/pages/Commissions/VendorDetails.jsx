import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';


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

const EntriesDropdown = styled.select`
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
  &:hover {
    background-color: #F5F5F5;
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
  font-family: 'Montserrat';
  color: #121212;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
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
const VendorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vendorDetails, setVendorDetails] = useState(null);
  const [commissions, setCommissions] = useState([]);

  useEffect(() => {
    const fetchVendorDetails = async () => {
      const mockVendorDetails = {
        name: 'Edgar James',
        mobile: '+918109131542',
        email: 'khushi.dove@etfitch.com',
        commissionType: 'Default',
      };
      setVendorDetails(mockVendorDetails);

      const mockCommissions = [
        { id: 1, cropName: 'Maize', commission: '20%' },
        { id: 2, cropName: 'Wheat', commission: '15%' },
        { id: 3, cropName: 'Rice', commission: '18%' },
      ];
      setCommissions(mockCommissions);
    };

    fetchVendorDetails();
  }, [id]);

  const handleDone = () => {
    navigate(-1);
  };

  if (!vendorDetails) {
    return <div>Loading...</div>;
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
          <Input type="text" value={vendorDetails.name} readOnly />
        </FormGroup>
        <FormGroup>
          <Label>Mobile</Label>
          <Input type="text" value={vendorDetails.mobile} readOnly />
        </FormGroup>
        <FormGroup>
          <Label>Email ID</Label>
          <Input type="email" value={vendorDetails.email} readOnly />
        </FormGroup>
        <FormGroup>
          <Label>Commission type</Label>
          <EntriesDropdown value={vendorDetails.commissionType}>
            <option>Default</option>
            <option>Custom</option>
          </EntriesDropdown>
        </FormGroup>
      </Form>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Crop Name</TableHeader>
            <TableHeader>Commission</TableHeader>
          </TableRow>
        </TableHead>
        <tbody>
          {commissions.map(commission => (
            <TableRow key={commission.id}>
              <TableCell>{commission.cropName}</TableCell>
              <TableCell>{commission.commission}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <ButtonWrapper>
        <Button onClick={handleDone}>Done</Button>
      </ButtonWrapper>
    </Container>
  );
};

export default VendorDetails;