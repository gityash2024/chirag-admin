import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
  color: #4B465C;
`;

const AddButton = styled(Link)`
  padding: 8px 16px;
  background-color: #ffffff ;
  color: #000000;
  border: 1px solid #000000;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;

  &::before {
    content: '+';
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

const ActionButton = styled.button`
  padding: 6px 12px;
  margin-right: 8px;
  background-color: ${props => props.color};
  color: white;
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

const Testimonials = () => {
  const [testimonials] = useState([
    { id: 1, file: 'video199765.mp3', farmerName: 'Esther Howard', uploadDate: '23-08-2024 22:10' },
    { id: 2, file: 'video199765.mp3', farmerName: 'Darrell Steward', uploadDate: '23-08-2024 22:10' },
    { id: 3, file: 'video199765.mp3', farmerName: 'Esther Howard', uploadDate: '23-08-2024 22:10' },
    { id: 4, file: 'video199765.mp3', farmerName: 'Jane Cooper', uploadDate: '23-08-2024 22:10' },
    { id: 5, file: 'video199765.mp3', farmerName: 'Arlene McCoy', uploadDate: '23-08-2024 22:10' },
    { id: 6, file: 'video199765.mp3', farmerName: 'Jane Cooper', uploadDate: '23-08-2024 22:10' },
    { id: 7, file: 'video199765.mp3', farmerName: 'Jane Cooper', uploadDate: '23-08-2024 22:10' },
  ]);

  return (
    <Container>
      <Header>
        <Title>Testimonial Management</Title>
        <AddButton to="/add-testimonial">Add Testimonial</AddButton>
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
            <TableHeader>Testimonial File</TableHeader>
            <TableHeader>Farmer name</TableHeader>
            <TableHeader>Upload date</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </TableHead>
        <tbody>
          {testimonials.map(testimonial => (
            <TableRow key={testimonial.id}>
              <TableCell>{testimonial.file}</TableCell>
              <TableCell>{testimonial.farmerName}</TableCell>
              <TableCell>{testimonial.uploadDate}</TableCell>
              <TableCell>
                <ActionButton color="#3498db">View</ActionButton>
                <ActionButton color="#e74c3c">Delete</ActionButton>
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

export default Testimonials;