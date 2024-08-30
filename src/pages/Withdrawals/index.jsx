import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  font-family: 'Public Sans' ;
`;

const Header = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #4B465C;
  margin-bottom: 20px;
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
  font-size: 14px;
  color: #4B465C;
`;

const VendorAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 10px;
`;

const ApproveButton = styled.button`
  padding: 8px 16px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 4px;
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
  color: #4B465C;
`;

const PageButtons = styled.div`
  display: flex;
`;

const PageButton = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  border: 1px solid #E3E6E8;
  background-color: ${props => props.active ? '#000' : 'white'};
  color: ${props => props.active ? 'white' : '#4B465C'};
  cursor: pointer;
  border-radius: 4px;
`;

const Withdrawals = () => {
  const navigate=useNavigate();
  const [withdrawals] = useState([
    { id: 1, name: 'Jacob Jones', contact: '+91 123 456 7890', amount: '₹ 2600', date: '22-08-2024' },
    { id: 2, name: 'Jacob Jones', contact: '+91 123 456 7890', amount: '₹ 2600', date: '22-08-2024' },
    { id: 3, name: 'Jacob Jones', contact: '+91 123 456 7890', amount: '₹ 2600', date: '22-08-2024' },
    { id: 4, name: 'Jacob Jones', contact: '+91 123 456 7890', amount: '₹ 2600', date: '22-08-2024' },
    { id: 5, name: 'Jacob Jones', contact: '+91 123 456 7890', amount: '₹ 2600', date: '22-08-2024' },
    { id: 6, name: 'Jacob Jones', contact: '+91 123 456 7890', amount: '₹ 2600', date: '22-08-2024' },
    { id: 7, name: 'Jacob Jones', contact: '+91 123 456 7890', amount: '₹ 2600', date: '22-08-2024' },
  ]);

  return (
    <Container>
      <Header>Withdrawal Requests</Header>
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
            <TableHeader>Amount</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>Action</TableHeader>
          </TableRow>
        </TableHead>
        <tbody>
          {withdrawals.map(withdrawal => (
            <TableRow key={withdrawal.id}>
              <TableCell>
                <VendorAvatar src="https://via.placeholder.com/32" alt={withdrawal.name} />
                {withdrawal.name}
              </TableCell>
              <TableCell>{withdrawal.contact}</TableCell>
              <TableCell>{withdrawal.amount}</TableCell>
              <TableCell>{withdrawal.date}</TableCell>
              <TableCell>
                <ApproveButton onClick={() => navigate('/approve-withdrawal')}>Approve</ApproveButton>
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

export default Withdrawals;