import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import runnerAvatar from '../../assets/runner-avatar.png';
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
import { getWithdrawalRequests } from '../../services/commonService';

const Container = styled.div`
  padding: 20px;
  font-family: 'Public Sans' ;
`;

const Header = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #121212;
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
  color: #121212;
  font-weight: 600;
`;

const TableCell = styled.td`
  padding: 12px;
  font-size: 14px;
  color: #121212;
`;
const TableCell2 = styled.td`
display: flex;
align-items: center;
  padding: 12px;
  font-size: 14px;
  color: #121212;
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
const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
`;

const NoDataMessage = styled.div`
  text-align: center;
  color: #666;
  padding: 40px;
  font-size: 16px;
`;

const Withdrawals = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [withdrawals, setWithdrawals] = useState([]);
  const [filteredWithdrawals, setFilteredWithdrawals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  useEffect(() => {
    filterWithdrawals();
  }, [searchTerm, withdrawals]);

  const fetchWithdrawals = async () => {
    try {
      setLoading(true);
      const response = await getWithdrawalRequests();
      setWithdrawals(response.data);
      setFilteredWithdrawals(response.data);
    } catch (error) {
      toast.error('Failed to fetch withdrawal requests');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterWithdrawals = () => {
    const filtered = withdrawals.filter(withdrawal => 
      withdrawal.vendor.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      withdrawal.vendor.contact?.includes(searchTerm) ||
      withdrawal.amount?.toString()?.includes(searchTerm)
    );
    setFilteredWithdrawals(filtered);
    setCurrentPage(1);
  };

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredWithdrawals.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredWithdrawals.length / entriesPerPage);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <LoadingWrapper>
        <CircularProgress />
      </LoadingWrapper>
    );
  }

  return (
    <Container>
      <Header>Withdrawal Requests</Header>
      <TopControls>
        <span style={{ marginRight: '20px', fontWeight: '400', fontSize: '13px' }}>Show</span>
        <EntriesDropdown
          value={entriesPerPage}
          onChange={(e) => setEntriesPerPage(Number(e.target.value))}
        >
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

      {currentEntries.length > 0 ? (
        <>
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
              {currentEntries.map(withdrawal => (
                <TableRow key={withdrawal.requestId}>
                  <TableCell2>
                    <VendorAvatar src={runnerAvatar} alt={withdrawal.vendor.name} />
                    {withdrawal.vendor.name||'--'}
                  </TableCell2>
                  <TableCell>{withdrawal.vendor.mobileNumber||'--'}</TableCell>
                  <TableCell>₹ {withdrawal.amount.toFixed(2)||'--'}</TableCell>
                  <TableCell>{formatDate(withdrawal.requestDate)||'--'}</TableCell>
                  <TableCell>
                    <ApproveButton 
                      onClick={() => navigate(`/approve-withdrawal/${withdrawal.requestId}`)}
                    >
                      Approve
                    </ApproveButton>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>

          <Pagination>
            <PageInfo>
              Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, filteredWithdrawals.length)} of {filteredWithdrawals.length} entries
            </PageInfo>
            <PageButtons>
              <PageButton 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </PageButton>
              {[...Array(totalPages)].map((_, index) => (
                <PageButton
                  key={index + 1}
                  active={currentPage === index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </PageButton>
              ))}
              <PageButton 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </PageButton>
            </PageButtons>
          </Pagination>
        </>
      ) : (
        <NoDataMessage>No withdrawal requests found</NoDataMessage>
      )}
    </Container>
  );
};

export default Withdrawals;