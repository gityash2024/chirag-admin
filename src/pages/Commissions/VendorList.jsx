// pages/Commissions/VendorList.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


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
  background-color: #000;
  color: #fff;
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
  margin-bottom: 5px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #E3E6E8;
  border-radius: 4px;
`;
const VendorList = () => {
    const [vendors, setVendors] = useState([
      { id: 1, name: 'Jacob Jones', contact: '+91 123 456 7890', state: 'Uttar Pradesh', commission: 'Default' },
      { id: 2, name: 'Jacob Jones', contact: '+91 123 456 7890', state: 'Uttar Pradesh', commission: 'Default' },
      { id: 3, name: 'Jacob Jones', contact: '+91 123 456 7890', state: 'Uttar Pradesh', commission: 'Custom' },
      { id: 4, name: 'Jacob Jones', contact: '+91 123 456 7890', state: 'Uttar Pradesh', commission: 'Default' },
      { id: 5, name: 'Jacob Jones', contact: '+91 123 456 7890', state: 'Uttar Pradesh', commission: 'Default' },
      { id: 6, name: 'Jacob Jones', contact: '+91 123 456 7890', state: 'Uttar Pradesh', commission: 'Default' },
      { id: 7, name: 'Jacob Jones', contact: '+91 123 456 7890', state: 'Uttar Pradesh', commission: 'Custom' },
    ]);
  
    return (
      <Container>
        <Header>
          <Title>Commission Management &gt; Vendor</Title>
          <Button>View new vendor list</Button>
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
              <TableHeader>Vendor Name</TableHeader>
              <TableHeader>Vendor Contact</TableHeader>
              <TableHeader>State</TableHeader>
              <TableHeader>Commission</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {vendors.map(vendor => (
              <TableRow key={vendor.id}>
               <TableCell>
  <Link to={`/commission-vendors/${vendor.id}`}>
    {vendor.name}
  </Link>
</TableCell>
                <TableCell>{vendor.contact}</TableCell>
                <TableCell>{vendor.state}</TableCell>
                <TableCell>{vendor.commission}</TableCell>
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
      </Container>
    );
  };
  
export default VendorList;