import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';

const Container = styled.div`
  padding: 20px;
  font-family: 'Public Sans', sans-serif;
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
  color: #4B465C;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #000000;
  color: #FFFFFF;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const TopControls = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const EntriesDropdown = styled.select`
  padding: 8px;
  margin-right: 20px;
  border: 1px solid #F1F1F1;
  border-radius: 4px;
`;

const SearchInput = styled.input`
  padding: 8px;
  border: 1px solid #F1F1F1;
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
  color: #4B465C;
  font-weight: 600;
`;

const TableCell = styled.td`
  padding: 12px;
  font-size: 16px;
  font-weight: 500;
  border-bottom: 1px solid #E3E6E8;
  font-family: 'Montserrat';
  color: #4B465C;
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
  border: 1px solid #E3E6E8;
  background-color: ${props => props.active ? '#121212' : 'white'};
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
  width: 400px;
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
  color: #4B465C;
  font-weight: 400;
  margin-bottom: 5px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #F1F1F1;
  border-radius: 4px;
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

  if (!vendorDetails) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Header>
        <Title>Commission Management &gt; Vendor &gt; Edit</Title>
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
      <Button>Done</Button>
    </Container>
  );
};

export default VendorDetails;
