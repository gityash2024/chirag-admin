// pages/Commissions/CommissionManagement.jsx
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
  color: #121212;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #ffffff ;
  color: #000000;
  border: 1px solid #000000;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
`;
const ButtonDark = styled.button`
  padding: 8px 16px;
  background-color: #000000 ;
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
  font-family: 'Montserrat';
  color: #121212;
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

const CommissionManagement = () => {
    const [showModal, setShowModal] = useState(false);
    const [commissions, setCommissions] = useState([
      { id: 1, cropName: 'Maize', commission: '20%' },
      { id: 2, cropName: 'Maize', commission: '20%' },
      { id: 3, cropName: 'Maize', commission: '20%' },
      { id: 4, cropName: 'Maize', commission: '20%' },
      { id: 5, cropName: 'Maize', commission: '20%' },
      { id: 6, cropName: 'Maize', commission: '20%' },
      { id: 7, cropName: 'Maize', commission: '20%' },
    ]);
  
    const handleAddCommission = (e) => {
      e.preventDefault();
      setShowModal(false);
    };
  
    return (
      <Container>
        <Header>
          <Title>Commission Management</Title>
          <div>
            <Button onClick={() => setShowModal(true)}>+ Add Commission</Button>
            <Link to="/commission-vendors">
              <ButtonDark>View all vendors</ButtonDark>
            </Link>
          </div>
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
        {showModal && (
          <Modal>
            <ModalContent>
              <Form onSubmit={handleAddCommission}>
                <FormGroup>
                  <Label>Crop Name</Label>
                  <Input type="text" placeholder="Enter crop name" />
                </FormGroup>
                <FormGroup>
                  <Label>Commission Percentage</Label>
                  <Input type="text" placeholder="Enter commission percentage" />
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