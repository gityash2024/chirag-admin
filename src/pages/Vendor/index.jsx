import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import viewIcon from '../../assets/view-icon.png';
import editIcon from '../../assets/edit-icon.png';
import deleteIcon from '../../assets/delete-icon.png';

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

const AddVendorButton = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background-color: transparent;
  border: 1px solid #121212;
  border-radius: 6px;
  color: #121212;
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
  font-family: 'Montserrat';
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
  background-color: #F9FAFC;
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
  border: 1px solid #E3E6E8;
  background-color: ${props => props.active ? '#121212' : 'white'};
  color: ${props => props.active ? 'white' : '#121212'};
  cursor: pointer;
  border-radius: 4px;
`;

const ManageVendors = () => {
  const [vendors] = useState([
    { id: 1, name: 'Jacob Jones', contact: '+91 123 456 7890', state: 'Uttar Pradesh' },
    { id: 2, name: 'Darrell Steward', contact: '+91 123 456 7890', state: 'Chattisgarh' },
    { id: 3, name: 'Esther Howard', contact: '+91 123 456 7890', state: 'Madhya Pradesh' },
    { id: 4, name: 'Jane Cooper', contact: '+91 123 456 7890', state: 'Uttar Pradesh' },
    { id: 5, name: 'Arlene McCoy', contact: '+91 123 456 7890', state: 'Madhya Pradesh' },
    { id: 6, name: 'Jane Cooper', contact: '+91 123 456 7890', state: 'Uttar Pradesh' },
    { id: 7, name: 'Jane Cooper', contact: '+91 123 456 7890', state: 'Chattisgarh' },
    { id: 8, name: 'Ralph Edwards', contact: '+91 123 456 7890', state: 'Madhya Pradesh' },
  ]);

  return (
    <Container>
      <Header>
        <Title>Manage Vendors</Title>
        <Link to="/add-vendor">
          <AddVendorButton>Add Vendor</AddVendorButton>
        </Link>
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
            <TableHeader>Vendor Name</TableHeader>
            <TableHeader>Vendor Contact</TableHeader>
            <TableHeader>State</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </TableHead>
        <tbody>
          {vendors.map(vendor => (
            <TableRow key={vendor.id}>
              <TableCell>
                <VendorCell>
                  <VendorAvatar>{vendor.name[0]}</VendorAvatar>
                  {vendor.name}
                </VendorCell>
              </TableCell>
              <TableCell>{vendor.contact}</TableCell>
              <TableCell>{vendor.state}</TableCell>
              <TableCell>
                <Link to={`/view-vendor/${vendor.id}`}>
                  <ActionIcon src={viewIcon} alt="View" />
                </Link>
                <Link to={`/edit-vendor/${vendor.id}`}>
                  <ActionIcon src={editIcon} alt="Edit" />
                </Link>
                <ActionIcon src={deleteIcon} alt="Delete" />
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
    </Container>
  );
};

export default ManageVendors;