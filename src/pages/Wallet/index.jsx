import React, { useState } from 'react';
import styled from 'styled-components';
import successWithdrawalCheck from '../../assets/check-wallet.png';
import CloseIcon from '@material-ui/icons/Close';

const Container = styled.div`
  padding: 20px;
  font-family: 'Public Sans' ;
  background-color: #F4F4F4;
  width:90%;
  margin: 0 auto;
  border-radius: 8px;
`;

const Header = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #383838;
  margin-bottom: 20px;
`;

const EarningsOverview = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const EarningItem = styled.div`
  background-color: #FFFFFF;
  padding: 42px;
  border-radius: 8px;
  text-align: center;
  flex: 1;
  margin-right: 15px;
  position: relative; /* Allows positioning of the dropdown inside */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &:last-child {
    margin-right: 0;
  }
`;

const EarningValue = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #383838;
`;

const EarningLabel = styled.div`
  font-size: 14px;
  color: #8D98A4;
  margin-top: 10px;
`;

const Dropdown = styled.select`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #DBDADE;
  color: #383838;
`;

const WithdrawButton = styled.button`
  width: 20%;
  padding: 10px;
  background-color: #383838;
  border-radius: 4px;
  color: #FFFFFF;
  border: none;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
`;

const Tabs = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  padding: 10px 20px;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid ${props => props.active ? '#383838' : 'transparent'};
  color: ${props => props.active ? '#383838' : '#8D98A4'};
  cursor: pointer;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
`;

const TransactionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 50%;
`;

const TransactionItem = styled.div`
  background-color: #FFFFFF;
  padding: 15px;
  border-radius: 10px;
`;

const TransactionId = styled.div`
  font-weight: 600;
  color: #383838;
`;

const TransactionDetails = styled.div`
  font-size: 14px;
  color: #8D98A4;
  margin: 5px 0;
`;

const TransactionAmount = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const TransactionStatus = styled.span`
  color: #41B079;
  font-size: 12px;
  font-weight: bold;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
`;

const PageInfo = styled.span`
  margin-right: 10px;
  color: #8D98A4;
`;

const PageButton = styled.button`
  padding: 5px 10px;
  border-radius: 20px;
  border: 1px solid #DBDADE;
  background-color: ${props => props.active ? '#383838' : '#FFFFFF'};
  color: ${props => props.active ? '#FFFFFF' : '#383838'};
  cursor: pointer;
  margin: 0 2px;
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
  background-color: #FFFFFF;
  padding: 20px;
  border-radius: 4px;
  width: 300px;
  position: relative;
`;

const ModalTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 15px;
  color: #383838;
`;

const ModalInput = styled.input`
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #DBDADE;
  border-radius: 4px;
`;

const ModalButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #383838;
  color: #FFFFFF;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const SuccessModal = styled(ModalContent)`
  text-align: center;
`;

const SuccessIcon = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 15px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
`;

const HistoryItem = styled.div`
  background-color: #FFFFFF;
  padding: 15px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HistoryDetails = styled.div``;

const HistoryAmount = styled.div`
  color: #41B079;
  font-weight: bold;
`;

const Wallet = () => {
  const [activeTab, setActiveTab] = useState('commission');
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showRequestSentModal, setShowRequestSentModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const transactions = [
    { id: 'AB123456', address: 'Lorem ipsum dolor sit amet, street , Area, City, 560066', price: 20000, commission: 2500, earning: 17500 },
    { id: 'AB123457', address: 'Lorem ipsum dolor sit amet, street , Area, City, 560066', price: 20000, commission: 2500, earning: 17500 },
    { id: 'AB123458', address: 'Lorem ipsum dolor sit amet, street , Area, City, 560066', price: 20000, commission: 2500, earning: 17500 },
  ];

  const historyItems = [
    { id: 'H1', description: 'Added Money', date: '24/08/2024 2:00 Pm', amount: 2300 },
    { id: 'H2', description: 'Added Money', date: '24/08/2024 2:00 Pm', amount: 2300 },
    { id: 'H3', description: 'Added Money', date: '24/08/2024 2:00 Pm', amount: 2300 },
    { id: 'H4', description: 'Added Money', date: '24/08/2024 2:00 Pm', amount: 2300 },
  ];

  const handleWithdraw = () => {
    setShowWithdrawModal(true);
  };

  const handleWithdrawSubmit = () => {
    setShowWithdrawModal(false);
    setShowRequestSentModal(true);
    setTimeout(() => setShowRequestSentModal(false), 3000);
  };

  return (
    <Container>
      <Header>My Earnings</Header>
      <EarningsOverview>
        <EarningItem>
          <EarningValue>Rs. 5000</EarningValue>
          <EarningLabel>Available Balance</EarningLabel>
        </EarningItem>
        <EarningItem>
          <EarningValue>345</EarningValue>
          <EarningLabel>Total Bookings</EarningLabel>
        </EarningItem>
        <EarningItem>
          <Dropdown>
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
            <option value="daily">Daily</option>
          </Dropdown>
          <EarningValue>Rs. 3000</EarningValue>
          <EarningLabel>This Month Earnings</EarningLabel>
        </EarningItem>
      </EarningsOverview>
      <WithdrawButton onClick={handleWithdraw}>Withdraw Money</WithdrawButton>
      <Tabs>
        <Tab active={activeTab === 'commission'} onClick={() => setActiveTab('commission')}>Commission</Tab>
        <Tab active={activeTab === 'sent'} onClick={() => setActiveTab('sent')}>Sent</Tab>
      </Tabs>
      <TransactionList>
        {activeTab === 'sent' ? (
          transactions.map(transaction => (
            <TransactionItem key={transaction.id}>
              <TransactionId>{transaction.id}</TransactionId>
              <TransactionDetails>{transaction.address}</TransactionDetails>
              <TransactionAmount>
                <div>
                  <div style={{marginBottom: '10px'}}>Price Summary: ₹{transaction.price}</div>
                  <div style={{marginBottom: '10px'}}>Admin's Commission: ₹{transaction.commission}</div>
                  <div style={{marginBottom: '10px'}}>Your Earning: ₹{transaction.earning}</div>
                </div>
                <TransactionStatus>Completed</TransactionStatus>
              </TransactionAmount>
            </TransactionItem>
          ))
        ) : (
          historyItems.map(item => (
            <HistoryItem key={item.id}>
              <HistoryDetails>
                <div style={{marginBottom: '10px'}}>{item.description}</div>
                <div style={{marginBottom: '10px'}}>{item.date}</div>
              </HistoryDetails>
              <HistoryAmount>+₹{item.amount}</HistoryAmount>
            </HistoryItem>
          ))
        )}
      </TransactionList>
      <Pagination>
        <PageInfo>1-10 of 10</PageInfo>
        <PageButton>&lt;</PageButton>
        <PageButton active>1</PageButton>
        <PageButton>2</PageButton>
        <PageButton>3</PageButton>
        <PageButton>&gt;</PageButton>
      </Pagination>
      {showWithdrawModal && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={() => setShowWithdrawModal(false)}>
              <CloseIcon />
            </CloseButton>
            <ModalTitle>Enter Amount</ModalTitle>
            <ModalInput
              type="number"
              placeholder="Enter amount"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
            />
            <ModalButton onClick={handleWithdrawSubmit}>Submit</ModalButton>
          </ModalContent>
        </Modal>
      )}
      {showRequestSentModal && (
        <Modal>
          <SuccessModal>
            <CloseButton onClick={() => setShowRequestSentModal(false)}>
              <CloseIcon />
            </CloseButton>
            <SuccessIcon src={successWithdrawalCheck} alt="Success" />
            <ModalTitle>Request sent</ModalTitle>
            <p>Request sent to admin, you will get an update soon</p>
          </SuccessModal>
        </Modal>
      )}
    </Container>
  );
};

export default Wallet;
