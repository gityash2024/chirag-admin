import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  font-family: 'Public Sans', sans-serif;
  background-color: #FFFFFF;
`;

const Header = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #4B465C;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
`;

const InputWrapper = styled.div`
  flex: 1;
  min-width: 30%;
`;

const Label = styled.label`
  font-size: 14px;
  color: #4B465C;
  font-weight: 400;
  margin-bottom: 5px;
  display: block;
`;

const Input = styled.input`
  padding: 10px;
  width: 100%;
  border: 1px solid #F1F1F1;
  border-radius: 4px;
  font-size: 14px;
  color: #4B465C;
`;

const ApproveButton = styled.button`
  padding: 10px 20px;
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
  display: block;
  margin: 0 auto; /* Centering the button */
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  color: #4B465C;
  margin-bottom: 15px;
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #E3E6E8;
  margin-bottom: 20px;
  justify-content: space-between;
  align-items: center;
`;

const Tab = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: transparent;
  font-size: 16px;
  font-weight: 600;
  color: ${props => (props.active ? '#000000' : '#8D98A4')};
  border-bottom: ${props => (props.active ? '3px solid #000000' : 'none')};
  cursor: pointer;
`;

const SortControls = styled.div`
  display: flex;
  align-items: center;
`;

const SortLabel = styled.span`
  font-size: 14px;
  color: #4B465C;
  margin-right: 10px;
`;

const SortDropdown = styled.select`
  padding: 8px;
  border: 1px solid #F1F1F1;
  border-radius: 4px;
  font-size: 14px;
`;



const HorizontalRule = styled.hr`
  border: 0;
  border-top: 1px solid #E3E6E8;
  margin: 20px 0;
`;

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
`;

const PageInfo = styled.span`
  font-size: 14px;
  color: #8D98A4;
`;

const PageButtons = styled.div`
  display: flex;
  margin-left: 60px;
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

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
`;

const HistoryItem = styled.div`
  background-color: #FFFFFF;
  padding: 15px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #E3E6E8;
  width: 50%; /* Full width for single card per row */
`;

const HistoryDetails = styled.div`
  font-size: 14px;
  color: #4B465C;
`;

const HistoryAmount = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #41B079;
`;

const SuccessBadge = styled.div`
  display: inline-block;
  padding: 5px 10px;
    border-radius: 4px;

  background-color: rgba(40, 199, 111, 0.16); /* Light green background */
  color: #28C76F; /* Success green color */
  font-size: 12px;
  font-weight: 600;
`;

const ApproveWithdrawal = () => {
  const [activeTab, setActiveTab] = useState('History');

  return (
    <Container>
      <Header>Withdrawal Requests</Header>

      <FormGroup>
        <InputWrapper>
          <Label>Bank Account Number</Label>
          <Input type="text" value="1009 6789 8765 2453" readOnly />
        </InputWrapper>
        <InputWrapper>
          <Label>IFSC code</Label>
          <Input type="text" value="INSE837729" readOnly />
        </InputWrapper>
        <InputWrapper>
          <Label>Account Holder Name</Label>
          <Input type="text" value="Khushi Doe" readOnly />
        </InputWrapper>
      </FormGroup>

      <FormGroup>
        <InputWrapper>
          <Label>Withdrawal Amount</Label>
          <Input type="text" value="₹ 2600" readOnly />
        </InputWrapper>
        <InputWrapper>
          <Label>Available Balance</Label>
          <Input type="text" value="₹ 2600" readOnly />
        </InputWrapper>
      </FormGroup>

      <ApproveButton>Approve</ApproveButton>

      <SectionTitle>Vendor details</SectionTitle>

      <FormGroup>
        <InputWrapper>
          <Label>Name</Label>
          <Input type="text" value="Edgar James" readOnly />
        </InputWrapper>
        <InputWrapper>
          <Label>Mobile</Label>
          <Input type="text" value="+918169131542" readOnly />
        </InputWrapper>
        <InputWrapper>
          <Label>Email id</Label>
          <Input type="text" value="khushi.doe@jithitech.com" readOnly />
        </InputWrapper>
      </FormGroup>

      <FormGroup>
        <InputWrapper>
          <Label>State</Label>
          <Input type="text" value="Maharashtra" readOnly />
        </InputWrapper>
        <InputWrapper>
          <Label>City</Label>
          <Input type="text" value="Mumbai" readOnly />
        </InputWrapper>
        <InputWrapper>
          <Label>Region</Label>
          <Input type="text" value="XYZ" readOnly />
        </InputWrapper>
      </FormGroup>

      <FormGroup>
        <InputWrapper>
          <Label>UIN number</Label>
          <Input type="text" value="23JH13988" readOnly />
        </InputWrapper>
        <InputWrapper>
          <Label>Drone Pilot Licence</Label>
          <Input type="text" value="DL09876532" readOnly />
        </InputWrapper>
        <InputWrapper>
          <Label>Work experience (in years)</Label>
          <Input type="text" value="6" readOnly />
        </InputWrapper>
      </FormGroup>

      <FormGroup>
        <InputWrapper>
          <Label>Approx Pricing for 1 acre of land service for general crop</Label>
          <Input type="text" value="₹ 23JH13988" readOnly />
        </InputWrapper>
        <InputWrapper>
        <Label>Aadhaar authentication</Label>
          <SuccessBadge>Successful</SuccessBadge>
        </InputWrapper>
      </FormGroup>

      <TabContainer>
        <div>
          <Tab active={activeTab === 'History'} onClick={() => setActiveTab('History')}>History</Tab>
          <Tab active={activeTab === 'Commissions'} onClick={() => setActiveTab('Commissions')}>Commissions</Tab>
        </div>
        <SortControls>
          <SortLabel>Sort by</SortLabel>
          <SortDropdown>
            <option value="page">Page</option>
            <option value="date">Date</option>
          </SortDropdown>
        </SortControls>
      </TabContainer>

      {activeTab === 'History' && (
        <HistoryList>
          {/* Row 1 */}
          <HistoryItem>
            <HistoryDetails>
              <div style={{marginBottom:"5px"}}>Added Money</div>
              <div style={{marginBottom:"5px"}}>24/08/2024 2:00 Pm</div>
              <div style={{marginBottom:"5px",fontSize:"12px"}}>Via UPI</div>
            </HistoryDetails>
            <HistoryAmount>+ ₹ 2300</HistoryAmount>
          </HistoryItem>
          <HistoryItem>
            <HistoryDetails>
              <div style={{marginBottom:"5px"}}>Added Money</div>
              <div style={{marginBottom:"5px"}}>24/08/2024 2:00 Pm</div>
              <div style={{marginBottom:"5px",fontSize:"12px"}}>Via UPI</div>
            </HistoryDetails>
            <HistoryAmount>+ ₹ 2300</HistoryAmount>
          </HistoryItem>
          <HistoryItem>
            <HistoryDetails>
              <div style={{marginBottom:"5px"}}>Added Money</div>
              <div style={{marginBottom:"5px"}}>24/08/2024 2:00 Pm</div>
              <div style={{marginBottom:"5px",fontSize:"12px"}}>Via UPI</div>
            </HistoryDetails>
            <HistoryAmount>+ ₹ 2300</HistoryAmount>
          </HistoryItem>
          <HistoryItem>
            <HistoryDetails>
              <div style={{marginBottom:"5px"}}>Added Money</div>
              <div style={{marginBottom:"5px"}}>24/08/2024 2:00 Pm</div>
              <div style={{marginBottom:"5px",fontSize:"12px"}}>Via UPI</div>
            </HistoryDetails>
            <HistoryAmount>+ ₹ 2300</HistoryAmount>
          </HistoryItem>
          <HistoryItem>
            <HistoryDetails>
              <div style={{marginBottom:"5px"}}>Added Money</div>
              <div style={{marginBottom:"5px"}}>24/08/2024 2:00 Pm</div>
              <div style={{marginBottom:"5px",fontSize:"12px"}}>Via UPI</div>
            </HistoryDetails>
            <HistoryAmount>+ ₹ 2300</HistoryAmount>
          </HistoryItem>
         
        </HistoryList>
      )}
      
      {/* Additional Content for Commissions */}
      {activeTab === 'Commissions' && (
        <HistoryList>
          {/* Row 1 */}
          <HistoryItem>
            <HistoryDetails>
              <div style={{marginBottom:"5px"}}>Commission Money</div>
              <div style={{marginBottom:"5px"}}>24/08/2024 2:00 Pm</div>
              <div style={{marginBottom:"5px",fontSize:"12px"}}>Via UPI</div>
            </HistoryDetails>
            <HistoryAmount>+ ₹ 2300</HistoryAmount>
          </HistoryItem>
          <HistoryItem>
            <HistoryDetails>
              <div style={{marginBottom:"5px"}}>Commission Money</div>
              <div style={{marginBottom:"5px"}}>24/08/2024 2:00 Pm</div>
              <div style={{marginBottom:"5px",fontSize:"12px"}}>Via UPI</div>
            </HistoryDetails>
            <HistoryAmount>+ ₹ 2300</HistoryAmount>
          </HistoryItem>
          <HistoryItem>
            <HistoryDetails>
              <div style={{marginBottom:"5px"}}>Commission Money</div>
              <div style={{marginBottom:"5px"}}>24/08/2024 2:00 Pm</div>
              <div style={{marginBottom:"5px",fontSize:"12px"}}>Via UPI</div>
            </HistoryDetails>
            <HistoryAmount>+ ₹ 2300</HistoryAmount>
          </HistoryItem>
          <HistoryItem>
            <HistoryDetails>
              <div style={{marginBottom:"5px"}}>Commission Money</div>
              <div style={{marginBottom:"5px"}}>24/08/2024 2:00 Pm</div>
              <div style={{marginBottom:"5px",fontSize:"12px"}}>Via UPI</div>
            </HistoryDetails>
            <HistoryAmount>+ ₹ 2300</HistoryAmount>
          </HistoryItem>
          <HistoryItem>
            <HistoryDetails>
              <div style={{marginBottom:"5px"}}>Commission Money</div>
              <div style={{marginBottom:"5px"}}>24/08/2024 2:00 Pm</div>
              <div style={{marginBottom:"5px",fontSize:"12px"}}>Via UPI</div>
            </HistoryDetails>
            <HistoryAmount>+ ₹ 2300</HistoryAmount>
          </HistoryItem>
         
        </HistoryList>
      )}
      <HorizontalRule />

      <PaginationContainer>
        <PageInfo>Showing 1 to 2 of 10 entries</PageInfo>
        <PageButtons>
          <PageButton>&lt;</PageButton>
          <PageButton active>1</PageButton>
          <PageButton>2</PageButton>
          <PageButton>3</PageButton>
          <PageButton>&gt;</PageButton>
        </PageButtons>
      </PaginationContainer>
    </Container>
  );
};

export default ApproveWithdrawal;
