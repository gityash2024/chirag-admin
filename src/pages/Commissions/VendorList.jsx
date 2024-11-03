import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiArrowLeft, FiEye } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAllVendors } from '../../services/commonService';
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

const ClickableRow = styled(Link)`
  display: table-row;
  text-decoration: none;
  color: inherit;
  &:hover {
    background-color: #F5F5F5;
  }
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

const VendorList = () => {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(7);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      setLoading(true);
      const response = await getAllVendors();
      setVendors(response.data);
    } catch (error) {
      toast.error('Failed to fetch vendors');
    } finally {
      setLoading(false);
    }
  };

  const filteredVendors = vendors.filter(vendor => 
    vendor.name.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    vendor.mobileNumber.includes(searchTerm) ||
    vendor.state.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredVendors.slice(indexOfFirstEntry, indexOfLastEntry);

  return (
    <Container>
      {loading && <Loader/>}
      <Header>
        <Title>Commission Management &gt; Vendor</Title>
        <BackButton onClick={() => navigate('/commission-management')}>
          <BackIcon />
          Back
        </BackButton>
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
            <TableHeader>Vendor Name</TableHeader>
            <TableHeader>Vendor Contact</TableHeader>
            <TableHeader>State</TableHeader>
            <TableHeader>Commission Type</TableHeader>
            <TableHeader>Action</TableHeader>
          </TableRow>
        </TableHead>
        <tbody>
          {currentEntries.map(vendor => (
            <ClickableRow key={vendor._id} to={`/commission-vendors/${vendor._id}`}>
              <TableCell>{vendor.name}</TableCell>
              <TableCell>{vendor.mobileNumber}</TableCell>
              <TableCell>{vendor.state}</TableCell>
              <TableCell>{vendor.commissionType || 'Default'}</TableCell>
              <TableCell><FiEye title='View Commission Details'/></TableCell>
                
            </ClickableRow>
          ))}
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
    </Container>
  );
};

export default VendorList;